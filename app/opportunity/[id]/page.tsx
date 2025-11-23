'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getOpportunityById, getJudgmentsByOpportunityId } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import ScoringForm from '@/components/ScoringForm';
import JudgmentDisplay from '@/components/JudgmentDisplay';
import FavoriteButton from '@/components/FavoriteButton';
import ComparisonButton from '@/components/ComparisonButton';
import { InvestmentOpportunity, Judgment } from '@/types';

export default function OpportunityPage() {
  const params = useParams();
  const router = useRouter();
  const [opportunity, setOpportunity] = useState<InvestmentOpportunity | null>(null);
  const [judgments, setJudgments] = useState<Judgment[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (params.id) {
      const opp = getOpportunityById(params.id as string);
      if (opp) {
        setOpportunity(opp);
        setJudgments(getJudgmentsByOpportunityId(opp.id));
      }
    }
  }, [params.id]);

  const handleSubmitJudgment = (judgmentData: Omit<Judgment, 'id' | 'judgedAt'>) => {
    const newJudgment: Judgment = {
      ...judgmentData,
      id: `j${Date.now()}`,
      judgedAt: new Date().toISOString(),
    };
    setJudgments([...judgments, newJudgment]);
    setShowForm(false);
    // In a real app, this would save to a backend
    alert('Judgment submitted successfully!');
  };

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            Opportunity Not Found
          </h2>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <header className="border-b border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                  {opportunity.companyName}
                </h1>
                <FavoriteButton opportunityId={opportunity.id} size="lg" />
              </div>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-3">
                {opportunity.industry} • {opportunity.stage} • {opportunity.location}
              </p>
              <div className="flex items-center gap-3">
                <ComparisonButton opportunityId={opportunity.id} />
                {opportunity.website && (
                  <a
                    href={opportunity.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Funding Amount</div>
              <div className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {formatCurrency(opportunity.fundingAmount)}
              </div>
            </div>
            <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Valuation</div>
              <div className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {formatCurrency(opportunity.valuation)}
              </div>
            </div>
            <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Stage</div>
              <div className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {opportunity.stage}
              </div>
            </div>
            <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Location</div>
              <div className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {opportunity.location}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              Description
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {opportunity.description}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              Founders
            </h2>
            <div className="flex flex-wrap gap-2">
              {opportunity.founders.map((founder) => (
                <span
                  key={founder}
                  className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm"
                >
                  {founder}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {opportunity.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Judgments</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showForm ? 'Cancel' : '+ Add Judgment'}
            </button>
          </div>

          {showForm && (
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 mb-6">
              <ScoringForm
                opportunity={opportunity}
                onSubmit={handleSubmitJudgment}
              />
            </div>
          )}

          {judgments.length === 0 && !showForm ? (
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-12 text-center">
              <p className="text-zinc-500 dark:text-zinc-400">
                No judgments yet. Be the first to evaluate this opportunity!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {judgments.map((judgment) => (
                <JudgmentDisplay key={judgment.id} judgment={judgment} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

