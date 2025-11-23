import Link from 'next/link';
import { InvestmentOpportunity } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface OpportunityCardProps {
  opportunity: InvestmentOpportunity;
  hasJudgment?: boolean;
}

export default function OpportunityCard({ opportunity, hasJudgment }: OpportunityCardProps) {
  return (
    <Link href={`/opportunity/${opportunity.id}`}>
      <div className="group relative rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {opportunity.companyName}
              </h3>
              {hasJudgment && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  Judged
                </span>
              )}
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
              {opportunity.industry} • {opportunity.stage} • {opportunity.location}
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4 overflow-hidden" style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}>
              {opportunity.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {opportunity.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="text-zinc-500 dark:text-zinc-400">Funding: </span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(opportunity.fundingAmount)}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 dark:text-zinc-400">Valuation: </span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(opportunity.valuation)}
                </span>
              </div>
            </div>
          </div>
          <div className="ml-4">
            <svg
              className="w-5 h-5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

