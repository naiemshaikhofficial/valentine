import type { Metadata } from 'next'
import Script from 'next/script'
import CursorTrail from '@/components/cursor-trail'
import { Geist, Geist_Mono, Pacifico } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Footer from '@/components/footer'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico',
});

export const metadata: Metadata = {
  title: {
    default: 'My Valentine ❤️ - Create a Romantic Proposal',
    template: '%s | My Valentine',
  },
  description: 'Create a beautiful interactive Valentine proposal for your loved one. Send a romantic message with animated hearts, music, and a special question - Will you be my Valentine? 💕',
  keywords: [
    'valentine',
    'valentine proposal',
    'be my valentine',
    'romantic proposal',
    'love proposal',
    'valentine game',
    'valentine message',
    'valentine card',
    'love game',
    'romantic game',
    'valentine 2026',
    'propose your crush',
    'valentine gift',
    'interactive valentine',
  ],
  authors: [{ name: 'Tech Trade Enterprises', url: 'https://www.techtradeenterprises.site/' }],
  creator: 'Tech Trade Enterprises',
  publisher: 'Tech Trade Enterprises',
  generator: 'Next.js',
  applicationName: 'My Valentine',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://valentine.techtradeenterprises.site'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://valentine.techtradeenterprises.site',
    siteName: 'My Valentine',
    title: 'My Valentine ❤️ - Create a Romantic Proposal',
    description: 'Create a beautiful interactive Valentine proposal for your loved one. Will you be my Valentine? 💕',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'My Valentine - Romantic Proposal Game',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Valentine ❤️ - Create a Romantic Proposal',
    description: 'Create a beautiful interactive Valentine proposal for your loved one. Will you be my Valentine? 💕',
    images: ['/opengraph-image.png'],
    creator: '@techtradeent',
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
  category: 'entertainment',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${pacifico.variable}`}>
        {children}
        <Footer />
        <Analytics />
        <Script
          src="https://pl28637525.effectivegatecpm.com/2c/74/0b/2c740b528a099dd9fc695ef846abdf8c.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://pl28637645.effectivegatecpm.com/9b/e2/9d/9be29d89b60a109893e967eaeee35f51.js"
          strategy="afterInteractive"
        />
        <Script id="ad-options" strategy="beforeInteractive">
          {`
            atOptions = {
              'key' : 'a312ee5a7123e48f0caec721b17ee484',
              'format' : 'iframe',
              'height' : 60,
              'width' : 468,
              'params' : {}
            };
          `}
        </Script>
        <Script
          src="https://www.highperformanceformat.com/a312ee5a7123e48f0caec721b17ee484/invoke.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.effectivegatecpm.com/tim2a3ye?key=e85d1ed6bb5c2ea1c58694c849c3e0ea"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
