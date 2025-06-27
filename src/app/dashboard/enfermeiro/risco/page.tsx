'use client'

import { SuccesModal } from '@/components/sucessModal'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Risco() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [showModal, setShowModal] = useState(false)
  async function onSubmit(data: any) {
    try {
      const urlParams = Object.fromEntries(searchParams.entries())

      const prioridade = parseInt(data.risk_level)

      const atendimento_id = parseInt(urlParams.atendimento_id || '')
      const classificacao_risco_id = prioridade+1
      const pressao_arterial = urlParams.blood_pressure || ''
      const frequencia_cardiaca = parseFloat(urlParams.heart_rate || '')
      const frequencia_respiratoria = parseFloat(urlParams.respiratory_rate || '')
      const temperatura = parseFloat(urlParams.temperature || '')
      const saturacao_oxigenio = parseFloat(urlParams.oxygen_saturation || '')
      const nivel_dor = urlParams.pain_level ? parseInt(urlParams.pain_level) : 0
      const paciente_id = urlParams.paciente_id ? parseInt(urlParams.paciente_id) : 0

      if (
        isNaN(atendimento_id) ||
        isNaN(classificacao_risco_id) ||
        pressao_arterial.trim() === '' ||
        isNaN(frequencia_cardiaca) ||
        isNaN(frequencia_respiratoria) ||
        isNaN(temperatura) ||
        isNaN(saturacao_oxigenio) ||
        isNaN(nivel_dor)
      ) {
        alert("Erro: há campos inválidos ou vazios.")
        return
      }

      const body = {
        atendimento_id,
        classificacao_risco_id,
        pressao_arterial,
        frequencia_cardiaca,
        frequencia_respiratoria,
        temperatura,
        saturacao_oxigenio,
        nivel_dor
      }

      console.log("Enviando body:", body)

      // inserção nova triagem
      const res = await fetch(`/api/avaliacaoClinica`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })

      const result = await res.json()

      if (!res.ok) {
        console.error("Erro:", result)
        alert(`Erro ao salvar: ${result.error || 'Erro desconhecido'}`)
        return
      }

      // atribuição risco para atendimento
      const resUpdateAtendimento = await fetch(`/api/atendimento/update-by-id/${String(atendimento_id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({avaliacao_clinica_id: result.id})
      })

      const resultUpdAtendimento = await resUpdateAtendimento.json()
      
      if (!resUpdateAtendimento.ok) {
        alert(`Erro na atribuição de risco: ${resultUpdAtendimento.error}`)
        return
      }

      // atualiza prioridade na fila
      const resUpdFila = await fetch(`/api/filaDePrioridade/update-by-paciente-id/${String(atendimento_id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({prioridade: prioridade})
      })

      const resultUpdtFila = await resUpdFila.json()
      
      if (!resUpdFila.ok) {
        alert(`Erro na mudança de prioridade: ${resultUpdtFila.error}`)
        return
      }

      // atualiza status para aguardando atendimento
      const resUpdStatus = await fetch(`/api/atendimento/update-status/${String(atendimento_id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({status: 1})
      })

      const resultUpdStatus = await resUpdStatus.json()
      
      if (!resUpdStatus.ok) {
        alert(`Erro na mudança de status: ${resultUpdStatus.error}`)
        return
      }

      setShowModal(true)
      setTimeout(() => router.push('/filaExibicao'), 2000)
    } catch (error: any) {
      console.error("Erro:", error)
      alert("Erro inesperado: " + error.message)
    }
  }

  return (
    <div className="mt-[3rem] flex justify-center font-[family-name:var(--font-gabarito)]">
      <div className="flex flex-col gap-8">
        <main className="bg-[#1f5c77] py-6 px-[5rem] rounded-lg text-white flex flex-col gap-3 flex-wrap max-w-[72rem] text-[13px] font-bold shadow-2xl">
          <h1 className="text-center w-full font-extrabold text-xl tracking-wider">
            Classificação de Risco
          </h1>
          {errors.risk_level && (
            <div className="text-red-500 text-center font-normal">Selecione um risco</div>
          )}
          <div className="flex flex-col gap-2">
            <label className="cursor-pointer flex">
              <input
                type="radio"
                value={0}
                className="peer hidden"
                {...register('risk_level', { required: true })}
              />
              <span className="bg-[#ef233c] rounded py-1.5 px-6 hover:opacity-90 transition duration-150 peer-checked:outline flex-1 text-center">
                Emergência
              </span>
            </label>

            <label className="cursor-pointer flex">
              <input
                type="radio"
                value={1}
                className="peer hidden"
                {...register('risk_level', { required: true })}
              />
              <span className="bg-[#e85d04] rounded py-1.5 px-6 hover:opacity-90 transition duration-150 peer-checked:outline flex-1 text-center">
                Muito Urgente
              </span>
            </label>

            <label className="cursor-pointer flex">
              <input
                type="radio"
                value={2}
                className="peer hidden"
                {...register('risk_level', { required: true })}
              />
              <span className="bg-[#ffba08] rounded py-1.5 px-6 hover:opacity-90 transition duration-150 peer-checked:outline flex-1 text-center">
                Urgente
              </span>
            </label>

            <label className="cursor-pointer flex">
              <input
                type="radio"
                value={3}
                className="peer hidden"
                {...register('risk_level', { required: true })}
              />
              <span className="bg-[#7cb518] rounded py-1.5 px-6 hover:opacity-90 transition duration-150 peer-checked:outline flex-1 text-center">
                Pouco Urgente
              </span>
            </label>

            <label className="cursor-pointer flex">
              <input
                type="radio"
                value={4}
                className="peer hidden"
                {...register('risk_level', { required: true })}
              />
              <span className="bg-[#5c95ff] rounded py-1.5 px-6 hover:opacity-90 transition duration-150 peer-checked:outline flex-1 text-center">
                Não Urgente
              </span>
            </label>
          </div>
        </main>
        <div className="flex justify-evenly">
          <div>
            <Link href="/dashboard/enfermeiro/sinaisVitais">
              <button className="bg-[rgb(56,163,165)] p-2 text-white text-[15px]  font-bold rounded min-w-[8rem] cursor-pointer shadow-2xl hover:opacity-[90%] transition duration-150">
                Voltar
              </button>
            </Link>
          </div>
          <div>
            <button
              className="bg-[rgb(56,163,165)] p-2 text-white text-[15px] font-bold rounded min-w-[8rem] cursor-pointer shadow-2xl hover:opacity-[90%] transition duration-150"
              onClick={() => handleSubmit(onSubmit)()}
            >
              Finalizar
            </button>
          </div>
        </div>
      </div>
      {showModal && <SuccesModal message="Triagem Concluída!" />}
    </div>
  )
}
