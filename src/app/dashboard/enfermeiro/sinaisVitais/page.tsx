'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'

export default function SinaisVitais() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  enum pain_level {
    LIGHT = 'Leve',
    MEDIUM = 'Moderada',
    INTENSE = 'Intensa',
    EXTREME = 'Incapacitante',
  }

  const pain_levels = Object.values(pain_level)

  function onSubmit() {
    router.push('/dahsboard/enfermeiro/risco')
  }

  function replaceNumbersNPoint(data: string) {
    return data.replace(/[^\d\.]/, '')
  }

  return (
    <div className="mt-[3rem] flex justify-center font-[family-name:var(--font-gabarito)]">
      <div className="flex flex-col gap-10">
        <main className="bg-[#1f5c77] py-6 px-[5rem] rounded-lg text-white flex flex-col gap-7 flex-wrap max-w-[72rem] text-xl">
          <h1 className="text-center w-full font-extrabold text-2xl tracking-wider">
            Sinais Vitais
          </h1>

          {/* Frequência Cardíaca */}
          <div className="flex items-center">
            <div className="text-white flex-5">Frequência Cardíaca (bpm):</div>
            <Controller
              name="heart_rate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  onChange={(e) => {
                    const formatted = replaceNumbersNPoint(e.target.value)
                    field.onChange(formatted)
                  }}
                  value={field.value}
                  type="text"
                  autoComplete="off"
                  className={`custom-input flex-5 ${errors.heart_rate && 'outline-3 outline-[rgb(240,101,58)]'}`}
                />
              )}
            />
          </div>

          {/* Frequência Respiratória */}
          <div className="flex items-center">
            <div className="text-white flex-5">Frequência Respiratória (bpm):</div>
            <Controller
              name="respiratory_rate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  onChange={(e) => {
                    const formatted = replaceNumbersNPoint(e.target.value)
                    field.onChange(formatted)
                  }}
                  value={field.value}
                  type="text"
                  autoComplete="off"
                  className={`custom-input flex-5 ${errors.respiratory_rate && 'outline-3 outline-[rgb(240,101,58)]'}`}
                />
              )}
            />
          </div>

          {/* Pressão Arterial */}
          <div className="flex items-center">
            <div className="text-white flex-5">Pressão Arterial (mmHg):</div>
            <Controller
              name="blood_pressure"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  onChange={(e) => {
                    const formatted = replaceNumbersNPoint(e.target.value)
                    field.onChange(formatted)
                  }}
                  value={field.value}
                  type="text"
                  autoComplete="off"
                  className={`custom-input flex-5 ${errors.blood_pressure && 'outline-3 outline-[rgb(240,101,58)]'}`}
                />
              )}
            />
          </div>

          {/* Temperatura */}
          <div className="flex items-center">
            <div className="text-white flex-5">Temperatura Corporal (°C):</div>
            <Controller
              name="temperature"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  onChange={(e) => {
                    const formatted = replaceNumbersNPoint(e.target.value)
                    field.onChange(formatted)
                  }}
                  value={field.value}
                  type="text"
                  autoComplete="off"
                  className={`custom-input flex-5 ${errors.temperature && 'outline-3 outline-[rgb(240,101,58)]'}`}
                />
              )}
            />
          </div>

          {/* Saturação de Oxigênio */}
          <div className="flex items-center">
            <div className="text-white flex-5">Saturação O² (%):</div>
            <Controller
              name="oxygen_saturation"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  onChange={(e) => {
                    const formatted = replaceNumbersNPoint(e.target.value)
                    field.onChange(formatted)
                  }}
                  value={field.value}
                  type="text"
                  autoComplete="off"
                  className={`custom-input flex-5 ${errors.oxygen_saturation && 'outline-3 outline-[rgb(240,101,58)]'}`}
                />
              )}
            />
          </div>

          {/* Nível de Dor */}
          <div className="flex items-center flex-wrap gap-2">
            <div className="text-white w-full">Nível de Dor:</div>
            <div className="flex justify-between gap-6">
              {pain_levels.map((pl, i) => (
                <label className="flex gap-3" key={pl}>
                  <input
                    type="radio"
                    value={i}
                    className="scale-200"
                    {...register('pain_level', { required: true })}
                  />
                  <div>{pl}</div>
                </label>
              ))}
            </div>
          </div>
        </main>

        {/* Botões */}
        <div className="flex justify-evenly">
          <div>
            <Link href="/dashboard/enfermeiro">
              <button
                className="bg-[rgb(56,163,165)] p-2 text-white text-2xl  font-bold rounded min-w-[9rem] cursor-pointer shadow-2xl hover:opacity-[90%] transition duration-150"
                onClick={() => handleSubmit(onSubmit)()}
              >
                Voltar
              </button>
            </Link>
          </div>
          <div>
            <button
              className="bg-[rgb(56,163,165)] p-2 text-white text-2xl font-bold rounded min-w-[9rem] cursor-pointer shadow-2xl hover:opacity-[90%] transition duration-150"
              onClick={() => handleSubmit(onSubmit)()}
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
