'use client';

import { useEffect, useState } from 'react';

export default function PrinterList() {
  const [printers, setPrinters] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/printers')
      .then(res => res.json())
      .then(data => setPrinters(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Impressoras</h1>
      <ul>
        {printers.map(p => (
          <li key={p.id}>{p.name} - {p.status}</li>
        ))}
      </ul>
    </div>
  );
}
