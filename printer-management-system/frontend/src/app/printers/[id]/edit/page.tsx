'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from "@/components/Button"

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

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/printers/${id}`)
      .then(res => res.json())
      .then(setForm)
      .catch(console.error)
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12" style={{ backgroundColor: '#EB3C7D' }}>
      <div className="bg-white border border-primary rounded-2xl p-8 w-full max-w-md shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-primary text-center">
          Editar Impressora
        </h1>

        {/* FORMULÁRIO DE EDIÇÃO */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Nome"
          />
          <input
            name="model"
            value={form.model}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Modelo"
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Localização"
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
            type="number"
            name="paperCapacity"
            value={form.paperCapacity}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Capacidade de papel"
          />

          {/* BOTÕES */}
          <div className="flex gap-4 pt-2">
            <Button type="submit" className="flex-1">
              Salvar
            </Button>

            <Link href="/">
              <Button className="bg-gray-300 text-black hover:bg-gray-400 flex-1">
                Voltar para a lista
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
