import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-md mx-auto prediction-card">
        <div className="text-6xl mb-4">404</div>
        <h2 className="text-3xl font-bold mb-4 gradient-text">Page Not Found</h2>
        <p className="text-gray-400 mb-6">
          Looks like this prediction market doesn't exist... yet!
        </p>
        <Link href="/" className="btn-prediction inline-block">
          Go Home
        </Link>
      </div>
    </div>
  );
}

