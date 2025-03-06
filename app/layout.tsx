import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Newspaper } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NY Times Articles",
  description: "Browse and search articles from The New York Times",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex items-center">
            <Link href="/" className="flex items-center">
              <Newspaper className="h-6 w-6 mr-2" />
              <span className="font-bold text-xl">NY Times Articles</span>
            </Link>
          </div>
        </header>
        {children}
        <footer className="border-t mt-12">
          <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
            <p>Powered by The New York Times API</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

