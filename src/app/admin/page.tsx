'use client'

import Link from "next/link"
import { Controller, useForm } from "react-hook-form"

export default function Admin() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm()

  const onSubmit = () => (
    alert("osjasj")
  )

  

  return (
    <div className="flex justify-center mt-[3rem]">

      <div className="flex flex-col gap-10">
        <div className="bg-[#1f5c77] py-6 px-[5rem] rounded-lg text-white flex flex-col gap-7 flex-wrap max-w-[72rem] text-xl font-bold shadow-2xl">
          <h1 className="text-center w-full font-extrabold text-2xl tracking-wider">Criar perfil</h1>
          { errors.risk_level && <div className="text-red-500 text-center font-normal">Selecione um risco</div> }
          <div className="flex flex-col gap-4">
              <label className="cursor-pointer flex">
                  <input
                      type="radio"
                      value={0}
                      className="peer hidden"
                      {...register("risk_level", { required: true })}
                  />
                  <span className="bg-[#ef233c] rounded py-3 px-6 hover:opacity-90 transition duration-150 peer-checked:outline flex-1 text-center">
                      Enfermeiro
                  </span>
              </label>

              <label className="cursor-pointer flex">
                  <input
                      type="radio"
                      value={2}
                      className="peer hidden"
                      {...register("risk_level", { required: true })}
                  />
                  <span className="bg-[#ffba08] rounded py-3 px-6 hover:opacity-90 transition duration-150 peer-checked:outline flex-1 text-center">
                      Recepcionista
                  </span>
              </label>

              <label className="cursor-pointer flex">
                  <input
                      type="radio"
                      value={3}
                      className="peer hidden"
                      {...register("risk_level", { required: true })}
                  />
                  <span className="bg-[#7cb518] rounded py-3 px-6 hover:opacity-90 transition duration-150 peer-checked:outline flex-1 text-center">
                      Médico
                  </span>
              </label>

          </div>
        </div>
      </div>

      
    </div>
  )
}