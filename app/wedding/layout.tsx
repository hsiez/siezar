import type { Metadata } from 'next';
import { Courier_Prime, Pinyon_Script } from 'next/font/google';
import './styles/tokens.css';

const courierPrime = Courier_Prime({
  variable: '--wedding-font-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const pinyonScript = Pinyon_Script({
  variable: '--wedding-font-script',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Harley & Haylee — October 2, 2026',
  description: 'Join us for our wedding celebration at Grand Gimeno in Orange, CA on October 2, 2026.',
  openGraph: {
    title: 'Harley & Haylee — October 2, 2026',
    description: 'Join us for our wedding celebration at Grand Gimeno in Orange, CA.',
    url: 'https://siezar.com/wedding',
    siteName: 'siezar.com',
    images: [
      {
        url: '/wedding/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Harley & Haylee Wedding — Grand Gimeno, Orange CA',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harley & Haylee — October 2, 2026',
    description: 'Join us for our wedding celebration at Grand Gimeno in Orange, CA.',
    images: ['/wedding/og.jpg'],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function WeddingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${courierPrime.variable} ${pinyonScript.variable}`}>{children}</div>;
}
