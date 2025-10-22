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
          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg transition ${
                  pathname === item.href
                    ? 'bg-[rgb(var(--accent-blue))] text-white'
                    : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--bg-secondary))]'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Dark Mode Toggle */}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

