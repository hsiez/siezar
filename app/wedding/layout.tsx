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
  title: 'Wedding',
  description: 'Wedding information and details',
};

export default function WeddingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${courierPrime.variable} ${pinyonScript.variable}`}>{children}</div>;
}
