'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, TrendingUp, PackagePlus, ShoppingBag, Settings, Bot, Zap, Activity } from 'lucide-react'

const nav = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/import', label: 'Importa Prodotto', icon: PackagePlus },
  { href: '/dashboard/trends', label: 'Trend Monitor', icon: TrendingUp },
  { href: '/dashboard/products', label: 'Prodotti', icon: ShoppingBag },
  { href: '/dashboard/ai-log', label: 'AI Log', icon: Activity },
  { href: '/dashboard/settings', label: 'Impostazioni', icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <div className="flex min-h-screen grid-bg">
      <aside className="w-64 shrink-0 border-r border-subtle bg-surface-900 flex flex-col">
        <div className="p-6 border-b border-subtle">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center glow-green">
              <Zap size={18} className="text-black" />
            </div>
            <div>
              <div className="font-bold text-lg leading-none text-gradient">DropAI</div>
              <div className="text-xs text-white/30 mt-0.5 font-mono">v1.0</div>
            </div>
          </div>
        </div>
        <div className="mx-4 mt-4 px-3 py-2.5 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
          <span className="text-xs text-brand-400 font-medium">AI Attivo</span>
          <Bot size={12} className="text-brand-400 ml-auto" />
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active ? 'bg-brand-500/15 text-brand-400 border border-brand-500/20' : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                }`}>
                <Icon size={16} />{label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-subtle">
          <div className="text-xs text-white/20 font-mono text-center">felicionejacopo-netizen</div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
