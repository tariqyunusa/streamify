import type { Metadata } from 'next'

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
      
      <body>{children}</body>
    </html>
  )
}
