'use client';

import { useState } from 'react';
import { Judgment, InvestmentOpportunity } from '@/types';
import { calculateOverallScore } from '@/lib/data';

interface ScoringFormProps {
  opportunity: InvestmentOpportunity;
  existingJudgment?: Judgment;
  onSubmit: (judgment: Omit<Judgment, 'id' | 'judgedAt'>) => void;
}

const criteria = {
  marketPotential: {
    label: 'Market Potential',
    description: 'Size, growth, and attractiveness of the target market',
  },
  teamQuality: {
    label: 'Team Quality',
    description: 'Experience, expertise, and execution capability of the founding team',
  },
  productInnovation: {
    label: 'Product Innovation',
    description: 'Uniqueness, technical merit, and competitive advantage of the product',
  },
  businessModel: {
    label: 'Business Model',
    description: 'Revenue model, unit economics, and scalability',
  },
  traction: {
    label: 'Traction',
    description: 'Current progress, customer validation, and growth metrics',
  },
};

export default function ScoringForm({ opportunity, existingJudgment, onSubmit }: ScoringFormProps) {
  const [scores, setScores] = useState<Judgment['scores']>(
    existingJudgment?.scores || {
      marketPotential: 5,
      teamQuality: 5,
      productInnovation: 5,
      businessModel: 5,
      traction: 5,
    }
  );
  const [notes, setNotes] = useState(existingJudgment?.notes || '');
  const [judgeName, setJudgeName] = useState(existingJudgment?.judgeName || '');
  const [recommendation, setRecommendation] = useState<Judgment['recommendation']>(
    existingJudgment?.recommendation || 'Weak Pass'
  );

  const overallScore = calculateOverallScore(scores);

  const handleScoreChange = (key: keyof Judgment['scores'], value: number) => {
    setScores((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      opportunityId: opportunity.id,
      judgeName,
      scores,
      overallScore,
      notes,
      recommendation,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Overall Score</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Average of all criteria</p>
          </div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            {overallScore.toFixed(1)}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="judgeName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Your Name
        </label>
        <input
          type="text"
          id="judgeName"
          value={judgeName}
          onChange={(e) => setJudgeName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
          placeholder="Enter your name"
        />
      </div>

      {Object.entries(criteria).map(([key, { label, description }]) => (
        <div key={key} className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {label}
              </label>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{description}</p>
            </div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {scores[key as keyof typeof scores]}
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={scores[key as keyof typeof scores]}
            onChange={(e) => handleScoreChange(key as keyof Judgment['scores'], parseInt(e.target.value))}
            className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-700 accent-blue-600"
          />
          <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>0 - Poor</span>
            <span>5 - Average</span>
            <span>10 - Excellent</span>
          </div>
        </div>
      ))}

      <div>
        <label htmlFor="recommendation" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Recommendation
        </label>
        <select
          id="recommendation"
          value={recommendation}
          onChange={(e) => setRecommendation(e.target.value as Judgment['recommendation'])}
          className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
        >
          <option value="Strong Pass">Strong Pass</option>
          <option value="Pass">Pass</option>
          <option value="Weak Pass">Weak Pass</option>
          <option value="Reject">Reject</option>
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Notes & Comments
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={6}
          className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
          placeholder="Add your detailed thoughts, concerns, and feedback..."
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
      >
        {existingJudgment ? 'Update Judgment' : 'Submit Judgment'}
      </button>
    </form>
  );
}

