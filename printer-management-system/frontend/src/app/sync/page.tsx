'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [printers, setPrinters] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/printers')
      .then(res => res.json())
      .then(data => setPrinters(data))
      .catch(console.error)
  }, [])

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard de Impressoras</h1>

      {/* Botões de navegação */}
      <div className="flex gap-4 mb-8">
        <Link href="/register">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Cadastrar Impressora
          </button>
        </Link>
        <Link href="/sync-statistics">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Ver Estatísticas de Sincronização
          </button>
        </Link>
      </div>

      {/* Lista de impressoras */}
      <ul className="space-y-2">
        {printers.map((p: any) => (
          <li
            key={p.id}
            className="border rounded p-4 hover:bg-gray-50 flex justify-between items-center"
          >
            <span>
              <strong>{p.name}</strong> — {p.status}
            </span>
            <Link href={`/printers/${p.id}`}>
              <button className="text-sm text-blue-600 hover:underline">Ver detalhes</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
