import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'DropAI — Dropshipping Automation',
  description: 'AI-powered dropshipping automation platform',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="it"><body>{children}</body></html>
}
