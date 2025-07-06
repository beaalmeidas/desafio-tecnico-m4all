'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Button from "@/components/Button"

export default function PrinterList() {
  const [printers, setPrinters] = useState<any[]>([])
  const [syncStats, setSyncStats] = useState<any>(null)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const size = 10 // itens por página

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/printers?page=${page}&size=${size}`)
      .then(res => res.json())
      .then(data => {
        setPrinters(data.content)
        setTotalPages(data.totalPages)
      })
      .catch(console.error)

    fetch('http://localhost:8080/api/v1/sync/statistics')
      .then(res => res.json())
      .then(data => setSyncStats(data))
      .catch(console.error)
  }, [page])

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-4xl font-extrabold mb-8 text-primary">
        CentralPrint
      </h1>
      <p className="text-2xl font-bold mb-8 text-primary">
        Todos os Dispositivos
      </p>

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
              <strong className="text-lg">{p.name}</strong> —{" "}
              <span className={`font-semibold ${p.status === 'ONLINE' ? 'text-success' : 'text-danger'}`}>
                {p.status}
              </span>
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

      {/* PAGINAÇÃO */}
      <div className="flex items-center justify-center gap-6 mt-10">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
          className={`
            px-4 py-2 rounded font-semibold border border-primary
            text-secondary
            ${page + 1 === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          ⟵ Anterior
        </button>

        <span className="font-medium text-lg">
          Página <span className="text-accent font-bold">{page + 1}</span> de <span className="text-secondary font-bold">{totalPages}</span>
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page + 1 === totalPages}
          className={`
            px-4 py-2 rounded font-semibold border border-primary
            text-secondary
            ${page + 1 === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          Próxima ⟶
        </button>
      </div>
    </div>
  )
}
