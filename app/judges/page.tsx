'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { getAllJudgments, getAllOpportunities } from '@/lib/data';
import { InvestmentOpportunity, Judgment } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface JudgeStats {
  judgeName: string;
  totalJudgments: number;
  averageScore: number;
  recommendations: Record<string, number>;
  recentJudgments: Array<{
    judgment: Judgment;
    opportunity: InvestmentOpportunity;
  }>;
}

export default function JudgesPage() {
  const [judges, setJudges] = useState<JudgeStats[]>([]);
  const [selectedJudge, setSelectedJudge] = useState<string | null>(null);

  useEffect(() => {
    const judgments = getAllJudgments();
    const opportunities = getAllOpportunities();

    // Group judgments by judge
    const judgeMap = new Map<string, Judgment[]>();
    judgments.forEach((judgment) => {
      const existing = judgeMap.get(judgment.judgeName) || [];
      judgeMap.set(judgment.judgeName, [...existing, judgment]);
    });

    // Calculate stats for each judge
    const judgeStats: JudgeStats[] = Array.from(judgeMap.entries()).map(([judgeName, judgeJudgments]) => {
      const avgScore =
        judgeJudgments.reduce((sum, j) => sum + j.overallScore, 0) / judgeJudgments.length;

      const recommendations: Record<string, number> = {};
      judgeJudgments.forEach((j) => {
        recommendations[j.recommendation] = (recommendations[j.recommendation] || 0) + 1;
      });

      const recentJudgments = judgeJudgments
        .sort((a, b) => new Date(b.judgedAt).getTime() - new Date(a.judgedAt).getTime())
        .slice(0, 5)
        .map((j) => ({
          judgment: j,
          opportunity: opportunities.find((o) => o.id === j.opportunityId)!,
        }))
        .filter((item) => item.opportunity);

      return {
        judgeName,
        totalJudgments: judgeJudgments.length,
        averageScore: avgScore,
        recommendations,
        recentJudgments,
      };
    });

    setJudges(judgeStats.sort((a, b) => b.totalJudgments - a.totalJudgments));
  }, []);

  const selectedJudgeData = judges.find((j) => j.judgeName === selectedJudge);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Judges</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            View all judges and their evaluation history
          </p>
        </div>

        {judges.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-12 text-center">
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">
              No judges have submitted evaluations yet.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Judges List */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                All Judges ({judges.length})
              </h2>
              {judges.map((judge) => (
                <button
                  key={judge.judgeName}
                  onClick={() => setSelectedJudge(judge.judgeName)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedJudge === judge.judgeName
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {judge.judgeName}
                    </h3>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {judge.totalJudgments} judgment{judge.totalJudgments !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {judge.averageScore.toFixed(1)}
                    </span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">avg score</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Judge Details */}
            <div className="lg:col-span-2">
              {selectedJudgeData ? (
                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        {selectedJudgeData.judgeName}
                      </h2>
                      <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                        {selectedJudgeData.totalJudgments} total evaluation
                        {selectedJudgeData.totalJudgments !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {selectedJudgeData.averageScore.toFixed(1)}
                      </div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">Average Score</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                      Recommendations Distribution
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(selectedJudgeData.recommendations).map(([rec, count]) => (
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
                                  width: `${
                                    (count / selectedJudgeData.totalJudgments) * 100
                                  }%`,
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

                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                      Recent Judgments
                    </h3>
                    {selectedJudgeData.recentJudgments.length === 0 ? (
                      <p className="text-zinc-500 dark:text-zinc-400">No recent judgments</p>
                    ) : (
                      <div className="space-y-3">
                        {selectedJudgeData.recentJudgments.map(({ judgment, opportunity }) => (
                          <Link
                            key={judgment.id}
                            href={`/opportunity/${opportunity.id}`}
                            className="block p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                                  {opportunity.companyName}
                                </h4>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                                  {opportunity.industry} • {formatCurrency(opportunity.fundingAmount)}
                                </p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
                                  {new Date(judgment.judgedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })}
                                </p>
                              </div>
                              <div className="text-right ml-4">
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                  {judgment.overallScore.toFixed(1)}
                                </div>
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    judgment.recommendation === 'Strong Pass'
                                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                      : judgment.recommendation === 'Pass'
                                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                      : judgment.recommendation === 'Weak Pass'
                                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                                      : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                  }`}
                                >
                                  {judgment.recommendation}
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-12 text-center">
                  <p className="text-zinc-500 dark:text-zinc-400">
                    Select a judge from the list to view their details
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

