'use client'

import { useState } from 'react'

export function Modal({ message, toggleModal }: { message: string; toggleModal: () => void }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div
      className={`${isOpen ? 'flex' : 'hidden'} h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)] absolute justify-center items-center left-0 top-0`}
      onClick={toggleModal}
    >
      <div className="bg-white h-[230px] w-[450px] relative flex justify-center items-center rounded">
        <button
          className="text-red-600 text-3xl cursor-pointer hover:text-4xl absolute right-[10px] transition-all duration-150 ease-in-out self-start"
          onClick={toggleModal}
        >
          &times;
        </button>
        <h1>Olha que legal!</h1>
      </div>
    </div>
  )
}
