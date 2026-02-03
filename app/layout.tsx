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
  generator: 'Tech Trade Enterprise',
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
        <Script
          src="https://pl28637645.effectivegatecpm.com/9b/e2/9d/9be29d89b60a109893e967eaeee35f51.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
