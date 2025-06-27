'use client'

import { getColorByPriority } from '@/app/filaExibicao/page'
import { SuccesModal } from '@/components/sucessModal'
import { Attendance } from '@/core/models/nonPeople/Attendance'
import { Patient } from '@/core/models/people/Patient'
import { PriorityQueue } from '@/core/queueManagement/priorityQueue'
import { QueueEntry } from '@/core/queueManagement/queueEntry'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Medico() {
  const [showModalPatientOff, setShowModalPatientOff] = useState(false)
  const [queue, setQueue] = useState<QueueEntry[]>([])
  const [calledPatient, setCalledPatient] = useState(false)
  const [minCall, setMinCall] = useState(0)
  const [showSuccesModal, setShowSuccesModal] = useState(false)

  const toggleModal = () => {
    setShowModalPatientOff(!showModalPatientOff)
  }

  const prioQueue = new PriorityQueue(5)
  useEffect(() => {
    fetch('/api/filaDePrioridade')
      .then((res) => res.json())
      .then((data: any[]) => {
        data.forEach((entry) => {
          // evita pacientes com prioridade
          if (typeof entry.prioridade !== 'number' || entry.status === 4 || entry.status === 5) return

          const prioridade = entry.prioridade

          if (prioridade === 0) {
            updateStatus(entry.atendimento_id, 4)
            deleteFromQueueDb(entry.atendimento_id)
            return
          }

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

          const queueEntry = new QueueEntry(attendance, prioridade || 0)
          prioQueue.enqueue(queueEntry)
        })

        setQueue(prioQueue.getQueues().flat())
      })
  }, [])

  function calcAge(dob: Date) {
    const today = new Date()
    let age = today.getFullYear() - dob.getFullYear()
    const hasHadBirthdayThisYear =
      today.getMonth() > dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate())

    if (!hasHadBirthdayThisYear) {
      age -= 1
    }

    return String(age)
  }

  function togglePatient() {
    setCalledPatient(!calledPatient)

    calledPatient ? setMinCall(0) : setMinCall(1)
  }

  async function updateStatus(id: number, newStatus: number) {
    const resUpdStatus = await fetch(`/api/atendimento/update-status/${String(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({status: newStatus})
    })

    const resultUpdStatus = await resUpdStatus.json()
    
    if (!resUpdStatus.ok) {
      alert(`Erro na mudança de status: ${resultUpdStatus.error}`)
      return
    }
  }

  async function deleteFromQueueDb(atendimento_id: number, ) {
    const res = await fetch(`/api/filaDePrioridade/${atendimento_id}`, {
      method: "DELETE"
    })

    const result = await res.json()
    
    if (!res.ok) {
      alert(`Erro na mudança de status: ${result.error}`)
      return
    }
  }

  function releaseFirstPatient() {
    if (queue.length === 0) return

    const first = queue[0]
    const attendance = first.getAttendence()
    const status = attendance.getStatus()
    attendance.setEndTime()

    if (status === 0 || status === 1 || status === 2) {
      const newStatus = status + 1
      updateStatus(attendance.getId(), newStatus)
      attendance.setStatus(newStatus)

      // Remove o primeiro paciente e reinsere na posição 2 (ou no final, se a fila for menor)
      const updatedQueue = [...queue]
      updatedQueue.splice(0, 1) // remove o primeiro

      const insertIndex = Math.min(2, updatedQueue.length)
      updatedQueue.splice(insertIndex, 0, first) // insere na posição 2 (ou última possível)

      setQueue(updatedQueue)
    }

    if (status === 3) {
      updateStatus(attendance.getId(), 5)
      attendance.setStatus(5)
      attendance.setEndTime()

      alert("Paciente Dispensado!")

      // Remove o paciente da fila
      setQueue(queue.slice(1))
    }

    setCalledPatient(false)
    setMinCall(0)
  }

  function attendPatient() {
    const attendence = queue[0].getAttendence()

    updateStatus(attendence.getId(), 4)
    attendence.setStatus(4)

    const updatedQueue = [...queue]
    updatedQueue.splice(0, 1)

    setQueue(updatedQueue)
    deleteFromQueueDb(attendence.getId())

    setShowSuccesModal(true)
    setTimeout(() => setShowSuccesModal(false), 2000)
  }


  return (
    <div className="flex justify-center gap-3 lg:gap-50 mt-[2rem] font-[family-name:var(--font-gabarito)]">
      <div className="flex gap-8 text-[15px]">
        <div className="flex flex-col flex-wrap items-center">
          <h1 className="text-center font-bold text-xl">Para Chamar</h1>

          <div className="bg-[rgb(56,163,165)] p-3 flex justify-center items-center flex-col min-w-[30rem] gap-5 shadow-2xl rounded-2xl">
            <div className="flex w-full flex-col items-center">
              <h2 className="font-bold text-white">Próximo</h2>
              <div className="bg-white w-[75%] flex p-6">

                  {(queue.length > minCall || (calledPatient && queue.length !== 1)) && (
                    <>
                      <div className="flex-7 flex flex-col gap-1.5">
                        <div>
                          <strong>Nome</strong>: {queue[minCall].getAttendence().getPatient().getName()}
                        </div>
                        <div>
                          <strong>Idade</strong>: {calcAge(queue[minCall].getAttendence().getPatient().getBDate())} anos
                        </div>
                        <div className="flex items-center gap-2">
                          <strong>Classificação:</strong>
                          <span className={`bg-[${getColorByPriority(queue[minCall].getPriorityLevel()).colorCode}] p-2 w-full text-center text-white`}>{getColorByPriority(queue[minCall].getPriorityLevel()).colorName}</span>
                        </div>
                      </div>
                    </>
                  )}
                  {(queue.length === minCall || queue.length === 0) && <p className="text-black">Nenhum paciente aguardando</p>}
              </div>
            </div>
            <div>
              <button
                className={`min-w-[8rem] py-1.5 px-5 rounded font-bold ${
                  calledPatient || queue.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[rgb(128,237,153)] cursor-pointer'
                }`}
                onClick={queue.length >= 2 && calledPatient || queue.length >= 1 && !calledPatient  ? togglePatient : undefined}
                disabled={calledPatient && queue.length === 1 || queue.length === 0}
              >
                Chamar paciente
              </button>
            </div>
          </div>
        </div>

        <div className="">
          <h1 className="text-center font-bold text-xl">Para Atender</h1>

          <div className="bg-[rgb(56,163,165)] p-3 flex justify-center items-center flex-col min-w-[30rem] gap-5 shadow-2xl rounded-2xl">
            <div className="flex w-full flex-col items-center">
              <h2 className="font-bold text-white">Aguardando</h2>
              <div className="bg-white w-[75%] flex p-6">
                  {(queue.length > 0 && calledPatient) && (
                    <>
                    
                      <div className="flex-7 flex flex-col gap-1.5">
                        <div>
                          <strong>Nome</strong>: {queue[0].getAttendence().getPatient().getName()}
                        </div>
                        <div>
                          <strong>Idade</strong>: {calcAge(queue[0].getAttendence().getPatient().getBDate())} anos
                        </div>
                        <div className="flex items-center gap-2">
                          <strong>Classificação:</strong>
                          <span className={`bg-[${getColorByPriority(queue[0].getPriorityLevel()).colorCode}] p-2 w-full text-center text-white`}>{getColorByPriority(queue[0].getPriorityLevel()).colorName}</span>
                        </div>
                      </div>
                    </>
                  )}
                  {(queue.length === 0 || !calledPatient) && <p className="text-black">Nenhum paciente aguardando</p>}
              </div>
            </div>
            <div className="flex justify-evenly w-full">
              <div>
                <button
                  className={`min-w-[8rem] py-1.5 px-5 rounded font-bold ${
                    !calledPatient ? 'bg-gray-400 cursor-not-allowed' : 'bg-[rgb(128,237,153)] cursor-pointer'
                  }`}
                  onClick={calledPatient ? toggleModal : undefined}
                  disabled={!calledPatient}
                >
                  Dispensar
                </button>
              </div>

              <div>
                <button
                  className={`min-w-[8rem] py-1.5 px-5 rounded font-bold ${
                    !calledPatient ? 'bg-gray-400 cursor-not-allowed' : 'bg-[rgb(128,237,153)] cursor-pointer'
                  }`}
                  onClick={() => {
                    togglePatient()
                    attendPatient()
                  }}
                  disabled={!calledPatient}
                >
                  Atender paciente
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>

      {showModalPatientOff && (
        <div
          className={`${showModalPatientOff ? 'flex' : 'hidden'} h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)] absolute justify-center items-center left-0 top-0`}
          onClick={toggleModal}
        >
          <div
            className="bg-white h-[230px] w-[450px] relative flex justify-center items-center rounded flex-wrap shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[1.2rem] font-medium">Dispensar {queue[0].getAttendence().getPatient().getName()}?</p>
            <div className="flex w-full justify-evenly">
              <button
                className="bg-[rgb(128,237,153)] py-1.5 px-5 rounded font-bold cursor-pointer min-w-[8rem]"
                onClick={() => {
                  toggleModal()
                }}
              >
                Não
              </button>
              <button
                className="bg-[rgb(128,237,153)] py-1.5 px-5 rounded font-bold cursor-pointer min-w-[8rem]"
                onClick={() => {
                  releaseFirstPatient()
                  togglePatient()
                  toggleModal()
                }}
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}

    {showSuccesModal && <SuccesModal message="Paciente Atendido!" />}
      
    </div>
  )
}
