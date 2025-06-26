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
    const patientIndex = data.patientIndex as number
    
    const query = new URLSearchParams({
      name: patients[patientIndex].name,
      cpf: patients[patientIndex].cpf
    }).toString()

    router.push(`/dashboard/enfermeiro/sinaisVitais?${query}`)
  }

  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [noSearchResult, setNoSearchResult] = useState(false)

  let patients = [
    { name: 'Ana Paula Silva', cpf: '12345678901' },
    { name: 'Bruno Oliveira Costa', cpf: '23456789012' },
    { name: 'Carlos Eduardo Lima', cpf: '34567890123' },
    { name: 'Daniela Souza Rocha', cpf: '45678901234' },
    { name: 'Eduardo Martins Lopes', cpf: '56789012345' },
    { name: 'Fernanda Alves Pinto', cpf: '67890123456' },
    { name: 'Gustavo Ferreira Melo', cpf: '78901234567' },
    { name: 'Helena Duarte Braga', cpf: '89012345678' },
    { name: 'Igor Santos Barros', cpf: '90123456789' },
    { name: 'Juliana Mendes Prado', cpf: '01234567890' },
  ]


  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  function searchPatient() {
    setSearchTerm(searchInput.trim())
    setValue('name', '') // reseta valor de pacientes no formulario
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
                  <div className={`flex-7 truncate whitespace-nowrap overflow-hidden`}>{p.name}</div>
                  <div className="flex-3">{p.cpf}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-evenly w-full">
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
