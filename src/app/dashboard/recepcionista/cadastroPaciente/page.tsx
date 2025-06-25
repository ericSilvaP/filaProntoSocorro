'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { BloodType } from '@/types/bloodType'

// utilitários
export function replaceOnlyNumbers(s: string) {
  return s.replace(/\D/g, '')
}

export function isValidDate(datestring: string): boolean {
  const [day, month, year] = datestring.split('/').map(Number)
  if (day < 1 || month < 1 || month > 12) return false
  const lastDayMonth = new Date(year, month, 0).getDate()
  return day <= lastDayMonth
}

export function isValidCPF(cpf: string): boolean {
  const cleanCPF = cpf.replace(/\D/g, '')
  if (cleanCPF.length !== 11) return false
  const nine = cleanCPF.slice(0, 9).split('')
  let sum = nine.reduce((acc, n, i) => acc + Number(n) * (10 - i), 0)
  let r = sum % 11
  const d1 = r < 2 ? 0 : 11 - r
  sum = nine.reduce((acc, n, i) => acc + Number(n) * (11 - i), 0) + d1 * 2
  r = sum % 11
  const d2 = r < 2 ? 0 : 11 - r
  return cleanCPF.endsWith(`${d1}${d2}`)
}

export default function CadastroPessoa() {
  const router = useRouter()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const bloodTypes = Object.values(BloodType)

  const onSubmit = async (data: any) => {
    alert(data)
    router.push('/filaExibicao')
  }

  return (
    <div className="flex items-center mt-[5rem] flex-col font-[family-name:var(--font-gabarito)]">
      <div className="flex flex-col px-10">
        <main className="bg-[#1f5c77] p-6 rounded-lg text-white flex gap-5 flex-wrap max-w-[72rem] text-xl font-bold">
          <h2 className="text-center w-full font-extrabold text-2xl">IDENTIFICAÇÃO DO PACIENTE</h2>

          <input {...register("name", { required: true })} placeholder="Nome" className={`custom-input w-full ${errors.name ? 'error' : ''}`} />
          <input {...register("mother", { required: true })} placeholder="Nome da mãe" className={`custom-input w-full ${errors.mother ? 'error' : ''}`} />
          <input {...register("father", { required: true })} placeholder="Nome do pai" className={`custom-input w-full ${errors.father ? 'error' : ''}`} />

          <input
            {...register("birthDate", {
              required: true,
              validate: (val) => isValidDate(val) || "Data inválida"
            })}
            placeholder="(DD/MM/AAAA)"
            className={`custom-input ${errors.birthDate ? 'error' : ''}`}
            onChange={(e) => {
              let input = replaceOnlyNumbers(e.target.value).slice(0, 8)
              if (input.length > 4) input = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4)}`
              else if (input.length > 2) input = `${input.slice(0, 2)}/${input.slice(2)}`
              setValue("birthDate", input)
            }}
          />

          <select {...register("civilStatus", { validate: val => val !== "0" })} className={`custom-input ${errors.civilStatus ? 'error' : ''}`}>
            <option value="0">Estado civil</option>
            <option value="c">Casado</option>
            <option value="s">Solteiro</option>
          </select>

          <select {...register("sex", { validate: val => val !== "0" })} className={`custom-input ${errors.sex ? 'error' : ''}`}>
            <option value="0">Sexo</option>
            <option value="m">Masculino</option>
            <option value="f">Feminino</option>
            <option value="i">Indefinido</option>
          </select>

          <input
            {...register("cpf", {
              required: true,
              validate: (val) => isValidCPF(val) || "CPF inválido"
            })}
            placeholder="CPF"
            className={`custom-input ${errors.cpf ? 'error' : ''}`}
            onChange={(e) => {
              let input = replaceOnlyNumbers(e.target.value).slice(0, 11)
              input = input.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2")
              setValue("cpf", input)
            }}
          />

          <input
            {...register("sus", {
              required: true,
              validate: (val) => replaceOnlyNumbers(val).length === 15
            })}
            placeholder="SUS"
            className={`custom-input ${errors.sus ? 'error' : ''}`}
            onChange={(e) => {
              const val = replaceOnlyNumbers(e.target.value).slice(0, 15)
              setValue("sus", val)
            }}
          />

          <input
            {...register("phone", {
              required: true,
              validate: (val) => replaceOnlyNumbers(val).length === 11
            })}
            placeholder="Telefone"
            className={`custom-input ${errors.phone ? 'error' : ''}`}
            onChange={(e) => {
              let input = replaceOnlyNumbers(e.target.value).slice(0, 11)
              input = input.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2')
              setValue("phone", input)
            }}
          />

          <div className="flex w-full gap-10">
            <div>Tipo de sangue:</div>
            <div className="w-[750px] flex gap-8">
              <label className="flex gap-2">
                  <input
                    type="radio"
                    value={"i"}
                    className="scale-150"
                    {...register('bloodType', { required: true })}
                  />
                  <div>Não Sei</div>
                </label>
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

        <div className="flex justify-end w-full mt-5">
          <button onClick={handleSubmit(onSubmit)} className="bg-[rgb(56,163,165)] p-2 text-white text-2xl font-bold rounded">
            Cadastrar Paciente
          </button>
        </div>
      </div>
    </div>
  )
}
