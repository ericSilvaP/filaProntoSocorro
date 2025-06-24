'use client'

import { SearchBarInteractive } from '@/components/searchBarInteractive'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function HomeEnfermeiro() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  function onSubmit(data: any) {
    const query = new URLSearchParams({
      name: data.patient,
    }).toString()

    router.push(`/enfermeiro/sinaisVitais?${query}`)
  }

  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [noSearchResult, setNoSearchResult] = useState(false)

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

  const filteredPatients = patients.filter((p) =>
    p.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  function searchPatient() {
    setSearchTerm(searchInput.trim())
    setValue('patient', '') // reseta valor de pacientes no formulario
    setNoSearchResult(false)
    if (filteredPatients.length === 0 || searchInput.length === 0) setNoSearchResult(true)
  }

  return (
    <div className="flex justify-center mt-[3rem] font-[family-name:var(--font-gabarito)]">
      <div className="flex flex-col items-center w-[80vw] lg:w-[60vw] gap-6">
        <h1 className="text-center font-bold text-[20px] uppercase">PACIENTES PARA TRIAGEM</h1>
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
                <div className={`flex-7 truncate whitespace-nowrap overflow-hidden`}>{p}</div>
                <div className="flex-3">492.719.478-78</div>
              </div>
            </label>
          ))}
        </div>

        <div className="flex justify-evenly w-full">
          <button className="bg-[rgb(56,163,165)] p-2 text-white text-2xl font-bold rounded min-w-[9rem] shadow-2xl hover:opacity-70 transition-opacity duration-150 ease-in-out cursor-pointer">
            Editar
          </button>
          <button
            className="bg-[rgb(56,163,165)] p-2 text-white text-2xl font-bold rounded min-w-[9rem] shadow-2xl hover:opacity-70 transition-opacity duration-150 ease-in-out cursor-pointer"
            onClick={() => handleSubmit(onSubmit)()}
          >
            Avaliar
          </button>
        </div>
      </div>
    </div>
  )
}
