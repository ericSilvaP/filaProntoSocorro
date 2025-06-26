'use client'

import { useEffect, useState } from 'react'

interface PacienteFila {
  atendimento_id: number
  paciente_id: number
  prioridade: number // ← substitua classificacao_risco_id por prioridade, que é o nome correto da coluna na tabela
  nome: string
}

export default function Home() {
  const [pacientes, setPacientes] = useState<PacienteFila[]>([])

  useEffect(() => {
    fetch('/api/filaDePrioridade')
      .then((res) => res.json())
      .then((data) => setPacientes(data))
  }, [])

  return (
    <div className="py-10 px-6 font-[family-name:var(--font-gabarito)]">
      <main className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-2/3 mx-auto">
          <h3 className="text-center text-3xl font-extrabold mb-4 text-[#1f5c77] underline-offset-4">
            Fila de Prioridade
          </h3>

          <div className="bg-[rgb(56,163,165)] rounded-xl p-6 shadow-lg space-y-4">
            <div className="bg-white rounded-xl p-4 max-h-[400px] overflow-y-auto">
              {pacientes.length === 0 ? (
                <p className="text-center text-gray-500">Nenhum paciente na fila</p>
              ) : (
                <>
                  {/* Cabeçalho da lista */}
                  <div className="flex justify-between font-bold text-[17px] border-b pb-1 mb-2 text-[#1f5c77]">
                    <span>Nome</span>
                    <span>Prioridade</span>
                  </div>

                  {/* Lista de pacientes */}
                  {pacientes.map((p, i) => (
                    <div
                      key={p.atendimento_id}
                      className={`flex justify-between items-center p-2 rounded-md ${
                        i === 0
                          ? 'bg-lime-100 text-black font-semibold border border-lime-400'
                          : 'text-gray-800'
                      }`}
                    >
                      {i === 0 && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 text-sm text-lime-800 font-bold -mt-6 mb-1">
                          Próximo
                        </div>
                      )}
                      <span className="truncate max-w-[60%]">{p.nome}</span>
                      <span className="font-mono">{p.prioridade}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
