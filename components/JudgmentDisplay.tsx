import { Judgment } from '@/types';

interface JudgmentDisplayProps {
  judgment: Judgment;
}

export default function JudgmentDisplay({ judgment }: JudgmentDisplayProps) {
  const getRecommendationColor = (rec: Judgment['recommendation']) => {
    switch (rec) {
      case 'Strong Pass':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Pass':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Weak Pass':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Reject':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Judgment by {judgment.judgeName}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {new Date(judgment.judgedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {judgment.overallScore.toFixed(1)}
          </div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">Overall Score</div>
        </div>
      </div>

      <div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRecommendationColor(judgment.recommendation)}`}>
          {judgment.recommendation}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(judgment.scores).map(([key, value]) => (
          <div key={key} className="text-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{value}</div>
          </div>
        ))}
      </div>

      {judgment.notes && (
        <div>
          <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Notes</h4>
          <p className="text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">{judgment.notes}</p>
        </div>
      )}
    </div>
  );
}

