'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { isValidDate, isValidCPF, replaceOnlyNumbers } from '@/app/dashboard/recepcionista/cadastroPaciente/page'

export const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>): string => {
  let input = e.target.value.replace(/\D/g, '') // remove tudo que não for número

  if (input.length > 8) input = input.slice(0, 8) // limita a 8 dígitos (DDMMYYYY)

  // adiciona barras
  if (input.length > 4) {
    input = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4)}`
  } else if (input.length > 2) {
    input = `${input.slice(0, 2)}/${input.slice(2)}`
  }

  return input
}

export const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
  let input = replaceOnlyNumbers(e.target.value).slice(0, 11)

  input = input.replace(/(\d{2})(\d)/, '($1) $2')
  input = input.replace(/(\d{5})(\d)/, '$1-$2')

  return input
}

export const handleChangeCPF = (e: React.ChangeEvent<HTMLInputElement>): string => {
  let input = replaceOnlyNumbers(e.target.value.slice(0, 14))

  input = input.replace(/(\d{3})(\d)/, '$1.$2')
  input = input.replace(/(\d{3})(\d)/, '$1.$2')
  input = input.replace(/(\d{3})(\d)/, '$1-$2')

  return input
}

const handleChangeCOREN = (e: React.ChangeEvent<HTMLInputElement>): string => {
  let input = e.target.value.toUpperCase()

  input = input.replace(/[^A-Z0-9]/g, '')

  if (input.length < 3) input = input.replace(/[^A-Z]/, '')

  const match = input.match(/^([A-Z]{0,2})(\d{0,6})([A-Z]{0,2})/)

  if (!match) return input

  const [, uf, number, category] = match

  let formatted = uf
  if (number) formatted += `-${number}`
  if (category) formatted += ` ${category}`

  return formatted.trim()
}

const handleChangeCRM = (e: React.ChangeEvent<HTMLInputElement>): string => {
  let input = e.target.value.toUpperCase()

  input = input.replace(/[^A-Z0-9]/g, '')

  if (input.length < 3) input = input.replace(/[^A-Z]/, '')

  const match = input.match(/^([A-Z]{0,2})(\d{0,6})/)

  if (!match) return input

  const [, uf, number] = match

  let formatted = uf
  if (number) formatted += `-${number}`

  return formatted.trim()
}

export default function CriarMedico() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get("papel")

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: any) => {
    const query = new URLSearchParams({
      nome: data.name,
      cpf: data.cpf,
      phone: data.phone,
      birthDate: data.birthDate,
      mother: data.mother,
      father: data.father,
      civilStatus: data.civilStatus,
      sex: data.sex,

      // adiciona CRM ou COREN dependendo do papel
      ...(role === 'medico' && { crm: data.crm }),
      ...(role === 'enfermeiro' && { coren: data.coren })
    }).toString()

    router.push(`/admin/criarLogin?${query}`)
  }


  return (
    <div className="flex justify-center mt-[3rem] font-[family-name:var(--font-gabarito)]">
      <div className="flex flex-col gap-10">
        <main className="bg-[#1f5c77] p-6 rounded-lg text-white flex gap-5 flex-wrap max-w-[72rem] text-xl font-bold">
          <h2 className="text-center w-full font-extrabold text-2xl uppercase">Criar {role}</h2>

          <input {...register("name", { required: true })} placeholder="Nome" className={`custom-input w-full ${errors.name ? 'error' : ''}`} />
          <input {...register("mother", { required: true })} placeholder="Nome da mãe" className={`custom-input w-full ${errors.mother ? 'error' : ''}`} />
          <input {...register("father", { required: true })} placeholder="Nome do pai" className={`custom-input w-full ${errors.father ? 'error' : ''}`} />

          <input
            {...register("birthDate", {
              required: true,
              validate: (val) => isValidDate(val) || "Data inválida"
            })}
            placeholder="Data de nascimento (DD/MM/AAAA)"
            className={`custom-input ${errors.birthDate ? 'error' : ''}`}
            onChange={(e) => setValue("birthDate", handleChangeDate(e))}
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
            onChange={(e) => setValue("cpf", handleChangeCPF(e))}
          />

          <input
            {...register("phone", {
              required: true,
              validate: (val) => replaceOnlyNumbers(val).length === 11
            })}
            placeholder="Telefone"
            className={`custom-input ${errors.phone ? 'error' : ''}`}
            onChange={(e) => setValue("phone", handleChangePhone(e))}
          />

          {role === "medico" && (
            <input
              {...register("crm", {
                required: true,
                minLength: { value: 9, message: "Tamanho CRM insuficiente" }
              })}
              placeholder="CRM"
              className={`custom-input ${errors.crm ? 'error' : ''}`}
              onChange={(e) => setValue("crm", handleChangeCRM(e))}
            />
          )}

          {role === "enfermeiro" && (
            <input
              {...register("coren", {
                required: true,
                minLength: { value: 12, message: "Tamanho COREN insuficiente" }
              })}
              placeholder="COREN"
              className={`custom-input ${errors.coren ? 'error' : ''}`}
              onChange={(e) => setValue("coren", handleChangeCOREN(e))}
            />
          )}
        </main>

        <div className="flex justify-evenly">
          <Link href={'/admin'}>
            <button className="bg-[rgb(56,163,165)] p-2 text-white text-2xl font-bold rounded min-w-[9rem] shadow-2xl hover:opacity-70 transition-opacity duration-150 ease-in-out cursor-pointer">
              Voltar
            </button>
          </Link>

          <button
            className="bg-[rgb(56,163,165)] p-2 text-white text-2xl font-bold rounded min-w-[9rem] shadow-2xl hover:opacity-70 transition-opacity duration-150 ease-in-out cursor-pointer"
            onClick={() => handleSubmit(onSubmit)()}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  )
}
