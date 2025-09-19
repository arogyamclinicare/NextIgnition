import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'NextIgnition - Where Startups Find Their Spark',
    template: '%s | NextIgnition'
  },
  description: 'The platform that connects Founders, Co-founders, Investors, and Mentors. Turn your startup idea into reality with AI-powered insights and global networking.',
  keywords: [
    'startup',
    'founders',
    'co-founders',
    'investors',
    'mentors',
    'entrepreneurship',
    'AI startup assistant',
    'startup ecosystem',
    'venture capital',
    'startup networking'
  ],
  authors: [{ name: 'NextIgnition Team' }],
  creator: 'NextIgnition',
  publisher: 'NextIgnition',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nextignition.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nextignition.vercel.app',
    title: 'NextIgnition - Where Startups Find Their Spark',
    description: 'The platform that connects Founders, Co-founders, Investors, and Mentors. Turn your startup idea into reality with AI-powered insights and global networking.',
    siteName: 'NextIgnition',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'NextIgnition - Startup Ecosystem Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextIgnition - Where Startups Find Their Spark',
    description: 'The platform that connects Founders, Co-founders, Investors, and Mentors. Turn your startup idea into reality with AI-powered insights and global networking.',
    images: ['/og-image.svg'],
    creator: '@next_ignition',
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}
