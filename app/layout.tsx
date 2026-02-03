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
  title: 'My Valentine',
  description: 'A romantic interactive proposal',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${pacifico.variable}`}>
        <CursorTrail />
        {children}
        <Footer />
        <Analytics />
        <Script
          src="https://pl28637525.effectivegatecpm.com/2c/74/0b/2c740b528a099dd9fc695ef846abdf8c.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
