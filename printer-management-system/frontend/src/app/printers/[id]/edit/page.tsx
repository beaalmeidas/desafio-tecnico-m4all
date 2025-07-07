'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { z } from 'zod'
import Button from "@/components/Button"


const printerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  model: z.string().min(1, "Modelo é obrigatório"),
  location: z.string().min(1, "Localização é obrigatória"),
  status: z.enum(['ONLINE', 'OFFLINE', 'MAINTENANCE']),
  paperCapacity: z.number().int().positive("Capacidade de papel deve ser um número positivo"),
})

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/printers/${id}`)
      .then(res => res.json())
      .then(data => {
        data.paperCapacity = Number(data.paperCapacity)
        setForm(data)
      })
      .catch(console.error)
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.name === "paperCapacity" ? Number(e.target.value) : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validation = printerSchema.safeParse(form)

    if (!validation.success) {
      const fieldErrors: { [key: string]: string } = {}
      validation.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message
        }
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})

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

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Nome"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

          <input
            name="model"
            value={form.model}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Modelo"
          />
          {errors.model && <p className="text-red-600 text-sm">{errors.model}</p>}

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Localização"
          />
          {errors.location && <p className="text-red-600 text-sm">{errors.location}</p>}

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
          {errors.status && <p className="text-red-600 text-sm">{errors.status}</p>}

          <input
            type="number"
            name="paperCapacity"
            value={form.paperCapacity}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Capacidade de papel"
          />
          {errors.paperCapacity && <p className="text-red-600 text-sm">{errors.paperCapacity}</p>}

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
