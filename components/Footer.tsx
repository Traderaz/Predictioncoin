'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgb(var(--border-color))] mt-20 bg-[rgb(var(--bg-card))]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-3 gradient-text">Prediction Coin</h3>
            <p className="text-[rgb(var(--text-secondary))] text-sm">
              Using prediction markets to meme everything on CT. Create, share, and vote on the funniest prediction market memes.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-[rgb(var(--text-primary))]">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition">
                  Markets
                </a>
              </li>
              <li>
                <a href="/meme-votes" className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition">
                  Meme Votes
                </a>
              </li>
              <li>
                <a href="/meme-generator" className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition">
                  Meme Generator
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-[rgb(var(--text-primary))]">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://x.com/predictonsol" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition"
                >
                  𝕏 Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[rgb(var(--border-color))] mt-8 pt-6 text-center text-sm text-[rgb(var(--text-secondary))]">
          <p>© {currentYear} Prediction Coin.</p>
        </div>
      </div>
    </footer>
  );
}

