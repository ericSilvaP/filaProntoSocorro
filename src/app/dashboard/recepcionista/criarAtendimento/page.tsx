'use client'

import { SearchBarInteractive } from '@/components/searchBarInteractive'
import { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { Patient } from '@/core/models/people/Patient'

export default function CriarAtendimento() {
  Patient
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [noSearchResult, setNoSearchResult] = useState(false)
  const [patients, setPatients] = useState<Paciente[]>([])

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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  function onSubmit(data: unknown) {
    alert(JSON.stringify(data))
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
    setValue('patient', '') // reseta valor de pacientes no formulario
    setNoSearchResult(false)
    if (filteredPatients.length === 0 || searchInput.length === 0) setNoSearchResult(true)
  }

  return (
    <div className="flex justify-center mt-[3rem] font-[family-name:var(--font-gabarito)]">
      <div className="flex flex-col items-center w-[80vw] lg:w-[60vw] gap-6">
        <h1 className="text-center font-bold text-[20px]">PACIENTES CADASTRADOS</h1>
        <div className="flex flex-col bg-[#1f5c77] p-6 gap-2 w-full shadow-2xl">
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
            <div className="flex-7 text-[18px] font-bold">Nome</div>
            <div className="flex-3 text-[18px] font-bold">CPF</div>
          </div>
          
          <div className='flex flex-col gap-2 max-h-[400px] overflow-y-auto'>

            {filteredPatients.map((p, i) => (
              <label className="flex" key={i}>
                <input
                  type="radio"
                  value="49271947878"
                  className="peer hidden"
                  {...register('patient', { required: true })}
                />
                <div
                  className={`flex w-full peer-checked:bg-blue-200 bg-white p-1.5 rounded transition-colors duration-150`}
                >
                  <div className={`flex-7 truncate whitespace-nowrap overflow-hidden`}>{p.nome}</div>
                  <div className="flex-3">{p.cpf}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-evenly w-full">
          <button className="bg-[rgb(56,163,165)] p-2 text-white text-2xl font-bold rounded min-w-[9rem] shadow-2xl hover:opacity-70 transition-opacity duration-150 ease-in-out cursor-pointer">
            Editar
          </button>
          <button
            className="bg-[rgb(56,163,165)] p-2 text-white text-2xl font-bold rounded min-w-[9rem] shadow-2xl hover:opacity-70 transition-opacity duration-150 ease-in-out cursor-pointer"
            onClick={() => handleSubmit(onSubmit)()}
          >
            Criar atendimento
          </button>
        </div>
      </div>
    </div>
  )
}
