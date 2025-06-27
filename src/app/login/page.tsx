'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { isEmail } from 'validator'

export default function Home() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        alert(`Erro: ${result.error}`)
        return
      }

      if (result.usuario.papel === "admin") router.push('/admin')
      else router.push(`/filaExibicao`)
        
      } catch (error) {
        alert("Erro de rede ou servidor.")
        console.error(error)
      }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  })

  return (
    <div
      className={`flex justify-center items-center w-full h-[100vh] -translate-y-6 font-[family-name:var(--font-gabarito)]`}
    >
      <div className="bg-[rgb(56,163,165)] flex flex-col p-[2.5rem] flex-wrap gap-20 rounded-2xl items-center shadow-2xl md:max-w-500px">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <Image
              src="/systemLogoShadow.svg"
              alt=""
              height={150}
              width={150}
              className="select-none"
            />
          </div>
          <label className={`text-[rgb(34,87,122)] font-bold text-4xl text-center`}>MedLink</label>
        </div>

        <div className="flex flex-col items-center gap-5">
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
            <div className="flex text-[20px] h-full items-center translate-y-[1.5px]">Email</div>
            <input
              autoComplete='off'
              type="text"
              className="focus-within:outline-0 h-full text-[20px] tracking-wide"
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
            <label className="text-[20px]">Senha</label>
            <input
              autoComplete='off'
              type={showPassword ? 'password' : 'text'}
              className={`focus-within:outline-0 h-full text-[20px] tracking-wide`}
              {...register('password', { required: true })}
            />
            {!showPassword && (
              <button
                onClick={togglePasswordVisibility}
                className="cursor-pointer hover:bg-[rgba(0,0,0,0.2)] transition ease-in-out duration-300 rounded-full flex justify-center"
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
                className="cursor-pointer hover:bg-[rgba(0,0,0,0.2)] transition ease-in-out duration-300 rounded-full flex justify-center"
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
            className="bg-[rgb(128,237,153)] shadow-2xl py-3 px-10 font-semibold text-2xl rounded cursor-pointer hover:brightness-110 transition-all duration-150"
            onClick={() => handleSubmit(onSubmit)()}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  )
}
