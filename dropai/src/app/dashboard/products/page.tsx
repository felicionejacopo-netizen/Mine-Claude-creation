import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
export default function ProductsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8"><h1 className="text-3xl font-bold mb-2">Prodotti</h1><p className="text-white/40">Schede prodotto generate dall'AI.</p></div>
      <div className="text-center py-24 bg-surface-800 border border-subtle rounded-2xl">
        <ShoppingBag size={48} className="mx-auto mb-4 text-white/10" />
        <p className="text-white/30 mb-6">Nessun prodotto ancora</p>
        <Link href="/dashboard/import" className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-black font-semibold px-6 py-3 rounded-xl transition">Importa Prodotto</Link>
      </div>
    </div>
  )
}
