import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function HelpPage() {
  const faqs = [
    {
      question: 'How do I judge an investment opportunity?',
      answer: 'Navigate to an opportunity detail page and click "Add Judgment". Fill out the scoring form with ratings from 0-10 for each criterion, add your recommendation, and include any notes. Click "Submit Judgment" to save your evaluation.',
    },
    {
      question: 'What do the scoring criteria mean?',
      answer: 'Each criterion is scored from 0-10: Market Potential (market size and growth), Team Quality (founder experience and execution), Product Innovation (uniqueness and technical merit), Business Model (revenue and scalability), and Traction (current progress and validation).',
    },
    {
      question: 'How do I compare multiple opportunities?',
      answer: 'Click the "Compare" button on any opportunity card or detail page. You can add up to 4 opportunities to compare. Then visit the Compare page to see them side-by-side with all key metrics.',
    },
    {
      question: 'Can I save opportunities for later?',
      answer: 'Yes! Click the heart icon on any opportunity to add it to your favorites. You can view all your favorites on the Favorites page, accessible from the navigation menu.',
    },
    {
      question: 'How do I export my judgments?',
      answer: 'Go to the Analytics page and click the "Export to CSV" button. This will download all judgments with complete scoring data, recommendations, and notes in CSV format.',
    },
    {
      question: 'What do the recommendation levels mean?',
      answer: 'Strong Pass: Highly recommended investment. Pass: Good opportunity worth considering. Weak Pass: Marginal opportunity with some concerns. Reject: Not recommended for investment.',
    },
    {
      question: 'How do I filter opportunities?',
      answer: 'Use the search bar to find opportunities by name, industry, or description. Use the dropdown filters to filter by stage (Pre-Seed, Seed, Series A, etc.) or industry. You can also sort by name, funding amount, valuation, date, or average score.',
    },
    {
      question: 'Can I see statistics about my judgments?',
      answer: 'Yes! Visit the Analytics page to see comprehensive statistics including total judgments, average scores, distribution charts, and top-scored opportunities.',
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Help & Documentation</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Get answers to common questions and learn how to use InvestJudge effectively.
          </p>

          <div className="space-y-6 mb-12">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Getting Started</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                Welcome to InvestJudge! This platform helps you evaluate and compare investment opportunities. 
                Start by browsing opportunities on the dashboard, then dive into details and provide your judgments.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm">
                  <strong>Tip:</strong> Use the search and filter options to quickly find opportunities that match your criteria.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-zinc-700 dark:text-zinc-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Quick Tips</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">📊 Use Analytics</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Check the Analytics page regularly to track trends and identify patterns in your evaluations.
                </p>
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">⭐ Save Favorites</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Use the favorites feature to bookmark opportunities you want to revisit later.
                </p>
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">🔍 Compare Side-by-Side</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Add opportunities to comparison to see key metrics side-by-side for easier decision making.
                </p>
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">📝 Detailed Notes</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Always include detailed notes in your judgments to capture important insights and concerns.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Need More Help?</h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              If you have additional questions or need support, please refer to the{' '}
              <Link href="/about" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                About page
              </Link>{' '}
              for more information about the platform.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

