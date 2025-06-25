'use client'

import { SearchBar } from '@/components/searchBar'
import { useEffect, useState } from 'react'

export default function Home() {
  const [pacientes, setPacientes] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setPacientes(data))
  }, [])

  // Exemplo local (remova se estiver usando pacientes reais)
  let patients = [
    'Paciente 1',
    'Paciente 2',
    'Paciente 3',
    'Paciente 4',
    'Paciente 5',
    'Paciente 6',
    'Paciente 7',
    'Paciente 8',
    'Paciente 9',
    'Paciente 10',
  ] 

  return (
    <div className="py-10 px-6 font-[family-name:var(--font-gabarito)]">
      <main className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-2/3 mx-auto">
          <h3 className="text-center text-3xl font-extrabold mb-4 text-[#1f5c77] underline-offset-4">
            Fila de Prioridade
          </h3>

          <div className="bg-[rgb(56,163,165)] rounded-xl p-6 shadow-lg space-y-4">
            <div className="bg-white rounded-xl p-4 max-h-[400px] overflow-y-auto space-y-2">
              {patients.length === 0 && (
                <p className="text-center text-gray-500">Nenhum paciente na fila</p>
              )}

              {patients.map((p, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-md ${
                    i === 0
                      ? 'bg-lime-100 text-black font-bold text-lg border border-lime-400'
                      : 'text-gray-800 text-base'
                  }`}
                >
                  {i === 0 && <div className="text-center mb-1 text-[18px] uppercase">Próximo</div>}
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
