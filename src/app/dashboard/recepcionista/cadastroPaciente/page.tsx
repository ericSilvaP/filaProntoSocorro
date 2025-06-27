'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { BloodType } from '@/types/bloodType'
import { isValidDate, replaceOnlyNumbers, isValidCPF, strToSqlDate } from '@/lib/validations'
import { SuccesModal } from '@/components/sucessModal'

export default function CadastroPessoa() {
  const router = useRouter()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const bloodTypes = Object.values(BloodType)
  const [showModal, setShowModal] = useState(false)

  const onSubmit = async (data: any) => {
    try {
      const rawCPF = data.cpf.replace(/[^0-9]/g, "")
      const sqlDate = strToSqlDate(data.birthDate)
      const rawPhone = data.phone.replace(/[^0-9]/g, "")

      const res = await fetch("/api/paciente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome: data.name,
          cartao_sus: data.sus,
          cpf: rawCPF,
          data_nascimento: sqlDate,
          tipo_sanguineo: data.bloodType === "desconhecido" ? null : data.bloodType,
          sexo: data.sex,
          estado_civil: data.maritalStatus,
          telefone: rawPhone,
          nome_pai: data.father,
          nome_mae: data.mother
        })
      })

      const result = await res.json()

      if (!res.ok) {
        alert(`Erro: ${result.error}`)
        return
      }

      setShowModal(true)
      setTimeout(() => router.push('/filaExibicao'), 2500)

    } catch (error) {
      alert("Erro de rede ou servidor.")
      console.error(error)
    }
  }

  return (
    <div className="flex items-center mt-[5rem] flex-col font-[family-name:var(--font-gabarito)]">
      <div className="flex flex-col px-10">
        <main className="bg-[#1f5c77] p-6 rounded-lg text-white flex gap-5 flex-wrap max-w-[72rem] text-xl font-bold">
          <h2 className="text-center w-full font-extrabold text-2xl">IDENTIFICAÇÃO DO PACIENTE</h2>

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
            onChange={(e) => {
              let input = replaceOnlyNumbers(e.target.value).slice(0, 8)
              if (input.length > 4) input = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4)}`
              else if (input.length > 2) input = `${input.slice(0, 2)}/${input.slice(2)}`
              setValue("birthDate", input)
            }}
          />

          <select {...register("maritalStatus", { validate: val => val !== "0" })} className={`custom-input ${errors.maritalStatus ? 'error' : ''}`}>
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
            autoComplete="off"
            className={`custom-input ${errors.cpf ? 'error' : ''}`}
            onChange={(e) => {
              let input = replaceOnlyNumbers(e.target.value).slice(0, 11)
              input = input.replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
              setValue("cpf", input)
            }}
          />

          <input
            {...register("sus", {
              required: true,
              validate: (val) => replaceOnlyNumbers(val).length === 15
            })}
            placeholder="SUS"
            autoComplete="off"
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
            autoComplete="off"
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
                  value={"desconhecido"}
                  className="scale-150"
                  {...register('bloodType', { required: true })}
                />
                <div>Desconhecido</div>
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

      {showModal && <SuccesModal message="Paciente Cadastrado!" />}
    </div>
  )
}
