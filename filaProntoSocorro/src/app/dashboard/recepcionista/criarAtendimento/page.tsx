'use client'

import { SearchBarInteractive } from '@/components/searchBarInteractive'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { Patient } from '@/core/models/people/Patient'
import { getCookie } from '@/lib/cookies'
import { SuccesModal } from '@/components/sucessModal'
import { useRouter } from 'next/navigation'
import { formatCPF } from '@/lib/handleChange'

export default function CriarAtendimento() {
  type FormData = {
    paciente: string
  }

  interface Paciente {
    paciente_id: number
    nome: string
    nome_pai: string | null
    nome_mae: string | null
    cartao_sus: string
    cpf: string
    data_nascimento: string
    tipo_sanguineo: string | null
    sexo: string
    estado_civil: string
    telefone: string
  }

  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [noSearchResult, setNoSearchResult] = useState(false)
  const [patients, setPatients] = useState<Paciente[]>([])
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>()


  async function onSubmit(data: FormData) {

    try {

      const paciente_id = data.paciente

      const recepcionista_id = Number(getCookie("referenceId"))

      if (!recepcionista_id || !paciente_id) {
        alert(`Erro ao identificar paciente ou usuário logado.`)
        return
      }

      // criar atendimento
      const resService = await fetch(`/api/atendimento`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          paciente_id: 1,
          recepcionista_id: 1
        })
      })

      const resultService = await resService.json()

      if (!resService.ok || !resultService.id) {
        alert(`Erro: ${resultService.error || "Falha ao criar atendimento"}`)
        return
      }

      // inserir atendimento na fila
      const resQueue = await fetch(`/api/filaDePrioridade`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          atendimento_id: resultService.id,
          paciente_id: paciente_id
        })
      })

      const resultQueue = await resQueue.json()

      if (!resQueue.ok) {
        alert(`Erro ao inserir paciente na fila: ${resultQueue.error || 'Tente novamente'}`)
        return
      }

      // sucesso 
      setShowModal(true)
      setTimeout(() => router.push('/filaExibicao'), 2500)
      
    } catch (error) {
      console.error(`Erro ao buscar paciente: ${error}`)
    }
  }

  const filteredPatients = patients.filter((p) =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/paciente")
        const data = await res.json()
        setPatients(data)
      } catch (error) {
        console.error("Erro ao buscar pacientes:", error)
      }
    }

    fetchData()
  }, [])

  function searchPatient() {
    setSearchTerm(searchInput.trim())
    setValue('paciente', '') // reseta valor de pacientes no formulario
    setNoSearchResult(false)
    if (filteredPatients.length === 0 || searchInput.length === 0) setNoSearchResult(true)
  }

  return (
    <div className="flex justify-center mt-[2rem] font-[family-name:var(--font-gabarito)]">
      <div className="flex flex-col items-center w-[45rem] lg:w-[55rem] gap-4 text-[11px]">
        <h1 className="text-center font-bold text-[18px]">PACIENTES CADASTRADOS</h1>
        <div className="flex flex-col bg-[#1f5c77] p-6 gap-2 w-full shadow-2xl">
          <div className="flex items-center">
            <div className="w-full">
              <SearchBarInteractive
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={searchPatient}
              className="p-2 text-white text-xl font-bold rounded hover:opacity-70 transition-opacity duration-150 ease-in-out cursor-pointer"
            >
              <Image src="/search.svg" alt="" height={30} width={30} />
            </button>
          </div>

          {noSearchResult && (
            <div className="text-red-500 text-center font-normal">Sem resultado da pesquisa</div>
          )}

          {errors.paciente && (
            <div className="text-red-500 text-center font-normal">Selecione um paciente</div>
          )}

          <div className="text-white flex">
            <div className="flex-7 text-[15px] font-bold">Nome</div>
            <div className="flex-3 text-[15px] font-bold">CPF</div>
          </div>
          
          <div className='flex flex-col gap-2 max-h-[220px] overflow-y-auto'>

            {filteredPatients.map((p, i) => (
              <label className="flex" key={i}>
                <input
                  type="radio"
                  value={p.paciente_id}
                  className="peer hidden"
                  {...register('paciente', { required: true })}
                />
                <div
                  className={`flex w-full peer-checked:bg-blue-200 bg-white p-1.5 rounded transition-colors duration-150`}
                >
                  <div className={`flex-7 truncate whitespace-nowrap overflow-hidden`}>{p.nome}</div>
                  <div className="flex-3">{formatCPF(p.cpf)}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-evenly w-full">
          <button
            className="bg-[rgb(56,163,165)] p-1.5 text-white text-[15px] font-bold rounded min-w-[8rem] shadow-2xl hover:opacity-70 transition-opacity duration-150 ease-in-out cursor-pointer"
            onClick={() => handleSubmit(onSubmit)()}
          >
            Criar atendimento
          </button>
        </div>
      </div>
      
      {showModal && <SuccesModal message="Atendimento Criado!" />}
    </div>
  )
}
