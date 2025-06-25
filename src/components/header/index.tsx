'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function Header() {

  const router = useRouter()
  
    async function logout() {
      fetch('/api/logout', {
        method: "POST"
      })
  
      router.push("login")
    }

  return (
    <div id="header absolute">
      <header className="flex justify-between px-5 py-3 bg-[rgb(56,163,165)] shadow-xl">
        <Image
          src="/systemLogo.svg"
          alt=""
          width={50}
          height={50}
          className="text-white select-none "
        />

        <div className="flex gap-2 items-center relative">
          <Link href={'/'}>
            <div className="h-[55px] w-[55px] -translate-y-1 cursor-pointer hover:bg-[rgba(0,0,0,0.2)] transition ease-in-out duration-300 rounded-full flex items-center justify-center">
              <Image src="/home.svg" alt="" width={35} height={35} className="text-white" />
            </div>
          </Link>
          <div className="h-[55px] w-[55px] -translate-y-1 cursor-pointer hover:bg-[rgba(0,0,0,0.2)] transition ease-in-out duration-300 rounded-full flex items-center justify-center p-2" onClick={logout}>
            <Image src={'/menu_24_white.svg'} alt="" width={45} height={45} />
          </div>
        </div>
      </header>
    </div>
  )
}
