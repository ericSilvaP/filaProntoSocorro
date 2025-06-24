'use client'

import { SuccesModal } from '@/components/sucessModal'
import { BloodType } from '@/types/bloodType'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function CadastroPessoa() {
  const router = useRouter()
  const bloodTypes = Object.values(BloodType)
  const [showModal, setShowModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = () => {
    setShowModal(true)
    setTimeout(() => {
      router.push('/')
    }, 2500)
  }

  return (
    <div className="flex items-center py-[5rem] flex-col font-[family-name:var(--font-gabarito)]">
      <div className="flex flex-col px-10 gap-10">
        <main className="bg-[#1f5c77] p-6 rounded-lg text-white flex gap-5 flex-wrap max-w-[72rem] text-xl font-bold">
          <div className="w-full">
            <h1 className="text-center w-full font-extrabold text-2xl">
              INFORMAÇÕES BÁSICAS DE SAÚDE
            </h1>
          </div>
          <div className="flex justify-end w-full gap-10">
            <div className="">Alergias:</div>
            <div className="w-[750px] h-[150px]">
              <textarea
                className={`bg-white text-black h-full w-full resize-none font-extralight ${errors.allergies && 'outline-2 outline-[rgb(240,101,58)]'} px-2`}
                {...register('allergies', {
                  required: true,
                })}
              />
            </div>
          </div>
          <div className="flex justify-end w-full gap-10">
            <div className="">Doenças:</div>
            <div className="w-[750px] h-[150px]">
              <textarea
                className={`bg-white text-black h-full w-full resize-none font-extralight ${errors.illness && 'outline-2 outline-[rgb(240,101,58)]'} px-2`}
                {...register('illness', {
                  required: true,
                })}
              />
            </div>
          </div>
          <div className="flex justify-end w-full gap-10">
            <div className="">Uso de medicamentos: </div>
            <div className="w-[750px] h-[150px]">
              <textarea
                className={`bg-white text-black h-full w-full resize-none font-extralight px-2 ${errors.medications && 'outline-2 outline-[rgb(240,101,58)]'}`}
                {...register('medications', {
                  required: true,
                })}
              />
            </div>
          </div>
          <div className="flex justify-end w-full gap-10">
            <div>Tipo de sangue:</div>
            <div className="w-[750px] flex gap-8">
              {bloodTypes.map((bt) => (
                <label className="flex gap-2" key={bt}>
                  <input
                    type="radio"
                    value={bt}
                    className="scale-150"
                    {...register('bloodType', { required: true })}
                  />
                  <div>{bt}</div>
                </label>
              ))}
            </div>
          </div>
        </main>
        <div className="flex justify-between">
          <Link href={'/cadastroPessoa'}>
            <button className="bg-[rgb(56,163,165)] p-2 text-white text-2xl font-bold rounded">
              Voltar
            </button>
          </Link>

          <button
            className="bg-[rgb(56,163,165)] p-2 text-white text-2xl font-bold rounded"
            onClick={() => handleSubmit(onSubmit)()}
          >
            Cadastrar Paciente
          </button>
          {showModal && <SuccesModal message="Paciente Cadastrado!" />}
        </div>
      </div>
    </div>
  )
}
