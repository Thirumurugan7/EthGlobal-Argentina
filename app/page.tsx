'use client';

import { useState, useEffect } from 'react';
import OpportunityCard from '@/components/OpportunityCard';
import Navigation from '@/components/Navigation';
import { mockOpportunities, getAllJudgments } from '@/lib/data';
import { getJudgmentsByOpportunityId } from '@/lib/data';
import { InvestmentOpportunity } from '@/types';

type SortOption = 'name' | 'funding' | 'valuation' | 'date' | 'score';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState<string>('all');
  const [filterIndustry, setFilterIndustry] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const updateState = () => {
      if (typeof window !== 'undefined') {
        const { getFavorites } = require('@/lib/storage');
        setFavorites(getFavorites());
      }
    };
    updateState();
    const interval = setInterval(updateState, 500);
    return () => clearInterval(interval);
  }, []);

  const stages = ['all', ...Array.from(new Set(mockOpportunities.map(o => o.stage)))];
  const industries = ['all', ...Array.from(new Set(mockOpportunities.map(o => o.industry)))];

  let filteredOpportunities = mockOpportunities.filter((opp) => {
    const matchesSearch =
      opp.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === 'all' || opp.stage === filterStage;
    const matchesIndustry = filterIndustry === 'all' || opp.industry === filterIndustry;
    const matchesFavorites = !showFavorites || favorites.includes(opp.id);
    return matchesSearch && matchesStage && matchesIndustry && matchesFavorites;
  });

  // Sort opportunities
  filteredOpportunities = [...filteredOpportunities].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.companyName.localeCompare(b.companyName);
      case 'funding':
        return b.fundingAmount - a.fundingAmount;
      case 'valuation':
        return b.valuation - a.valuation;
      case 'date':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'score': {
        const aJudgments = getJudgmentsByOpportunityId(a.id);
        const bJudgments = getJudgmentsByOpportunityId(b.id);
        const aScore = aJudgments.length > 0
          ? aJudgments.reduce((sum, j) => sum + j.overallScore, 0) / aJudgments.length
          : 0;
        const bScore = bJudgments.length > 0
          ? bJudgments.reduce((sum, j) => sum + j.overallScore, 0) / bJudgments.length
          : 0;
        return bScore - aScore;
      }
      default:
        return 0;
    }
  });

  const opportunitiesWithJudgments = filteredOpportunities.map((opp) => {
    const judgments = getJudgmentsByOpportunityId(opp.id);
    return {
      ...opp,
      hasJudgment: judgments.length > 0,
    };
  });

  const totalJudgments = getAllJudgments().length;
  const judgedCount = mockOpportunities.filter(opp => getJudgmentsByOpportunityId(opp.id).length > 0).length;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Dashboard</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Review and evaluate investment opportunities
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Total Opportunities</div>
            <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{mockOpportunities.length}</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Total Judgments</div>
            <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{totalJudgments}</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Judged</div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{judgedCount}</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Favorites</div>
            <div className="text-xl font-bold text-red-600 dark:text-red-400">{favorites.length}</div>
          </div>
        </div>

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
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
            >
              <option value="name">Sort by Name</option>
              <option value="funding">Sort by Funding</option>
              <option value="valuation">Sort by Valuation</option>
              <option value="date">Sort by Date</option>
              <option value="score">Sort by Score</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showFavorites}
                onChange={(e) => setShowFavorites(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-zinc-700 dark:text-zinc-300">Show favorites only</span>
            </label>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              Showing {filteredOpportunities.length} of {mockOpportunities.length} opportunities
            </div>
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
      </div>
    </div>
  );
}
