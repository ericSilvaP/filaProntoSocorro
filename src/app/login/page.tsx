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
        headers: { "Content-Type": "application/json" },
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
  }, [])

  return (
    <div className="flex justify-center items-center w-full h-[100vh] px-4 font-[family-name:var(--font-gabarito)]">
      <div className="bg-[rgb(56,163,165)] w-full max-w-xs md:max-w-[500px] flex flex-col p-8 md:p-10 gap-10 rounded-2xl items-center shadow-2xl">
        
        <div className="flex flex-col items-center">
          <Image
            src="/systemLogoShadow.svg"
            alt=""
            height={100}
            width={100}
            className="select-none"
          />
          <label className="text-white font-bold text-3xl md:text-4xl mt-2">MedLink</label>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center gap-5">
          <label className={`bg-white flex items-center p-3 gap-4 w-full rounded ${errors.email ? 'outline-2 outline-[rgb(240,101,58)]' : ''}`}>
            <Image src="/mail_32_black.svg" alt="" height={24} width={24} />
            <span className="text-base md:text-lg">Email</span>
            <input
              autoComplete="off"
              type="text"
              className="flex-1 text-base md:text-lg focus:outline-none"
              {...register('email', {
                required: true,
                validate: (value) => isEmail(value),
              })}
            />
          </label>

          <label className={`bg-white flex items-center p-3 gap-4 w-full rounded ${errors.password ? 'outline-2 outline-[rgb(240,101,58)]' : ''}`}>
            <Image src="/lock_32_black.svg" alt="" height={24} width={24} />
            <span className="text-base md:text-lg">Senha</span>
            <input
              autoComplete="off"
              type={showPassword ? 'password' : 'text'}
              className="flex-1 text-base md:text-lg focus:outline-none"
              {...register('password', { required: true })}
            />
            <button type="button" onClick={togglePasswordVisibility} className="p-1 rounded-full hover:bg-gray-200 transition">
              <Image
                src={showPassword ? '/visibilityOff_32_black.svg' : '/visibilityOn_32_black.svg'}
                alt=""
                height={24}
                width={24}
              />
            </button>
          </label>

          <button
            type="submit"
            className="bg-[rgb(128,237,153)] shadow-md py-3 px-6 font-semibold text-lg md:text-2xl rounded hover:brightness-110 transition-all w-full"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
