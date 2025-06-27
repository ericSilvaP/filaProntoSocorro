'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'

export default function SinaisVitais() {
  const router = useRouter()
  const searchParams = useSearchParams()
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
  
  function onSubmit(data: any) {
  const atendimento_id = searchParams.get("atendimento_id") || ""
  const nome = searchParams.get("nome") || ""
  const cpf = searchParams.get("cpf") || ""
  const paciente_id = searchParams.get("paciente_id") || ""

  const query = new URLSearchParams({
    atendimento_id,
    nome,
    cpf,
    heart_rate: data.heart_rate,
    respiratory_rate: data.respiratory_rate,
    blood_pressure: data.blood_pressure,
    temperature: data.temperature,
    oxygen_saturation: data.oxygen_saturation,
    pain_level: data.pain_level,
    paciente_id: paciente_id
  }).toString()

  router.push(`/dashboard/enfermeiro/risco?${query}`)
}


  function replaceNumbersNSlash(data: string) {
    return data.replace(/[^\d\/]/, '')
  }

  return (
    <div className="mt-[3rem] flex justify-center font-[family-name:var(--font-gabarito)]">
      <div className="flex flex-col gap-8">
        <main className="bg-[#1f5c77] py-6 px-[5rem] rounded-lg text-white flex flex-col gap-3 flex-wrap max-w-[72rem] text-[13px]">
          <h1 className="text-center w-full font-extrabold text-xl tracking-wider">
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
                    const formatted = replaceNumbersNSlash(e.target.value)
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
                    const formatted = replaceNumbersNSlash(e.target.value)
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
                    const formatted = replaceNumbersNSlash(e.target.value)
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
                    const formatted = replaceNumbersNSlash(e.target.value)
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
                    const formatted = replaceNumbersNSlash(e.target.value)
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
          <div className="flex items-center gap-2">
            <div className="text-white w-full">Nível de Dor:</div>
            <div className="flex justify-between gap-3">
              {pain_levels.map((pl, i) => (
                <label className="flex gap-1.5" key={pl}>
                  <input
                    type="radio"
                    value={i}
                    className="scale-100"
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
                className="bg-[rgb(56,163,165)] p-1.5 text-white text-[15px] font-bold rounded min-w-[9rem] cursor-pointer shadow-2xl hover:opacity-[90%] transition duration-150"
                onClick={() => handleSubmit(onSubmit)()}
              >
                Voltar
              </button>
            </Link>
          </div>
          <div>
            <button
              className="bg-[rgb(56,163,165)] p-1.5 text-white text-[15px] font-bold rounded min-w-[8rem] cursor-pointer shadow-2xl hover:opacity-[90%] transition duration-150"
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
