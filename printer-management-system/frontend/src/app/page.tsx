'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function PrinterList() {
  const [printers, setPrinters] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/printers')
      .then(res => res.json())
      .then(data => setPrinters(data))
      .catch(console.error)
  }, [])

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Impressoras</h1>
      <ul className="space-y-2">
        {printers.map((p: any) => (
          <li key={p.id} className="border p-4 rounded flex justify-between">
            <div>
              <strong>{p.name}</strong> - {p.status}
            </div>
            <Link href={`/printers/${p.id}`} className="text-blue-600 underline">
              Ver detalhes
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
