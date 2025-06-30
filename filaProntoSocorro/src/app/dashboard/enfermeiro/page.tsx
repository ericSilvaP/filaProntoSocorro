'use client'

import { SearchBarInteractive } from '@/components/searchBarInteractive'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Attendance } from '@/core/models/nonPeople/Attendance'
import { Patient } from '@/core/models/people/Patient'
import { PriorityQueue } from '@/core/queueManagement/priorityQueue'
import { QueueEntry } from '@/core/queueManagement/queueEntry'
import { formatCPF } from '@/lib/handleChange'

export default function HomeEnfermeiro() {
  const router = useRouter()
  const [queue, setQueue] = useState<QueueEntry[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  function onSubmit(data: any) {
    const patientIndex = data.patientIndex as number
    
    const query = new URLSearchParams({
      nome: queue[patientIndex].getAttendence().getPatient().getName(),
      cpf: queue[patientIndex].getAttendence().getPatient().getCpf(),
      atendimento_id: String(queue[patientIndex].getAttendence().getId()),
      paciente_id: String(queue[patientIndex].getAttendence().getPatient().getId())
    }).toString()

    router.push(`/dashboard/enfermeiro/sinaisVitais?${query}`)
  }

  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [noSearchResult, setNoSearchResult] = useState(false)

  const filteredPatients = queue.filter((p) =>
    p.getAttendence().getPatient().getName().toLowerCase().includes(searchTerm.toLowerCase()),
  )

  function searchPatient() {
    setSearchTerm(searchInput.trim())
    setValue('name', '') // reseta valor de pacientes no formulario
    setNoSearchResult(false)
    if (filteredPatients.length === 0) setNoSearchResult(true)
  }

  useEffect(() => {
      const prioQueue = new PriorityQueue(5)
      fetch('/api/filaDePrioridade')
        .then((res) => res.json())
        .then((data: any[]) => {
          data.forEach((entry) => {
            // evita pacientes com prioridade
            if (typeof entry.prioridade === 'number') return

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
  
            const queueEntry = new QueueEntry(attendance, 0)
            prioQueue.enqueue(queueEntry)
          })
  
          setQueue(prioQueue.getQueues().flat())
        })
    }, [])

  return (
    <div className="flex justify-center mt-[3rem] font-[family-name:var(--font-gabarito)]">
      <div className="flex flex-col items-center max-w-[60rem] lg:w-[60rem] gap-6 text-[13px]">
        <h1 className="text-center font-bold text-[18px] uppercase">PACIENTES PARA TRIAGEM</h1>
        <div className="flex flex-col bg-[#1f5c77] p-3 gap-2 w-full shadow-2xl md:max-w-[50rem]">
          <div className="flex">
            <div className="w-full">
              <SearchBarInteractive
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={searchPatient}
              className="p-2 text-white text-2xl font-bold rounded hover:opacity-70 transition-opacity duration-150 ease-in-out cursor-pointer"
            >
              <Image src="/search.svg" alt="" height={40} width={40} />
            </button>
          </div>

          {noSearchResult && (
            <div className="text-red-500 text-center font-normal">Sem resultado da pesquisa</div>
          )}

          {errors.patient && (
            <div className="text-red-500 text-center font-normal">Selecione um paciente</div>
          )}

          <div className="text-white flex">
            <div className="flex-7 font-bold">Nome</div>
            <div className="flex-3 font-bold">CPF</div>
          </div>
          
          <div className='flex flex-col gap-2 max-h-[350px] overflow-y-auto'>
            {filteredPatients.map((p, i) => (
              <label className="flex" key={i}>
                <input
                  type="radio"
                  value={i}
                  className="peer hidden"
                  {...register('patientIndex', { required: true })}
                />
                <div
                  className={`flex w-full peer-checked:bg-blue-200 bg-white p-1.5 rounded transition-colors duration-150`}
                >
                  <div className={`flex-7 truncate whitespace-nowrap overflow-hidden`}>{p.getAttendence().getPatient().getName()}</div>
                  <div className="flex-3">{formatCPF(p.getAttendence().getPatient().getCpf())}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-evenly w-full">
          <button
            className="bg-[rgb(56,163,165)] p-2 text-white text-[15px] font-bold rounded min-w-[8rem] shadow-2xl hover:opacity-70 transition-opacity duration-150 ease-in-out cursor-pointer"
            onClick={() => handleSubmit(onSubmit)()}
          >
            Avaliar
          </button>
        </div>
      </div>
    </div>
  )
}
