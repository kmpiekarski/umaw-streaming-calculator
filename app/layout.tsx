import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const gaId = process.env.GOOGLE_ANALYTICS_ID!

const gtm = {
  id: process.env.GTM_ID!,
  auth: process.env.GTM_AUTH!,
  preview: process.env.GTM_PREVIEW!,
}

const verificationCode = process.env.GOOGLE_SEARCH_CONSOLE_VERIFICATION!

export const metadata: Metadata = {
  title: 'Living Wage for Musicians Act Calculator',
  description:
    'Created by Kenneth M. Piekarski for United Musicians and Allied Workers (UMAW)',
  verification: { google: verificationCode },
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
      <GoogleAnalytics gaId={gaId} />
      <GoogleTagManager gtmId={gtm.id} auth={gtm.auth} />
    </html>
  )
}
