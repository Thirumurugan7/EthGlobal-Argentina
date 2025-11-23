import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">About InvestJudge</h1>
          
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6">
              InvestJudge is a comprehensive platform designed to streamline the investment evaluation process. 
              Our platform empowers investors and judges to efficiently review, score, and compare investment 
              opportunities with precision and clarity.
            </p>

            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-4">Our Mission</h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
              To provide investors with powerful tools that enable data-driven decision making, 
              comprehensive analysis, and collaborative evaluation of investment opportunities. 
              We believe that better tools lead to better investment decisions.
            </p>

            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-4">Key Features</h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300 mb-6">
              <li><strong>Comprehensive Scoring System:</strong> Evaluate opportunities across multiple criteria including market potential, team quality, product innovation, business model, and traction.</li>
              <li><strong>Analytics Dashboard:</strong> Gain insights with detailed statistics, distributions, and trend analysis.</li>
              <li><strong>Side-by-Side Comparison:</strong> Compare up to 4 opportunities simultaneously to make informed decisions.</li>
              <li><strong>Favorites & Bookmarks:</strong> Save interesting opportunities for later review.</li>
              <li><strong>Export Capabilities:</strong> Download judgments and data for external analysis.</li>
              <li><strong>Advanced Filtering:</strong> Find opportunities quickly with powerful search and filter options.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-4">How It Works</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300 mb-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Browse Opportunities</h3>
                  <p>Explore investment opportunities from various industries and stages.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Evaluate & Score</h3>
                  <p>Review detailed information and provide comprehensive judgments using our scoring system.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Compare & Analyze</h3>
                  <p>Use comparison tools and analytics to identify the best investment opportunities.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Make Decisions</h3>
                  <p>Export data, share insights, and make informed investment decisions.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-4">Scoring Criteria</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Market Potential</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Size, growth, and attractiveness of the target market
                </p>
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Team Quality</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Experience, expertise, and execution capability
                </p>
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Product Innovation</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Uniqueness, technical merit, and competitive advantage
                </p>
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Business Model</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Revenue model, unit economics, and scalability
                </p>
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg md:col-span-2">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Traction</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Current progress, customer validation, and growth metrics
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                For questions or support, please visit our <Link href="/help" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Help page</Link>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

