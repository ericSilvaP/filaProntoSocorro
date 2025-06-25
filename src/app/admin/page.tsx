'use client'

import Link from 'next/link'

export default function Admin() {
  return (
    <div className="flex justify-center mt-[3rem]">
      <div className="flex flex-col gap-10">
        <div className="bg-[#1f5c77] py-6 px-[5rem] rounded-lg text-white flex flex-col gap-7 flex-wrap max-w-[72rem] text-xl font-bold shadow-2xl">
          <h1 className="text-center w-full font-extrabold text-2xl tracking-wider">
            Criar perfil
          </h1>
          <div className="flex flex-col gap-4">
            <Link href={'/admin/criarUsuario?papel=enfermeira'}>
              <label className="cursor-pointer flex">
                <span className="bg-[#ef233c] rounded py-3 px-6 hover:opacity-90 transition duration-150 flex-1 text-center">
                  Enfermeiro
                </span>
              </label>
            </Link>

            <Link href={'/admin/criarUsuario?papel=recepcionista'}>
              <label className="cursor-pointer flex">
                <span className="bg-[#ffba08] rounded py-3 px-6 hover:opacity-90 transition duration-150 flex-1 text-center">
                  Recepcionista
                </span>
              </label>
            </Link>

            <Link href={'/admin/criarUsuario?papel=medico'}>
              <label className="cursor-pointer flex">
                <span className="bg-[#7cb518] rounded py-3 px-6 hover:opacity-90 transition duration-150 flex-1 text-center">
                  Médico
                </span>
              </label>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
