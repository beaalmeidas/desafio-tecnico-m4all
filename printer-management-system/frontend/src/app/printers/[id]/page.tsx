'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/Button'

export default function PrinterDetails() {
  const { id } = useParams()
  const router = useRouter()
  const [printer, setPrinter] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/printers/${id}`)
      .then(res => res.json())
      .then(data => {
        setPrinter(data)
        setLoading(false)
      })
      .catch(console.error)
  }, [id])

  if (loading) return <p className="text-center mt-10">Carregando detalhes...</p>
  if (!printer) return <p className="text-center mt-10">Impressora não encontrada</p>

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja deletar esta impressora?')) return

    try {
      const res = await fetch(`http://localhost:8080/api/v1/printers/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        alert('Impressora deletada com sucesso.')
        router.push('/')
      } else {
        alert('Erro ao deletar impressora.')
      }
    } catch {
      alert('Erro de conexão com o servidor.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12" style={{ backgroundColor: '#EB3C7D' }}>
      <div className="bg-white border border-primary rounded-2xl p-8 w-full max-w-md shadow-lg font-sans">
        <h1 className="text-3xl font-bold mb-6 text-primary text-center">{printer.name}</h1>

        {/* DETALHES */}
        <div className="space-y-2 mb-6">
          <p><strong>Modelo:</strong> {printer.model}</p>
          <p><strong>Localização:</strong> {printer.location}</p>
          <p><strong>Status:</strong> {printer.status}</p>
          <p><strong>Capacidade de papel:</strong> {printer.paperCapacity}</p>
        </div>

        {/* CONTROLES DA IMPRESSORA */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Link href={`/printers/${id}/edit`} className="flex-1">
              <Button className="w-full">Editar Impressora</Button>
            </Link>

            <button
              onClick={handleDelete}
              className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition cursor-pointer"
            >
              Deletar Impressora
            </button>
          </div>

          <Link href="/" className="w-full">
            <Button className="w-full">Voltar para o Início</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
