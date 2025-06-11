'use client'

import Image from 'next/image'
import { useState } from 'react'


export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [errors, setErros] = useState({
    email: false,
    password: false,
  })

  return (
    <div className='flex justify-center items-center mt-[10rem]'>
      <div className='bg-[rgb(56,163,165)] flex flex-col p-10 flex-wrap gap-20 rounded-2xl items-center'>
        <div className='flex flex-col'>
          <div className='flex justify-center'>
            <Image src="/systemLogoShadow.svg" alt='' height={150} width={150}/>
          </div>
          <label className='text-[rgb(34,87,122)] font-bold text-4xl text-center'>MedLink</label>
        </div>

        <div className='flex flex-col items-center gap-5'>
          <div className='bg-white flex items-center p-6 gap-2 w-full'>
            <Image src={"/mail_32_black.svg"} alt='' height={30} width={30} />
            <label className='text-2xl'>Email</label>
            <input 
            type="text" 
            value={formData.email}
            className='focus-within:outline-0 h-full text-2xl tracking-wide'
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div className='bg-white flex items-center p-6 gap-2 w-full'>
            <Image src={"/lock_32_black.svg"} alt='' height={30} width={30} />
            <label className='text-2xl'>Senha</label>
            <input 
            type="text" 
            value={formData.password}
            className='focus-within:outline-0 h-full text-2xl tracking-wide'
            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            />
          </div>

        </div>

        <div>
          <button className='bg-[rgb(128,237,153)] shadow-2xs py-3 px-10 font-semibold text-2xl rounded'>Entrar</button>
        </div>
      </div>
    </div>
  )
}
