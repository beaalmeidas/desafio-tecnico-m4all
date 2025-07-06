'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import Button from "@/components/Button"

export default function RegisterPrinter() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    model: '',
    location: '',
    status: 'ONLINE',
    paperCapacity: 100,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:8080/api/v1/printers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        alert('Impressora cadastrada com sucesso!')
        router.push('/')
      } else {
        alert('Erro ao cadastrar impressora.')
      }
    } catch (err) {
      console.error(err)
      alert('Erro de conexão com o servidor.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#EB3C7D' }}>
      <div className="bg-white border border-primary rounded-2xl p-8 w-full max-w-md shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-primary text-center">
          Nova Impressora
        </h1>

        {/* FORMULÁRIO DE CADASTRO */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Nome"
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="model"
            placeholder="Modelo"
            className="w-full border p-2 rounded"
            value={form.model}
            onChange={handleChange}
            required
          />
          <input
            name="location"
            placeholder="Localização"
            className="w-full border p-2 rounded"
            value={form.location}
            onChange={handleChange}
            required
          />
          <select
            name="status"
            className="w-full border p-2 rounded"
            value={form.status}
            onChange={handleChange}
          >
            <option value="ONLINE">ONLINE</option>
            <option value="OFFLINE">OFFLINE</option>
          </select>
          <input
            type="number"
            name="paperCapacity"
            placeholder="Capacidade de papel"
            className="w-full border p-2 rounded"
            value={form.paperCapacity}
            onChange={handleChange}
            required
          />

          {/* BOTÕES */}
          <div className="flex gap-4 pt-2">
            <Button type="submit" className="flex-1">
              Cadastrar
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
