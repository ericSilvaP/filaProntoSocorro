'use client'

import { Person } from '@/components/person'
import { SearchBar } from '@/components/searchBar'
import { useEffect, useState } from 'react'

export default function Home() {
  
  const [pacientes, setPacientes] = useState([])

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setPacientes(data))
  }, [])

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
    <div className="">
      <main className="flex mt-[5rem] px-10 gap-17 justify-center flex-col md:flex-row text-2xl font-[family-name:var(--font-gabarito)]">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-center font-bold">Fila de Prioridade</h3>
            <div className="flex flex-col bg-[rgb(56,163,165)] rounded p-8 gap-5 shadow-2xl">
              <SearchBar />
              <div className="flex flex-col p-1.5 bg-white rounded-2xl px-4 gap-2">
                {patients && patients.map((p: any, i) =>
                  i === 0 ? (
                    <div key={i} className="font-bold">
                      <div className="text-center text-2xl">Próximo</div>
                      <div className="text-[20px]">{p}</div>
                    </div>
                  ) : (
                    <div key={i} className="text-[20px]">
                      {p}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
