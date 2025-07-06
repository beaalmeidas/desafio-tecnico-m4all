'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function PrinterDetails() {
  const { id } = useParams()
  const [printer, setPrinter] = useState<any>(null)

  useEffect(() => {
    fetch(`http://localhost:8080/api/printers/${id}`)
      .then(res => res.json())
      .then(setPrinter)
      .catch(console.error)
  }, [id])

  if (!printer) return <p>Carregando...</p>

  return (
    <div className="p-6 max-w-xl mx-auto space-y-2">
      <h1 className="text-2xl font-bold">Detalhes da Impressora</h1>
      <p><strong>Nome:</strong> {printer.name}</p>
      <p><strong>Modelo:</strong> {printer.model}</p>
      <p><strong>Local:</strong> {printer.location}</p>
      <p><strong>Status:</strong> {printer.status}</p>
      <p><strong>Papel:</strong> {printer.paperCapacity}</p>

      <div className="flex gap-4 mt-4">
        <Link href={`/printers/${id}/edit`} className="text-blue-600 underline">Editar</Link>
        <button
          className="text-red-600 underline"
          onClick={async () => {
            await fetch(`http://localhost:8080/api/printers/${id}`, {
              method: 'DELETE',
            })
            alert('Impressora removida')
            window.location.href = '/'
          }}
        >
          Deletar
        </button>
      </div>
    </div>
  )
}
