'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { getComparisonList, removeFromComparison, clearComparison } from '@/lib/storage';
import { getOpportunityById, getAllJudgments } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { InvestmentOpportunity, Judgment } from '@/types';

export default function ComparePage() {
  const [opportunities, setOpportunities] = useState<InvestmentOpportunity[]>([]);
  const [judgments, setJudgments] = useState<Record<string, Judgment[]>>({});

  useEffect(() => {
    const updateComparison = () => {
      const comparisonIds = getComparisonList();
      const opps = comparisonIds
        .map(id => getOpportunityById(id))
        .filter((opp): opp is InvestmentOpportunity => opp !== undefined);
      setOpportunities(opps);

      const allJudgments = getAllJudgments();
      const judgmentsMap: Record<string, Judgment[]> = {};
      opps.forEach(opp => {
        judgmentsMap[opp.id] = allJudgments.filter(j => j.opportunityId === opp.id);
      });
      setJudgments(judgmentsMap);
    };

    updateComparison();
    const interval = setInterval(updateComparison, 500);
    return () => clearInterval(interval);
  }, []);

  const handleRemove = (id: string) => {
    removeFromComparison(id);
    setOpportunities(prev => prev.filter(opp => opp.id !== id));
  };

  const handleClear = () => {
    clearComparison();
    setOpportunities([]);
  };

  if (opportunities.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-4">
              No opportunities selected for comparison
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Opportunities
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const getAverageScore = (oppId: string): number => {
    const oppJudgments = judgments[oppId] || [];
    if (oppJudgments.length === 0) return 0;
    return oppJudgments.reduce((sum, j) => sum + j.overallScore, 0) / oppJudgments.length;
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Compare Opportunities ({opportunities.length}/4)
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">Side-by-side comparison of investment opportunities</p>
          </div>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear All
          </button>
        </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <thead className="bg-zinc-50 dark:bg-zinc-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Company
                  </th>
                  {opportunities.map(opp => (
                    <th key={opp.id} className="px-6 py-4 text-left">
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/opportunity/${opp.id}`}
                          className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {opp.companyName}
                        </Link>
                        <button
                          onClick={() => handleRemove(opp.id)}
                          className="ml-2 text-zinc-400 hover:text-red-600 dark:hover:text-red-400"
                          aria-label="Remove from comparison"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Industry
                  </td>
                  {opportunities.map(opp => (
                    <td key={opp.id} className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                      {opp.industry}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Stage
                  </td>
                  {opportunities.map(opp => (
                    <td key={opp.id} className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                      {opp.stage}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Funding Amount
                  </td>
                  {opportunities.map(opp => (
                    <td key={opp.id} className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                      {formatCurrency(opp.fundingAmount)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Valuation
                  </td>
                  {opportunities.map(opp => (
                    <td key={opp.id} className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                      {formatCurrency(opp.valuation)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Location
                  </td>
                  {opportunities.map(opp => (
                    <td key={opp.id} className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                      {opp.location}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Average Score
                  </td>
                  {opportunities.map(opp => {
                    const avgScore = getAverageScore(opp.id);
                    return (
                      <td key={opp.id} className="px-6 py-4 whitespace-nowrap">
                        {avgScore > 0 ? (
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {avgScore.toFixed(1)}
                          </span>
                        ) : (
                          <span className="text-sm text-zinc-400">No judgments</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Judgments
                  </td>
                  {opportunities.map(opp => (
                    <td key={opp.id} className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                      {judgments[opp.id]?.length || 0}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">Tags</td>
                  {opportunities.map(opp => (
                    <td key={opp.id} className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {opp.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

