'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import {
  handleChangeDate,
  handleChangeCPF,
  handleChangePhone,
  handleChangeCRM,
  handleChangeCOREN
} from '@/lib/handleChange'
import { isValidDate, isValidCPF, replaceOnlyNumbers } from '@/lib/validations'

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
      telefone: data.phone,
      data_nascimento: data.birthDate,
      nome_mae: data.mother,
      nome_pai: data.father,
      estado_civil: data.maritalStatus,
      sexo: data.sex,
      papel: `${role}`,
      ...(role === 'medico' && { crm: data.crm }),
      ...(role === 'medico' && { especialidade: data.speciality }),
      ...(role === 'enfermeira' && { coren: data.coren })
    }).toString()

    router.push(`/admin/criarLogin?${query}`)
  }

  return (
    <div className="flex justify-center mt-[3rem] font-[family-name:var(--font-gabarito)]">
      <div className="flex flex-col gap-10">
        <main className="bg-[#1f5c77] p-6 rounded-lg text-white flex gap-5 flex-wrap max-w-[72rem] text-xl font-bold shadow-xl">
          <h2 className="text-center w-full font-extrabold text-2xl uppercase">Criar {role}</h2>

          <input
            {...register("name", { required: true })}
            placeholder="Nome"
            autoComplete="off"
            className={`custom-input w-full ${errors.name ? 'error' : ''}`}
          />
          <input
            {...register("mother", { required: true })}
            placeholder="Nome da mãe"
            autoComplete="off"
            className={`custom-input w-full ${errors.mother ? 'error' : ''}`}
          />
          <input
            {...register("father", { required: true })}
            placeholder="Nome do pai"
            autoComplete="off"
            className={`custom-input w-full ${errors.father ? 'error' : ''}`}
          />

          <input
            {...register("birthDate", {
              required: true,
              validate: (val) => isValidDate(val) || "Data inválida"
            })}
            placeholder="(DD/MM/AAAA)"
            autoComplete="off"
            className={`custom-input ${errors.birthDate ? 'error' : ''}`}
            onChange={(e) => setValue("birthDate", handleChangeDate(e))}
          />

          <select
            {...register("maritalStatus", { validate: val => val !== "0" })}
            className={`custom-input ${errors.maritalStatus ? 'error' : ''}`}
          >
            <option value="0">Estado civil</option>
            <option value="c">Casado</option>
            <option value="s">Solteiro</option>
          </select>

          <select
            {...register("sex", { validate: val => val !== "0" })}
            className={`custom-input ${errors.sex ? 'error' : ''}`}
          >
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
            autoComplete="off"
            className={`custom-input ${errors.cpf ? 'error' : ''}`}
            onChange={(e) => setValue("cpf", handleChangeCPF(e))}
          />

          <input
            {...register("phone", {
              required: true,
              validate: (val) => replaceOnlyNumbers(val).length === 11
            })}
            placeholder="Telefone"
            autoComplete="off"
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
              autoComplete="off"
              className={`custom-input ${errors.crm ? 'error' : ''}`}
              onChange={(e) => setValue("crm", handleChangeCRM(e))}
            />
          )}

          {role === "enfermeira" && (
            <input
              {...register("coren", {
                required: true,
                minLength: { value: 12, message: "Tamanho COREN insuficiente" }
              })}
              placeholder="COREN"
              autoComplete="off"
              className={`custom-input ${errors.coren ? 'error' : ''}`}
              onChange={(e) => setValue("coren", handleChangeCOREN(e))}
            />
          )}

          {role === "medico" && (
            <input
              {...register("speciality", { required: true })}
              placeholder="Especialidade"
              autoComplete="off"
              className={`custom-input ${errors.speciality ? 'error' : ''}`}
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
