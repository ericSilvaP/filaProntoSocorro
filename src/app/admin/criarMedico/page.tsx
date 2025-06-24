'use client'

import { isValidCPF, isValidDate } from '@/app/cadastroPessoa/page'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  handleChangeDate,
  handleChangeCPF,
  handleChangeRG,
  handleChangePhone,
} from '../criarRecepcionista/page'

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

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm()

  const onSubmit = () => {
    router.push('/admin/criarLogin')
  }

  return (
    <div className="flex justify-center mt-[3rem] font-[family-name:var(--font-gabarito)]">
      <div className="flex flex-col gap-10">
        <main className="bg-[#1f5c77] p-6 rounded-lg text-white flex gap-5 flex-wrap max-w-[72rem] text-xl font-bold">
          <h2 className="text-center w-full font-extrabold text-2xl uppercase">Criar Enfermeiro</h2>

          {/* Nome */}
          <div className="w-full">
            <div className="flex gap-2 items-center">
              <label>Nome: </label>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    autoComplete="off"
                    className={`custom-input flex-5 ${errors.name && 'outline-3 outline-[rgb(240,101,58)]'}`}
                  />
                )}
              />
            </div>
          </div>

          {/* Nome da mãe */}
          <div className="w-full">
            <div className="flex gap-2 items-center">
              <label>Nome da mãe: </label>
              <Controller
                name="mother"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    autoComplete="off"
                    className={`custom-input flex-5 ${errors.mother && 'outline-3 outline-[rgb(240,101,58)]'}`}
                  />
                )}
              />
            </div>
          </div>

          {/* Nome do pai */}
          <div className="w-full">
            <div className="flex gap-2 items-center">
              <label>Nome do pai: </label>
              <Controller
                name="father"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    autoComplete="off"
                    className={`custom-input w-full ${errors.father && 'outline-3 outline-[rgb(240,101,58)]'}`}
                  />
                )}
              />
            </div>
          </div>

          {/* Data de nascimento, Estado civil, Sexo */}
          <div className="flex justify-between w-full gap-7">
            {/* Data de nascimento */}
            <div className="flex gap-2 items-center">
              <label>Data de nascimento: </label>
              <Controller
                name="birthDate"
                control={control}
                rules={{
                  required: true,
                  pattern: {
                    value: /^\d{2}\/\d{2}\/\d{4}$/,
                    message: 'Formato inválido (DD/MM/AAAA)',
                  },
                  validate: (value) => isValidDate(value),
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    autoComplete="off"
                    onChange={(e) => setValue('birthDate', handleChangeDate(e))}
                    className={`custom-input w-[9rem] ${errors.birthDate && 'outline-3 outline-[rgb(240,101,58)]'}`}
                    placeholder="DD/MM/AAAA"
                  />
                )}
              />
            </div>

            {/* Estado civil */}
            <div className="flex gap-2 items-center">
              <label>Estado civil: </label>
              <Controller
                name="civilStatus"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`custom-input ${errors.civilStatus && 'outline-3 outline-[rgb(240,101,58)]'}`}
                  >
                    <option value="0">Selecione uma opção</option>
                    <option value="c">Casado</option>
                    <option value="s">Solteiro</option>
                  </select>
                )}
              />
            </div>

            {/* Sexo */}
            <div className="flex gap-2 items-center">
              <label>Sexo: </label>
              <Controller
                name="sex"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`custom-input ${errors.sex && 'outline-3 outline-[rgb(240,101,58)]'}`}
                  >
                    <option value="0">Selecione uma opção</option>
                    <option value="m">Masculino</option>
                    <option value="f">Feminino</option>
                    <option value="i">Indefinido</option>
                  </select>
                )}
              />
            </div>
          </div>

          {/* CPF, RG, telefone */}
          <div className="flex justify-between w-full gap-7">
            {/* CPF */}
            <div className="flex gap-2 items-center w-full">
              <label>CPF: </label>
              <Controller
                name="cpf"
                control={control}
                rules={{
                  required: true,
                  validate: (value) => isValidCPF(value),
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    autoComplete="off"
                    onChange={(e) => setValue('cpf', handleChangeCPF(e))}
                    className={`custom-input w-full ${errors.cpf && 'outline-3 outline-[rgb(240,101,58)]'}`}
                  />
                )}
              />
            </div>

            {/* RG */}
            <div className="flex gap-2 items-center w-full">
              <label>RG: </label>
              <Controller
                name="rg"
                control={control}
                rules={{
                  required: true,
                  minLength: { value: 9, message: 'Tamanho de RG insuficiente' },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    autoComplete="off"
                    onChange={(e) => setValue('rg', handleChangeRG(e))}
                    className={`custom-input w-full ${errors.rg && 'outline-3 outline-[rgb(240,101,58)]'}`}
                  />
                )}
              />
            </div>

            {/* Telefone */}
            <div className="flex gap-2 items-center">
              <label>Telefone: </label>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: true,
                  minLength: { value: 15, message: 'Tamanho Telefone insuficiente' },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    autoComplete="off"
                    onChange={(e) => setValue('phone', handleChangePhone(e))}
                    className={`custom-input ${errors.phone && 'outline-3 outline-[rgb(240,101,58)]'}`}
                  />
                )}
              />
            </div>

            {/* CRM */}
            <div className="flex gap-2 items-center">
              <label>CRM: </label>
              <Controller
                name="crm"
                control={control}
                rules={{
                  required: true,
                  minLength: { value: 9, message: 'Tamanho CRM insuficiente' },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    autoComplete="off"
                    onChange={(e) => setValue('crm', handleChangeCRM(e))}
                    className={`custom-input ${errors.crm && 'outline-3 outline-[rgb(240,101,58)]'}`}
                  />
                )}
              />
            </div>
          </div>
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
