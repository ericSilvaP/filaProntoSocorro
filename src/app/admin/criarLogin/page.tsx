'use client'

import { SuccesModal } from '@/components/sucessModal'
import { strToSqlDate } from '@/lib/validations'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { isEmail } from 'validator'

export default function CriarLogin() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(true)
  const [showRepeatedPassword, setRepeatedShowPassword] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: any) => {
    try {
      const role = searchParams.get("papel")

      const rawCPF = searchParams.get("cpf")?.replace(/[^0-9]/g, "")
      
      const sqlDate = strToSqlDate(searchParams.get("data_nascimento")!)
      const rawPhone = searchParams.get("telefone")?.replace(/[^0-9]/g, "")

      const resUser = await fetch(`/api/${role}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...(role === 'medico' && { especialidade: searchParams.get("especialidade") }),
          ...(role === 'medico' && { crm: searchParams.get("crm") }),
          ...(role === 'enfermeira' && { coren: searchParams.get("coren") }),
          nome: searchParams.get("nome"),
          cpf: rawCPF,
          data_nascimento: sqlDate,
          sexo: searchParams.get("sexo"),
          estado_civil: searchParams.get("estado_civil"),
          telefone: rawPhone,
          nome_pai: searchParams.get("nome_pai"),
          nome_mae: searchParams.get("nome_mae"),
        })
      })

      const resultUser = await resUser.json()

      if (!resUser.ok || !resultUser.id) {
        alert(`Erro: ${resultUser.error || "Falha ao criar perfil."}`)
        return
      }

      const referenceId = resultUser.id

      const resLogin = await fetch("/api/usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          role,
          reference_id: referenceId
        })
      })

      const resultLogin = await resLogin.json()

      if (!resLogin.ok) {
        const resDelete = await fetch(`/api/${role}/${rawCPF}`, { method: 'DELETE' })
        const resultDelete = await resDelete.json()

        if (!resDelete.ok) {
          alert(`Erro ao remover perfil após falha: ${resultDelete.error}`)
          return
        }

        alert(`Erro ao criar login: ${resultLogin.error}`)
        return
      }

      setShowModal(true)
      setTimeout(() => {
        router.push('/admin')
      }, 2500)

    } catch (error) {
      alert("Erro de rede ou servidor.")
      console.error(error)
    }
  }


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const togglePasswordRepeatedVisibility = () => {
    setRepeatedShowPassword(!showRepeatedPassword)
  }

  return (
    <div
      className={`flex justify-center items-center h-full mt-[3rem] font-[family-name:var(--font-gabarito)]`}
    >
      <div className="bg-[rgb(56,163,165)] flex flex-col p-6 lg:p-8 gap-10 lg:gap-20 rounded-2xl items-center shadow-2xl w-[95%] max-w-[500px]">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <Image
              src="/systemLogoShadow.svg"
              alt=""
              height={120}
              width={120}
              className="select-none"
            />
          </div>
          <label className={`text-[rgb(34,87,122)] font-bold text-3xl text-center`}>MedLink</label>
        </div>

        <div className="flex flex-col items-center gap-5">
          {/* erro senhas diferentes */}
          {errors.password && (
            <div className="text-white text-center font-normal text-[18px]">
              {errors.password.message?.toString()}
            </div>
          )}

          <label
            className={`bg-white flex items-center p-4 gap-5 w-full ${errors.email ? 'outline-3 outline-[rgb(240,101,58)]' : ''}`}
          > 
            <Image
              src={'/mail_32_black.svg'}
              alt=""
              height={30}
              width={30}
              className="select-none"
            />
            <div className="flex text-[18px] h-full items-center translate-y-[1.5px] flex-2">
              Email
            </div>
            <input
              type="text"
              className="focus-within:outline-0 h-full text-[18px] tracking-wide flex-7 translate-x-3"
              autoComplete="off"
              {...register('email', {
                required: true,
                validate: (value) => isEmail(value),
              })}
            />

          </label>

          <label
            className={`bg-white flex items-center p-4 gap-5 w-full ${errors.password ? 'outline-3 outline-[rgb(240,101,58)]' : ''}`}
          >
            <Image
              src={'/lock_32_black.svg'}
              alt=""
              height={30}
              width={30}
              className="select-none"
            />
            <label className="text-[18px] flex-3">Senha</label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: true,
                validate: (value) =>
                  getValues('repeatPassword') === value || 'Senhas devem ser iguais',
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type={showPassword ? 'password' : 'text'}
                  className={`focus-within:outline-0 h-full text-[18px] tracking-wide flex-7`}
                />
              )}
            />
            {!showPassword && (
              <button
                onClick={togglePasswordVisibility}
                className="h-[55px] w-[55px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)] transition ease-in-out duration-300 rounded-full flex justify-center"
              >
                <Image
                  src={'/visibilityOn_32_black.svg'}
                  alt=""
                  height={30}
                  width={30}
                  className="select-none"
                />
              </button>
            )}
            {showPassword && (
              <button
                onClick={togglePasswordVisibility}
                className="h-[55px] w-[55px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)] transition ease-in-out duration-300 rounded-full flex justify-center"
              >
                <Image
                  src={'/visibilityOff_32_black.svg'}
                  alt=""
                  height={30}
                  width={30}
                  className="select-none"
                />
              </button>
            )}
          </label>

          <label
            className={`bg-white flex items-center p-4 gap-5 w-full ${errors.password ? 'outline-3 outline-[rgb(240,101,58)]' : ''}`}
          >
            <Image
              src={'/lock_32_black.svg'}
              alt=""
              height={30}
              width={30}
              className="select-none"
            />
            <label className="text-[18px] flex-3">Confirmar Senha</label>
            <input
              type={showRepeatedPassword ? 'password' : 'text'}
              className={`focus-within:outline-0 h-full text-[18px] tracking-wide flex-7`}
              {...register('repeatPassword', { required: true })}
            />
            {!showRepeatedPassword && (
              <button
                onClick={togglePasswordRepeatedVisibility}
                className="h-[55px] w-[55px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)] transition ease-in-out duration-300 rounded-full flex justify-center"
              >
                <Image
                  src={'/visibilityOn_32_black.svg'}
                  alt=""
                  height={30}
                  width={30}
                  className="select-none"
                />
              </button>
            )}
            {showRepeatedPassword && (
              <button
                onClick={togglePasswordRepeatedVisibility}
                className="h-[55px] w-[55px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)] transition ease-in-out duration-300 rounded-full flex justify-center"
              >
                <Image
                  src={'/visibilityOff_32_black.svg'}
                  alt=""
                  height={30}
                  width={30}
                  className="select-none"
                />
              </button>
            )}
          </label>
        </div>

        <div>
          <button
            className="bg-[rgb(128,237,153)] shadow-2xl py-3 px-10 font-semibold text-[18px] rounded cursor-pointer hover:brightness-110 transition-all duration-150"
            onClick={() => handleSubmit(onSubmit)()}
          >
            Criar Usuário
          </button>
        </div>
      </div>

      {showModal && <SuccesModal message="Usuário Cadastrado!" />}
    </div>
  )
}
