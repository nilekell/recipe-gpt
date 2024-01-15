import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './css/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RecipeGPT',
  description: 'Create delicious recipes from your own ingredients using artificial intelligence',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
