import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Prediction Coin - Prediction Markets Memes',
  description: 'Using prediction markets to meme everything on CT. Vote on meme predictions, create custom prediction memes, and explore Polymarket-style markets.',
  keywords: ['prediction markets', 'polymarket', 'crypto', 'memes', 'CT', 'crypto twitter', 'betting', 'polls'],
  authors: [{ name: 'Prediction Coin' }],
  creator: 'Prediction Coin',
  publisher: 'Prediction Coin',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.vercel.app',
    title: 'Prediction Coin - Prediction Markets Memes',
    description: 'Using prediction markets to meme everything on CT',
    siteName: 'Prediction Coin',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prediction Coin - Prediction Markets Memes',
    description: 'Using prediction markets to meme everything on CT',
    creator: '@predictonsol',
    site: '@predictonsol',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  // Only remove dark class if user explicitly chose light
                  document.documentElement.classList.remove('dark');
                } else {
                  // Default to dark mode
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
      </head>
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

