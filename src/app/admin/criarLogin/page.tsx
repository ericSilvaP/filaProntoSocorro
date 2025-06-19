'use client'

import { SuccesModal } from '@/components/sucessModal'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { isEmail } from 'validator'

export default function CriarLogin() {

  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors }
  } = useForm()

  const onSubmit = () => {
    setShowModal(true)
    setTimeout(() => {
      router.push("/admin")
    }, 2500)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const togglePasswordRepeatedVisibility = () => {
    setRepeatedShowPassword(!showRepeatedPassword)
  }

  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatedPassword, setRepeatedShowPassword] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <div className={`flex justify-center items-center h-full mt-[3rem] font-[family-name:var(--font-gabarito)]`}>
      <div className='bg-[rgb(56,163,165)] flex flex-col p-[2rem] flex-wrap gap-20 rounded-2xl items-center shadow-2xl md:max-w-500px'>
        <div className='flex flex-col'>
          <div className='flex justify-center'>
            <Image src="/systemLogoShadow.svg" alt='' height={120} width={120} className='select-none'/>
          </div>
          <label className={`text-[rgb(34,87,122)] font-bold text-3xl text-center`}>MedLink</label>
        </div>

        <div className='flex flex-col items-center gap-5'>

          {/* erro senhas diferentes */}
          {errors.password && <div className="text-white text-center font-normal text-[18px]">{errors.password.message?.toString()}</div>}

          <label className={`bg-white flex items-center p-4 gap-5 w-full ${errors.email ? 'outline-3 outline-[rgb(240,101,58)]' : ""}`}>
            <Image src={"/mail_32_black.svg"} alt='' height={30} width={30} className='select-none' />
            <div className='flex text-[18px] h-full items-center translate-y-[1.5px] flex-2'>Email</div>
            <input 
            type="text"
            className='focus-within:outline-0 h-full text-[18px] tracking-wide flex-8'
            {...register("email", { 
              required: true,
              validate: (value) => isEmail(value)
            })}
            />
          </label>

          <label className={`bg-white flex items-center p-4 gap-5 w-full ${errors.password ? 'outline-3 outline-[rgb(240,101,58)]' : ""}`}>
            <Image src={"/lock_32_black.svg"} alt='' height={30} width={30} className='select-none'/>
            <label className='text-[18px] flex-2'>Senha</label>
            <Controller 
              name='password'
              control={control}
              rules={{
                required: true,
                validate: (value) => (
                  getValues("repeatPassword") === value || "Senhas devem ser iguais"
                )
              }}
              render={({ field }) => 
                (
                  <input 
                  {...field}
                  type={showPassword ? "password" : "text"}
                  className={`focus-within:outline-0 h-full text-[18px] tracking-wide flex-8`}
                  />
                )
              }
            />
            {
              !showPassword && 
              <button onClick={togglePasswordVisibility} className='h-[55px] w-[55px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)] transition ease-in-out duration-300 rounded-full flex justify-center'>
                <Image src={"/visibilityOn_32_black.svg"} alt='' height={30} width={30} className='select-none'/>
              </button>
            }
            {
              showPassword && <button onClick={togglePasswordVisibility} className='h-[55px] w-[55px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)] transition ease-in-out duration-300 rounded-full flex justify-center'>
                <Image src={"/visibilityOff_32_black.svg"} alt='' height={30} width={30} className='select-none'/>
              </button>
            }

          </label>

          <label className={`bg-white flex items-center p-4 gap-5 w-full ${errors.password ? 'outline-3 outline-[rgb(240,101,58)]' : ""}`}>
            <Image src={"/lock_32_black.svg"} alt='' height={30} width={30} className='select-none'/>
            <label className='text-[18px] flex-2'>Confirmar Senha</label>
            <input 
            type={showRepeatedPassword ? "password" : "text"}
            className={`focus-within:outline-0 h-full text-[18px] tracking-wide flex-8`}
            {...register("repeatPassword", { required: true })}
            />
            {
              !showRepeatedPassword && 
              <button onClick={togglePasswordRepeatedVisibility} className='h-[55px] w-[55px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)] transition ease-in-out duration-300 rounded-full flex justify-center'>
                <Image src={"/visibilityOn_32_black.svg"} alt='' height={30} width={30} className='select-none'/>
              </button>
            }
            {
              showRepeatedPassword && <button onClick={togglePasswordRepeatedVisibility} className='h-[55px] w-[55px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)] transition ease-in-out duration-300 rounded-full flex justify-center'>
                <Image src={"/visibilityOff_32_black.svg"} alt='' height={30} width={30} className='select-none'/>
              </button>
            }

          </label>
        </div>

        <div>
          <button
          className='bg-[rgb(128,237,153)] shadow-2xl py-3 px-10 font-semibold text-[18px] rounded cursor-pointer hover:brightness-110 transition-all duration-150'
          onClick={() => handleSubmit(onSubmit)()}
          >
            Criar Usuário
          </button>
        </div>
      </div>

    {showModal && <SuccesModal message="Usuário Cadastrado!"/>}
      
    </div>
  )
}
