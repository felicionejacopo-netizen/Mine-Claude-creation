'use client'
import { useState } from 'react'
import { Link2, Sparkles, Loader2, Copy, CheckCheck, ExternalLink, Tag } from 'lucide-react'

interface ProductCard {
  title: string; seoTitle: string; description: string; bulletPoints: string[]
  price: { supplier: string; suggested: string; margin: string }
  tags: string[]; niche: string; targetAudience: string
  instagramCaption: string; tiktokScript: string; shopifyHtml: string
}

export default function ImportPage() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<ProductCard | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const [tab, setTab] = useState<'scheda'|'social'|'shopify'>('scheda')

  const handleImport = async () => {
    if (!url.trim()) return
    setLoading(true); setError(''); setProduct(null)
    try {
      const res = await fetch('/api/scrape', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ url }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Errore')
      setProduct(data.product)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Errore durante l\'importazione')
    } finally { setLoading(false) }
  }

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text); setCopied(key); setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Importa Prodotto</h1>
        <p className="text-white/40">Incolla il link di qualsiasi prodotto. L'AI genera la scheda completa.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {['AliExpress','Amazon','CJ Dropshipping','Zendrop'].map(p => (
          <span key={p} className="text-xs bg-surface-800 border border-subtle px-3 py-1.5 rounded-full text-white/40">● {p}</span>
        ))}
      </div>

      <div className="bg-surface-800 border border-subtle rounded-2xl p-6 mb-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Link2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input type="url" value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleImport()}
              placeholder="https://aliexpress.com/item/... oppure Amazon, CJ, Zendrop"
              className="w-full bg-surface-700 border border-subtle rounded-xl pl-10 pr-4 py-3.5 text-sm focus:outline-none focus:border-brand-500/50 transition placeholder:text-white/20" />
          </div>
          <button onClick={handleImport} disabled={loading || !url.trim()}
            className="bg-brand-500 hover:bg-brand-400 disabled:opacity-40 text-black font-semibold px-6 py-3.5 rounded-xl flex items-center gap-2 transition shrink-0">
            {loading ? <><Loader2 size={16} className="animate-spin" />Analisi...</> : <><Sparkles size={16} />Genera con AI</>}
          </button>
        </div>
        {loading && (
          <div className="mt-4 space-y-1.5">
            {['Scraping pagina prodotto...','Analisi AI in corso...','Generazione scheda Shopify...'].map((s,i) => (
              <div key={s} className="flex items-center gap-2 text-xs text-white/40 animate-fade-in" style={{animationDelay:`${i*0.4}s`}}>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />{s}
              </div>
            ))}
          </div>
        )}
        {error && <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">⚠️ {error}</div>}
      </div>

      {product && (
        <div className="animate-slide-up space-y-4">
          {/* Header prodotto */}
          <div className="bg-surface-800 border border-brand-500/20 rounded-2xl p-6 glow-green">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-brand-500/15 text-brand-400 border border-brand-500/20 px-2 py-0.5 rounded-full">{product.niche}</span>
                  <span className="text-xs text-white/30 font-mono">{product.targetAudience}</span>
                </div>
                <h2 className="text-xl font-bold mb-1">{product.title}</h2>
                <p className="text-xs text-white/40 font-mono">SEO: {product.seoTitle}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-white/30 mb-1">Prezzo suggerito</div>
                <div className="text-2xl font-bold text-brand-400">{product.price.suggested}</div>
                <div className="text-xs text-white/40">Fornitore: {product.price.supplier} · Margine: <span className="text-brand-400">{product.price.margin}</span></div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {product.tags.map(t => (
                <span key={t} className="text-xs bg-surface-700 border border-subtle px-2 py-1 rounded-lg text-white/50">
                  <Tag size={10} className="inline mr-1" />{t}
                </span>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-surface-800 border border-subtle rounded-xl p-1">
            {(['scheda','social','shopify'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${tab===t ? 'bg-brand-500/15 text-brand-400 border border-brand-500/20' : 'text-white/40 hover:text-white/70'}`}>
                {t==='scheda'?'📄 Scheda':t==='social'?'📱 Social':'🛍️ Shopify HTML'}
              </button>
            ))}
          </div>

          {tab === 'scheda' && (
            <div className="space-y-4">
              <Box title="Descrizione" content={product.description} onCopy={() => copy(product.description,'desc')} copied={copied==='desc'} />
              <div className="bg-surface-800 border border-subtle rounded-2xl p-5">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-sm">✅ Bullet Points</h3>
                  <CopyBtn onCopy={() => copy(product.bulletPoints.join('\n'),'bp')} copied={copied==='bp'} />
                </div>
                <ul className="space-y-2">
                  {product.bulletPoints.map((b,i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/70"><span className="text-brand-400 shrink-0">▸</span>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {tab === 'social' && (
            <div className="space-y-4">
              <Box title="📸 Caption Instagram" content={product.instagramCaption} onCopy={() => copy(product.instagramCaption,'ig')} copied={copied==='ig'} />
              <Box title="🎵 Script TikTok" content={product.tiktokScript} onCopy={() => copy(product.tiktokScript,'tt')} copied={copied==='tt'} />
            </div>
          )}
          {tab === 'shopify' && (
            <div className="bg-surface-800 border border-subtle rounded-2xl p-5">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="font-semibold text-sm">HTML Shopify</h3>
                  <p className="text-xs text-white/40 mt-0.5">Incolla nel campo "Descrizione" del prodotto su Shopify</p>
                </div>
                <CopyBtn onCopy={() => copy(product.shopifyHtml,'html')} copied={copied==='html'} />
              </div>
              <pre className="text-xs text-white/50 bg-surface-900 rounded-xl p-4 overflow-auto max-h-64 font-mono whitespace-pre-wrap">{product.shopifyHtml}</pre>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button onClick={() => copy(JSON.stringify(product,null,2),'all')}
              className="flex items-center gap-2 bg-surface-700 hover:bg-surface-600 border border-subtle px-4 py-2.5 rounded-xl text-sm transition">
              {copied==='all' ? <CheckCheck size={14} className="text-brand-400" /> : <Copy size={14} />} Esporta JSON
            </button>
            <button onClick={() => { setProduct(null); setUrl('') }}
              className="flex items-center gap-2 bg-surface-700 hover:bg-surface-600 border border-subtle px-4 py-2.5 rounded-xl text-sm transition">
              <ExternalLink size={14} /> Nuovo prodotto
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Box({ title, content, onCopy, copied }: { title:string; content:string; onCopy:()=>void; copied:boolean }) {
  return (
    <div className="bg-surface-800 border border-subtle rounded-2xl p-5">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-sm">{title}</h3>
        <CopyBtn onCopy={onCopy} copied={copied} />
      </div>
      <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{content}</p>
    </div>
  )
}
function CopyBtn({ onCopy, copied }: { onCopy:()=>void; copied:boolean }) {
  return <button onClick={onCopy} className="text-white/30 hover:text-brand-400 transition">{copied ? <CheckCheck size={15} className="text-brand-400" /> : <Copy size={15} />}</button>
}
