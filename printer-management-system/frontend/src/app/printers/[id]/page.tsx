'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function EditPrinter() {
  const { id } = useParams()
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    model: '',
    location: '',
    status: 'ONLINE',
    paperCapacity: 100,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/printers/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          name: data.name,
          model: data.model,
          location: data.location,
          status: data.status,
          paperCapacity: data.paperCapacity,
        })
        setLoading(false)
      })
      .catch(console.error)
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:8080/api/v1/printers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        alert('Impressora atualizada com sucesso!')
        router.push(`/printers/${id}`)
      } else {
        alert('Erro ao atualizar impressora.')
      }
    } catch {
      alert('Erro de conexão com o servidor.')
    }
  }

  if (loading) return <p>Carregando dados...</p>

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Editar Impressora</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nome"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="model"
          value={form.model}
          onChange={handleChange}
          placeholder="Modelo"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Localização"
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="ONLINE">ONLINE</option>
          <option value="OFFLINE">OFFLINE</option>
          <option value="MAINTENANCE">MANUTENÇÃO</option>
        </select>
        <input
          name="paperCapacity"
          type="number"
          value={form.paperCapacity}
          onChange={handleChange}
          placeholder="Capacidade de papel"
          className="w-full border p-2 rounded"
          required
          min={0}
        />

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Salvar
          </button>

          <Link
            href={`/`}
            className="text-gray-600 underline hover:text-gray-900 cursor-pointer"
          >
            Voltar para o início
          </Link>
        </div>
      </form>
    </div>
  )
}
