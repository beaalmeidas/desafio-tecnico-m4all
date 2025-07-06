'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Button from "@/components/Button"


export default function PrinterList() {
  const [printers, setPrinters] = useState<any[]>([])
  const [syncStats, setSyncStats] = useState<any>(null)

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/printers')
      .then(res => res.json())
      .then(data => setPrinters(data))
      .catch(console.error)

    fetch('http://localhost:8080/api/v1/sync/statistics')
      .then(res => res.json())
      .then(data => setSyncStats(data))
      .catch(console.error)
  }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-4xl font-extrabold mb-8 text-primary">
        Todos os Dispositivos
      </h1>

      {/* NAVEGAÇÃO */}
      <div className="flex justify-end mb-8">
        <Link href="/register">
          <Button>
            Cadastrar Impressora
          </Button>
        </Link>
      </div>

      {/* ESTATÍSTICAS DE SINCRONIZAÇÃO */}
      {syncStats && (
        <section className="mb-10 p-6 border border-primary rounded-lg bg-primary-light/10 text-primary-dark">
          <h2 className="text-2xl font-semibold mb-4">Última Sincronização</h2>
          <div className="grid grid-cols-2 gap-4 text-lg">
            <p><strong>Total processado:</strong> {syncStats.totalProcessed}</p>
            <p><strong>Criados:</strong> {syncStats.created}</p>
            <p><strong>Atualizados:</strong> {syncStats.updated}</p>
            <p><strong>Horário:</strong> {new Date(syncStats.timestamp).toLocaleString()}</p>
          </div>
        </section>
      )}

      {/* LISTA DE IMPRESSORAS */}
      <ul className="space-y-4">
        {printers.map((p) => (
          <li key={p.id} className="border border-primary rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
            <div>
              <strong className="text-lg">{p.name}</strong> — <span className={`font-semibold ${p.status === 'ONLINE' ? 'text-success' : 'text-danger'}`}>{p.status}</span>
            </div>
            <Link
              href={`/printers/${p.id}`}
              className="text-primary hover:underline font-medium"
            >
              Ver detalhes
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
