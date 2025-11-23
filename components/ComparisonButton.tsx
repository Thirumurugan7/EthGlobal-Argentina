'use client';

import { useState, useEffect } from 'react';
import { getComparisonList, addToComparison, removeFromComparison } from '@/lib/storage';

interface ComparisonButtonProps {
  opportunityId: string;
}

export default function ComparisonButton({ opportunityId }: ComparisonButtonProps) {
  const [inComparison, setInComparison] = useState(false);
  const [comparisonCount, setComparisonCount] = useState(0);

  useEffect(() => {
    const updateState = () => {
      const comparison = getComparisonList();
      setInComparison(comparison.includes(opportunityId));
      setComparisonCount(comparison.length);
    };
    updateState();
    const interval = setInterval(updateState, 500);
    return () => clearInterval(interval);
  }, [opportunityId]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inComparison) {
      removeFromComparison(opportunityId);
    } else {
      if (comparisonCount < 4) {
        addToComparison(opportunityId);
      } else {
        alert('You can compare up to 4 opportunities at once. Remove one to add another.');
      }
    }
  };

  const isDisabled = !inComparison && comparisonCount >= 4;

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
        inComparison
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : isDisabled
          ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-600'
          : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
      }`}
      aria-label={inComparison ? 'Remove from comparison' : 'Add to comparison'}
    >
      {inComparison ? '✓ In Comparison' : '+ Compare'}
    </button>
  );
}

