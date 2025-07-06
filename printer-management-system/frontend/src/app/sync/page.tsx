'use client'

import { useEffect, useState } from 'react'

export default function SyncStats() {
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    fetch('http://localhost:8080/api/printers/sync/statistics')
      .then(res => res.json())
      .then(setStats)
      .catch(console.error)
  }, [])

  if (!stats) return <p className="p-6">Carregando estatísticas...</p>

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Estatísticas da Última Sincronização</h1>
      <p><strong>Total processado:</strong> {stats.totalProcessed}</p>
      <p><strong>Criados:</strong> {stats.created}</p>
      <p><strong>Atualizados:</strong> {stats.updated}</p>
      <p><strong>Horário:</strong> {new Date(stats.timestamp).toLocaleString()}</p>
    </div>
  )
}
