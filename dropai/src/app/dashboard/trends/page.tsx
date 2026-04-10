'use client'
import { useState } from 'react'
import { TrendingUp, Sparkles, Loader2, ExternalLink, Tag, Flame, RefreshCw } from 'lucide-react'

interface TrendProduct {
  name: string; niche: string; reason: string; estimatedMargin: string
  priceRange: string; searchVolume: string; platforms: string[]
  tags: string[]; urgency: 'alta'|'media'|'bassa'; aliexpressQuery: string
}

const niches = ['Tutti','Tech & Gadget','Casa & Living','Fitness','Beauty','Pet','Cucina','Moda','Gaming','Baby']

export default function TrendsPage() {
  const [loading, setLoading] = useState(false)
  const [trends, setTrends] = useState<TrendProduct[]>([])
  const [niche, setNiche] = useState('Tutti')
  const [lastUpdate, setLastUpdate] = useState<string|null>(null)

  const fetchTrends = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/trends', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ niche: niche === 'Tutti' ? null : niche })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setTrends(data.trends)
      setLastUpdate(new Date().toLocaleTimeString('it-IT'))
    } catch(e) { console.error(e) }
    finally { setLoading(false) }
  }

  const urg = (u:string) => ({
    alta:'text-red-400 bg-red-400/10 border-red-400/20',
    media:'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    bassa:'text-green-400 bg-green-400/10 border-green-400/20'
  })[u] || ''

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Trend Monitor</h1>
          <p className="text-white/40">L'AI analizza prodotti viral su TikTok, AliExpress e Google Trends.</p>
        </div>
        {lastUpdate && <div className="text-xs text-white/30 font-mono text-right"><div className="text-brand-400">● Live</div>Aggiornato: {lastUpdate}</div>}
      </div>

      <div className="bg-surface-800 border border-subtle rounded-2xl p-6 mb-6">
        <div className="text-sm text-white/50 mb-3">Filtra per nicchia</div>
        <div className="flex flex-wrap gap-2 mb-4">
          {niches.map(n => (
            <button key={n} onClick={() => setNiche(n)}
              className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${niche===n ? 'bg-brand-500/15 text-brand-400 border border-brand-500/20' : 'bg-surface-700 text-white/40 border border-subtle hover:text-white/70'}`}>
              {n}
            </button>
          ))}
        </div>
        <button onClick={fetchTrends} disabled={loading}
          className="w-full bg-brand-500 hover:bg-brand-400 disabled:opacity-40 text-black font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all">
          {loading ? <><Loader2 size={16} className="animate-spin" />Analisi in corso...</> : <><Sparkles size={16} />Analizza Trend Ora</>}
        </button>
      </div>

      {trends.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2"><Flame size={16} className="text-orange-400" />{trends.length} prodotti trending</h2>
            <button onClick={fetchTrends} disabled={loading} className="text-xs text-white/40 hover:text-white/70 flex items-center gap-1 transition"><RefreshCw size={12} />Aggiorna</button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {trends.map((t, i) => (
              <div key={i} className="bg-surface-800 border border-subtle hover:border-white/15 rounded-2xl p-5 transition-all animate-slide-up" style={{animationDelay:`${i*0.05}s`}}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-surface-700 border border-subtle px-2 py-0.5 rounded-full text-white/50">{t.niche}</span>
                    <span className={`text-xs border px-2 py-0.5 rounded-full ${urg(t.urgency)}`}>
                      {t.urgency==='alta'?'🔥':t.urgency==='media'?'⚡':'💚'} {t.urgency}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-white/30">{t.searchVolume}</span>
                </div>
                <h3 className="font-bold text-base mb-2">{t.name}</h3>
                <p className="text-sm text-white/50 mb-3 leading-relaxed">{t.reason}</p>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-surface-700 rounded-xl p-2.5 text-center">
                    <div className="text-xs text-white/30 mb-0.5">Prezzo</div>
                    <div className="text-sm font-semibold">{t.priceRange}</div>
                  </div>
                  <div className="bg-surface-700 rounded-xl p-2.5 text-center">
                    <div className="text-xs text-white/30 mb-0.5">Margine est.</div>
                    <div className="text-sm font-semibold text-brand-400">{t.estimatedMargin}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-white/30">Trending su:</span>
                  {t.platforms.map(p => <span key={p} className="text-xs bg-surface-700 px-2 py-0.5 rounded-lg text-white/60">{p}</span>)}
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {t.tags.slice(0,4).map(tag => (
                    <span key={tag} className="text-xs bg-surface-700 text-white/40 px-2 py-0.5 rounded">
                      <Tag size={9} className="inline mr-1" />{tag}
                    </span>
                  ))}
                </div>
                <a href={`https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(t.aliexpressQuery)}`}
                  target="_blank" rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-surface-700 hover:bg-brand-500/10 hover:border-brand-500/20 border border-subtle py-2 rounded-xl text-sm text-white/60 hover:text-brand-400 transition-all">
                  <ExternalLink size={13} />Cerca su AliExpress
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && trends.length === 0 && (
        <div className="text-center py-20">
          <TrendingUp size={48} className="mx-auto mb-4 text-white/10" />
          <p className="text-white/30 mb-2">Nessun trend analizzato ancora</p>
          <p className="text-sm text-white/20">Clicca il bottone per iniziare l'analisi AI</p>
        </div>
      )}
    </div>
  )
}
