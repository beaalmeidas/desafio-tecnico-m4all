'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

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
    fetch(`http://localhost:8080/api/printers/${id}`)
      .then(res => res.json())
      .then(setForm)
      .catch(console.error)
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch(`http://localhost:8080/api/printers/${id}`, {
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
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Impressora</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} className="w-full border p-2" />
        <input name="model" value={form.model} onChange={handleChange} className="w-full border p-2" />
        <input name="location" value={form.location} onChange={handleChange} className="w-full border p-2" />
        <select name="status" value={form.status} onChange={handleChange} className="w-full border p-2">
          <option value="ONLINE">ONLINE</option>
          <option value="OFFLINE">OFFLINE</option>
          <option value="MAINTENANCE">MAINTENANCE</option>
        </select>
        <input
          type="number"
          name="paperCapacity"
          value={form.paperCapacity}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <button className="bg-blue-600 text-white w-full p-2 rounded">Salvar</button>
      </form>
    </div>
  )
}
