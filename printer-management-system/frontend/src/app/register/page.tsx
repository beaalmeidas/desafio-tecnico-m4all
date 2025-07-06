'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
      const res = await fetch('http://localhost:8080/api/printers', {
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
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Impressora</h1>
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Cadastrar
        </button>
      </form>
    </div>
  )
}
