import { Key } from 'lucide-react'
export default function SettingsPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8"><h1 className="text-3xl font-bold mb-2">Impostazioni</h1><p className="text-white/40">Configura le API keys e le integrazioni.</p></div>
      <div className="bg-surface-800 border border-subtle rounded-2xl p-6">
        <h2 className="font-semibold mb-1 flex items-center gap-2"><Key size={16} className="text-brand-400" />API Keys</h2>
        <p className="text-sm text-white/40 mb-5">Configura le variabili ambiente direttamente su Vercel → Settings → Environment Variables.</p>
        <div className="space-y-3">
          {[
            { key:'ANTHROPIC_API_KEY', desc:'Necessaria per generare schede prodotto con AI', required:true, link:'https://console.anthropic.com' },
            { key:'SHOPIFY_API_KEY', desc:'Per pubblicare su Shopify automaticamente (fase 2)', required:false, link:'https://shopify.dev/docs/api' },
          ].map(item => (
            <div key={item.key} className="flex items-start justify-between p-4 bg-surface-700 rounded-xl border border-subtle">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <code className="text-xs font-mono text-brand-400">{item.key}</code>
                  <span className={`text-xs px-1.5 py-0.5 rounded border ${item.required ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-surface-600 text-white/30 border-subtle'}`}>
                    {item.required ? 'richiesta' : 'opzionale'}
                  </span>
                </div>
                <p className="text-xs text-white/40">{item.desc}</p>
              </div>
              {item.link && <a href={item.link} target="_blank" rel="noreferrer" className="text-xs text-brand-400 hover:underline shrink-0 ml-4">Ottieni →</a>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
