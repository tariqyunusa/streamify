import type { Metadata } from 'next'
import { Work_Sans} from 'next/font/google'

export const metadata: Metadata = {
  title: 'Streamify',
  description: 'Track Your Listening Habits',
}

const WorkSans = Work_Sans({
  subsets: ["latin"],
  display: "swap"
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={WorkSans.className}>
      
      <body>{children}</body>
    </html>
  )
}
