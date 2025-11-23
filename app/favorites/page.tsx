'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import OpportunityCard from '@/components/OpportunityCard';
import { getFavorites } from '@/lib/storage';
import { getOpportunityById, getJudgmentsByOpportunityId } from '@/lib/data';
import { InvestmentOpportunity } from '@/types';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [opportunities, setOpportunities] = useState<InvestmentOpportunity[]>([]);

  useEffect(() => {
    const updateFavorites = () => {
      const favIds = getFavorites();
      setFavorites(favIds);
      const opps = favIds
        .map(id => getOpportunityById(id))
        .filter((opp): opp is InvestmentOpportunity => opp !== undefined);
      setOpportunities(opps);
    };
    updateFavorites();
    const interval = setInterval(updateFavorites, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <header className="border-b border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 mb-2"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Favorites</h1>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {opportunities.length} saved {opportunities.length === 1 ? 'opportunity' : 'opportunities'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {opportunities.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-zinc-300 dark:text-zinc-700 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-4">No favorites yet</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Opportunities
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((opportunity) => {
              const judgments = getJudgmentsByOpportunityId(opportunity.id);
              return (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  hasJudgment={judgments.length > 0}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

