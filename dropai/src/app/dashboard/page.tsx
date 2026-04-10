import { TrendingUp, Package, Zap, ArrowUpRight, Activity } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const stats = [
    { label: 'Prodotti Attivi', value: '0', icon: Package, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Trend Rilevati', value: '0', icon: TrendingUp, color: 'text-brand-400', bg: 'bg-brand-400/10' },
    { label: 'Azioni AI Oggi', value: '0', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'Schede Generate', value: '0', icon: Activity, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ]
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Benvenuto 👋</h1>
        <p className="text-white/40">Il tuo sistema DropAI è attivo. Inizia importando il primo prodotto.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface-800 border border-subtle rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-4`}>
              <s.icon size={18} className={s.color} />
            </div>
            <div className="text-2xl font-bold mb-1">{s.value}</div>
            <div className="text-xs text-white/40">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {[
          { href: '/dashboard/import', label: 'Importa Prodotto', desc: 'Incolla URL da AliExpress, Amazon, CJ, Zendrop...', icon: Package },
          { href: '/dashboard/trends', label: 'Analizza Trend', desc: 'Scopri i prodotti più venduti in questo momento', icon: TrendingUp },
        ].map((a) => (
          <Link key={a.href} href={a.href}
            className="group bg-surface-800 border border-subtle hover:border-brand-500/30 rounded-2xl p-6 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                  <a.icon size={18} className="text-brand-400" />
                </div>
                <div>
                  <div className="font-semibold">{a.label}</div>
                  <div className="text-xs text-white/40 mt-0.5">{a.desc}</div>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-white/20 group-hover:text-brand-400 transition-all" />
            </div>
          </Link>
        ))}
      </div>
      <div className="bg-surface-800 border border-subtle rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">🚀 Setup Iniziale</h2>
        <div className="space-y-3">
          {[
            '01 — Aggiungi ANTHROPIC_API_KEY nelle variabili ambiente su Vercel',
            '02 — Vai su "Importa Prodotto" e incolla un link AliExpress/Amazon',
            "03 — L'AI genera automaticamente scheda, copy social e HTML Shopify",
            '04 — Usa il Trend Monitor per trovare prodotti vincenti ogni giorno',
          ].map((s) => (
            <div key={s} className="flex items-start gap-3 text-sm text-white/50">
              <span className="text-brand-400 font-mono text-xs bg-brand-500/10 border border-brand-500/20 px-2 py-1 rounded shrink-0">{s.slice(0,2)}</span>
              {s.slice(5)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
