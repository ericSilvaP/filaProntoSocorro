'use client'

import { useEffect, useState } from 'react'
import { PriorityQueue } from '@/core/queueManagement/priorityQueue'
import { QueueEntry } from '@/core/queueManagement/queueEntry'
import { Attendance } from '@/core/models/nonPeople/Attendance'
import { Patient } from '@/core/models/people/Patient'

export function getColorByPriority(priority: number): { colorName: string; colorCode: string } {
  const colors = [
    { colorName: 'Emergência', colorCode: '#ef233c' },      // Vermelho
    { colorName: 'Muito Urgente', colorCode: '#e85d04' },   // Laranja
    { colorName: 'Urgente', colorCode: '#ffba08' },         // Amarelo
    { colorName: 'Pouco Urgente', colorCode: '#7cb518' },   // Verde
    { colorName: 'Não Urgente', colorCode: '#5c95ff' }      // Azul
  ]

  if (priority < 0 || priority > 4) {
    throw new Error('Prioridade inválida. Deve estar entre 0 e 4.')
  }

  return colors[priority]
}


export default function Home() {
  const [queue, setQueue] = useState<QueueEntry[]>([])

  useEffect(() => {
    const prioQueue = new PriorityQueue(5)
    fetch('/api/filaDePrioridade')
      .then((res) => res.json())
      .then((data: any[]) => {
        data.forEach((entry) => {
          if (entry.prioridade === undefined || entry.prioridade === null || entry.status === 4 || entry.status === 5) return
          // Criar paciente com sus e tipo sanguíneo do backend
          const patient = new Patient(
            entry.paciente_id,
            entry.cpf,
            entry.nome,
            new Date(entry.data_nascimento),
            entry.sexo,
            entry.telefone,
            entry.sus,
            entry.tipo_sanguineo
          )

          // Obter recepcionista id do cookie
          const recepId = parseInt(
            document.cookie
              .split('; ')
              .find((row) => row.startsWith('reference_id='))
              ?.split('=')[1] || '0'
          )

          const startDate = entry.inicio ? new Date(entry.inicio) : new Date()

          const attendance = new Attendance(entry.atendimento_id, patient, recepId, startDate)

          const queueEntry = new QueueEntry(attendance, entry.prioridade)
          prioQueue.enqueue(queueEntry)
        })

        setQueue(prioQueue.getQueues().flat())
      })
  }, [])

  return (
    <div className="py-10 px-6 font-[family-name:var(--font-gabarito)]">
      <main className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 text-[13px]">
        <div className="w-full md:w-[40rem] mx-auto">
          <h3 className="text-center text-xl font-extrabold mb-4 text-[#1f5c77] underline-offset-4">
            Fila de Prioridade
          </h3>

          <div className="bg-[rgb(56,163,165)] rounded-xl p-6 shadow-lg space-y-4">
            <div className="bg-white rounded-xl p-4 max-h-[300px] overflow-y-auto">
              {queue.length === 0 ? (
                <p className="text-center text-gray-500">Nenhum paciente na fila</p>
              ) : (
                <>
                  <div className="flex justify-between font-bold text-[17px] border-b pb-1 mb-2 text-[#1f5c77]">
                    <span>Nome</span>
                    <span>Prioridade</span>
                    <span>Hora de Entrada</span>
                  </div>

                  {queue.map((entry, i) => {
                    const patient = entry.getAttendence().getPatient()
                    const initialDate = entry.getAttendence().getStartTime()
                    return (
                      <div
                        key={entry.getAttendence().getId()}
                        className={`flex justify-between items-center p-2 rounded-md ${
                          i === 0
                            ? 'bg-lime-100 text-black font-semibold border border-lime-400'
                            : 'text-gray-800'
                        }`}
                      >
                        <span className="truncate max-w-[40%]">{patient.getName()}</span>
                        <span>{getColorByPriority(entry.getPriorityLevel()).colorName}</span>
                        <span>
                          {`${String(initialDate.getHours()).padStart(2, '0')}:${String(initialDate.getMinutes()).padStart(2, '0')}:${String(initialDate.getSeconds()).padStart(2, '0')}`}
                        </span>

                      </div>
                    )
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
