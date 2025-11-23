import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Chart/Graph icon representing investment analysis */}
          <rect
            x="20"
            y="60"
            width="15"
            height="25"
            rx="2"
            className="fill-blue-600 dark:fill-blue-500"
          />
          <rect
            x="40"
            y="45"
            width="15"
            height="40"
            rx="2"
            className="fill-blue-600 dark:fill-blue-500"
          />
          <rect
            x="60"
            y="30"
            width="15"
            height="55"
            rx="2"
            className="fill-blue-600 dark:fill-blue-500"
          />
          <rect
            x="80"
            y="20"
            width="15"
            height="65"
            rx="2"
            className="fill-blue-600 dark:fill-blue-500"
          />
          {/* Star icon on top representing quality/rating */}
          <path
            d="M50 10 L52 18 L60 18 L53 23 L55 31 L50 26 L45 31 L47 23 L40 18 L48 18 Z"
            className="fill-yellow-500 dark:fill-yellow-400"
          />
        </svg>
      </div>
      {showText && (
        <span className={`${textSizes[size]} font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors`}>
          InvestJudge
        </span>
      )}
    </Link>
  );
}

