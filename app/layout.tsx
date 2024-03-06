import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Living Wage for Musicians Act Calculator',
  description:
    'Created by Kenneth M. Piekarski for United Musicians and Allied Workers (UMAW)',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics gaId="G-XP6XP088NW" />
      <GoogleTagManager gtmId="GTM-MTDPL22N" />
    </html>
  )
}
