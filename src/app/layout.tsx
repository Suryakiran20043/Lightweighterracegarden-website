import type { Metadata } from 'next';
import './globals.css';
import AppShell from '@/components/shared/AppShell';

export const metadata: Metadata = {
  title: 'Light Weight Terrace Garden Organics | Premium Urban Gardening & Lifestyle',
  description: 'India\'s premium organic destination for lightweight terrace gardening setups, organic seeds, cold-pressed oils, traditional grocery and hair care.',
  keywords: 'terrace gardening, organic seeds, lightweight potting mix, coco peat, traditional pickles, organic food india, cold pressed oil',
  authors: [{ name: 'Terrace Garden Organics team' }],
  openGraph: {
    title: 'Light Weight Terrace Garden Organics',
    description: 'Grow fresh organic greens on your balcony or roof. Premium setups, organic composts, and sustainable home essentials.',
    url: 'https://terracegardenorganics.com',
    siteName: 'Terrace Garden Organics',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Light Weight Terrace Garden Organics',
    description: 'Cultivate abundance on your terrace with lightweight non-soil growing mediums and organic seeds.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full bg-warm-white text-charcoal font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
