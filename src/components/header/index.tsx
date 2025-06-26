'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function Header() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const navButtons = [
    { text: 'Cadastrar Paciente', link: '/dashboard/recepcionista/cadastroPaciente'}, 
    { text: 'Criar Atendimento', link: '/dashboard/recepcionista/criarAtendimento'}, 
    { text: 'Realizar Consulta', link: '/dashboard/medico'}, 
    { text: 'Triagem', link: '/dashboard/enfermeiro/'}
  ]
  
  async function logout() {
    fetch('/api/logout', {
      method: "POST"
    })

    router.push("login")
  }

  function toggleMenu() {
    setIsOpen(!isOpen)
  }

  return (
    <div id="header absolute">
      
      {/* Menu Lateral*/}
      <div>
        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-[rgba(0,0,0,0)] z-[9998]"
            onClick={toggleMenu}
          ></div>
        )}

        {/* Side menu em si*/}
        <div
          className={`fixed top-0 right-0 h-screen w-[250px] bg-white shadow-lg z-[9999] transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center p-4 border-b gap-5">
            <Image src="/systemLogo.svg" alt="" width={35} height={35} />
            <h2 className="text-2xl font-bold text-[rgb(34,87,122)]">MedLink</h2>
          </div>

          <ul className="flex flex-col p-4 gap-4 font-semibold">
            <div className='flex flex-col gap-4'>
              {navButtons.map((e, i) => (
                <Link href={e.link}>
                  <li
                    key={i}
                    className="cursor-pointer text-lg text-[rgb(56,163,165)] hover:text-[rgb(128,237,153)] transition-colors"
                    onClick={toggleMenu}
                  >
                    {e.text}
                  </li>
                </Link>
              ))}
            </div>
            <li className="cursor-pointer text-2xl text-[rgb(56,163,165)] hover:text-[rgb(128,237,153)] transition-colors" onClick={logout}>SAIR</li>
          </ul>
        </div>
      </div>
      
      <header className="flex justify-between px-5 py-3 bg-[rgb(56,163,165)] shadow-xl">
        <Image
          src="/systemLogo.svg"
          alt=""
          width={50}
          height={50}
          className="text-white select-none "
        />

        <div className="flex gap-2 items-center relative">
          <Link href={'/filaExibicao'}>
            <div className="h-[55px] w-[55px] -translate-y-1 cursor-pointer hover:bg-[rgba(0,0,0,0.2)] transition ease-in-out duration-300 rounded-full flex items-center justify-center">
              <Image src="/home.svg" alt="" width={35} height={35} className="text-white" />
            </div>
          </Link>
          <div className="h-[55px] w-[55px] -translate-y-1 cursor-pointer hover:bg-[rgba(0,0,0,0.2)] transition ease-in-out duration-300 rounded-full flex items-center justify-center p-2" onClick={toggleMenu}>
            <Image src={'/menu_24_white.svg'} alt="" width={45} height={45} />
          </div>
        </div>
      </header>
    </div>
  )
}
