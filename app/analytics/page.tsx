'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { getAllOpportunities, getAllJudgments } from '@/lib/data';
import { getAnalytics, AnalyticsData } from '@/lib/analytics';
import { exportJudgmentsToCSV, downloadCSV } from '@/lib/export';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const opportunities = getAllOpportunities();
    const judgments = getAllJudgments();
    setAnalytics(getAnalytics(opportunities, judgments));
  }, []);

  const handleExport = () => {
    const opportunities = getAllOpportunities();
    const judgments = getAllJudgments();
    const csv = exportJudgmentsToCSV(opportunities, judgments);
    downloadCSV(csv, `judgments-${new Date().toISOString().split('T')[0]}.csv`);
  };

  if (!analytics) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-zinc-500 dark:text-zinc-400">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Analytics Dashboard</h1>
            <p className="text-zinc-600 dark:text-zinc-400">Comprehensive insights and statistics</p>
          </div>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Export to CSV
          </button>
        </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Total Opportunities</div>
            <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{analytics.totalOpportunities}</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Total Judgments</div>
            <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{analytics.totalJudgments}</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Average Score</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {analytics.averageScore.toFixed(1)}
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Judgment Rate</div>
            <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {analytics.totalOpportunities > 0
                ? ((analytics.totalJudgments / analytics.totalOpportunities) * 100).toFixed(0)
                : 0}
              %
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Opportunities by Stage
            </h2>
            <div className="space-y-3">
              {Object.entries(analytics.opportunitiesByStage).map(([stage, count]) => (
                <div key={stage}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{stage}</span>
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{count}</span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(count / analytics.totalOpportunities) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Opportunities by Industry
            </h2>
            <div className="space-y-3">
              {Object.entries(analytics.opportunitiesByIndustry).map(([industry, count]) => (
                <div key={industry}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{industry}</span>
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{count}</span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${(count / analytics.totalOpportunities) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Recommendations Distribution
            </h2>
            <div className="space-y-3">
              {Object.entries(analytics.judgmentsByRecommendation).map(([rec, count]) => (
                <div key={rec} className="flex items-center justify-between">
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">{rec}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-zinc-200 dark:bg-zinc-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          rec === 'Strong Pass'
                            ? 'bg-green-600'
                            : rec === 'Pass'
                            ? 'bg-blue-600'
                            : rec === 'Weak Pass'
                            ? 'bg-yellow-600'
                            : 'bg-red-600'
                        }`}
                        style={{
                          width: `${(count / analytics.totalJudgments) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 w-8 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Score Distribution
            </h2>
            <div className="space-y-3">
              {analytics.scoreDistribution.map(({ range, count }) => (
                <div key={range}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{range}</span>
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{count}</span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width: `${analytics.totalJudgments > 0 ? (count / analytics.totalJudgments) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {analytics.topScoredOpportunities.length > 0 && (
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Top Scored Opportunities
            </h2>
            <div className="space-y-3">
              {analytics.topScoredOpportunities.map((item, index) => (
                <Link
                  key={item.opportunity.id}
                  href={`/opportunity/${item.opportunity.id}`}
                  className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {item.opportunity.companyName}
                      </div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">
                        {item.opportunity.industry} • {item.judgmentCount} judgment{item.judgmentCount !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {item.averageScore.toFixed(1)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

