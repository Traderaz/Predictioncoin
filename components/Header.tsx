'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Markets', href: '/' },
    { name: 'Meme Votes', href: '/meme-votes' },
    { name: 'Meme Generator', href: '/meme-generator' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[rgb(var(--bg-card))] border-b border-[rgb(var(--border-color))] shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img 
              src="/icon.png" 
              alt="Prediction Coin" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold gradient-text hidden sm:block">
              Prediction Coin
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1 md:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 md:px-4 py-2 rounded-lg transition text-xs md:text-base whitespace-nowrap ${
                  pathname === item.href
                    ? 'bg-[rgb(var(--accent-blue))] text-white'
                    : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--bg-secondary))]'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Twitter/X Link */}
            <a
              href="https://x.com/predictonsol"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 md:px-3 py-2 rounded-lg transition text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--bg-secondary))] flex items-center gap-1.5"
              aria-label="Follow us on X"
            >
              <svg 
                className="w-4 h-4 md:w-5 md:h-5" 
                fill="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="hidden lg:inline text-xs md:text-base">Follow</span>
            </a>
            
            {/* Dark Mode Toggle */}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

