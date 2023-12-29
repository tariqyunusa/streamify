import type { Metadata } from 'next'
import Nav from '@/components/Nav'
export const metadata: Metadata = {
  title: 'Streamify',
  description: 'Track Your Listening Habits',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Nav />
      <body>{children}</body>
    </html>
  )
}
