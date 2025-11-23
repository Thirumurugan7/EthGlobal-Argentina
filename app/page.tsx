'use client';

import { useState } from 'react';
import Link from 'next/link';
import OpportunityCard from '@/components/OpportunityCard';
import { mockOpportunities } from '@/lib/data';
import { getJudgmentsByOpportunityId } from '@/lib/data';
import { InvestmentOpportunity } from '@/types';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState<string>('all');
  const [filterIndustry, setFilterIndustry] = useState<string>('all');

  const stages = ['all', ...Array.from(new Set(mockOpportunities.map(o => o.stage)))];
  const industries = ['all', ...Array.from(new Set(mockOpportunities.map(o => o.industry)))];

  const filteredOpportunities = mockOpportunities.filter((opp) => {
    const matchesSearch =
      opp.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === 'all' || opp.stage === filterStage;
    const matchesIndustry = filterIndustry === 'all' || opp.industry === filterIndustry;
    return matchesSearch && matchesStage && matchesIndustry;
  });

  const opportunitiesWithJudgments = filteredOpportunities.map((opp) => {
    const judgments = getJudgmentsByOpportunityId(opp.id);
    return {
      ...opp,
      hasJudgment: judgments.length > 0,
    };
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <header className="border-b border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                Investment Judging Platform
              </h1>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Review and evaluate investment opportunities
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
                {filteredOpportunities.length} Opportunities
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search companies, industries, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
              />
            </div>
            <select
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
              className="px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
            >
              {stages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage === 'all' ? 'All Stages' : stage}
                </option>
              ))}
            </select>
            <select
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
              className="px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
            >
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry === 'all' ? 'All Industries' : industry}
                </option>
              ))}
            </select>
          </div>
        </div>

        {opportunitiesWithJudgments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">
              No opportunities found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {opportunitiesWithJudgments.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                hasJudgment={opportunity.hasJudgment}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
