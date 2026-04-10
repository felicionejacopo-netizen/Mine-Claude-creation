import { Activity } from 'lucide-react'
export default function AILogPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8"><h1 className="text-3xl font-bold mb-2">AI Log</h1><p className="text-white/40">Storico azioni automatiche dell'AI.</p></div>
      <div className="text-center py-24 bg-surface-800 border border-subtle rounded-2xl">
        <Activity size={48} className="mx-auto mb-4 text-white/10" />
        <p className="text-white/30">Nessuna azione registrata ancora</p>
      </div>
    </div>
  )
}
