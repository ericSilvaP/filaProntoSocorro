'use client'

import { Modal } from '@/components/modal'
import { Person } from '@/components/person'
import Image from 'next/image'
import { useState } from 'react'

export default function Medico() {

  const [showModalPatientOff, setShowModalPatientOff] = useState(false)

  const toggleModal = () => {
    setShowModalPatientOff(!showModalPatientOff)
  }

  return (
    <div className='flex justify-center gap-3 lg:gap-50 mt-[3rem]'>
      <div className='flex flex-col gap-10'>

        <div className=''>
          <h1 className='text-center font-bold text-2xl'>Fila de Prioridade</h1>

          <div className='bg-[rgb(56,163,165)] p-5 flex justify-center items-center flex-col w-2xl gap-5 shadow-2xl rounded-2xl'>
            <div className='flex w-full flex-col items-center'>
              <h2 className='font-bold text-white'>Próximo</h2>
              <div className="bg-white w-[75%] flex p-6">

                <div className='flex-3 flex justify-center items-center'>
                  <div className='rounded-full size-[6rem] bg-[rgb(128,237,153)] flex justify-center items-center'>
                    <Image src={"/person_40_anil.svg"} alt='' height={60} width={60}/>
                  </div>
                </div>

                <div className='flex-7 flex flex-col gap-1.5'>
                  <div>
                    <strong>Nome</strong>: Pessoa 1
                  </div>
                  <div className=''>
                    <strong>Idade</strong>: 24 anos
                  </div>
                  <div className='flex items-center gap-2'>
                    <strong>Classificação:</strong> 
                    <span className='bg-green-400 p-2 w-full text-center'>Verde</span>
                  </div>
                </div>

              </div>
            </div>
            <div>
              <button className="bg-[rgb(128,237,153)] rounded font-bold cursor-pointer min-w-[9rem] py-1.5 px-5">
                Chamar paciente
              </button>
            </div>
          </div>
        </div>

        <div className=''>

          <h1 className='text-center font-bold text-2xl'>Paciente Chamado</h1>

          <div className='bg-[rgb(56,163,165)] p-5 flex justify-center items-center flex-col w-2xl gap-5 shadow-2xl rounded-2xl'>
            <div className='flex w-full flex-col items-center'>
              <h2 className='font-bold text-white'>Aguardando</h2>
              <div className="bg-white w-[75%] flex p-6">

                <div className='flex-3 flex justify-center items-center'>
                  <div className='rounded-full size-[6rem] bg-[rgb(128,237,153)] flex justify-center items-center'>
                    <Image src={"/person_40_anil.svg"} alt='' height={60} width={60}/>
                  </div>
                </div>

                <div className='flex-7 flex flex-col gap-1.5'>
                  <div>
                    <strong>Nome</strong>: Pessoa 2
                  </div>
                  <div className=''>
                    <strong>Idade</strong>: 24 anos
                  </div>
                  <div className='flex items-center gap-2'>
                    <strong>Classificação:</strong> 
                    <span className='bg-green-400 p-2 w-full text-center'>Verde</span>
                  </div>
                </div>

              </div>
            </div>
            <div className='flex justify-evenly w-full'>
              <div>
                <button 
                className="bg-[rgb(128,237,153)] rounded font-bold cursor-pointer min-w-[9rem] py-1.5 px-5"
                onClick={toggleModal}
                >
                  Dispensar
                </button>
              </div>
              
              <div>
                <button className="bg-[rgb(128,237,153)] py-1.5 px-5 rounded font-bold cursor-pointer min-w-[9rem]">
                  Atender paciente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className='text-center font-bold text-2xl'>Atendidos Recentemente</h1>
        <div className="flex flex-col p-8 justify-center items-center bg-[rgb(128,237,153)] gap-8 md:w-auto shadow-2xl">
            {[1,2,3,4,5].map(n => (
                <div key={n} className="flex justify-center w-full gap-3 items-center">
                    <Person name={`Pessoa ${n}`}/>
                </div>
            ))}
        </div>
      </div>

      {
        showModalPatientOff && 

        <div className={`${showModalPatientOff ? "flex" : "hidden"} h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)] absolute justify-center items-center left-0 top-0`} onClick={toggleModal}>
            <div 
              className="bg-white h-[230px] w-[450px] relative flex justify-center items-center rounded flex-wrap"
              onClick={(e) => e.stopPropagation()}
            >
              <p className='text-[1.2rem] font-medium'>Dispensar Paciente 2?</p>
              <div className='flex w-full justify-evenly'>
                <button className="bg-[rgb(128,237,153)] py-1.5 px-5 rounded font-bold cursor-pointer min-w-[9rem]" onClick={toggleModal}>Não</button>
                <button className="bg-[rgb(128,237,153)] py-1.5 px-5 rounded font-bold cursor-pointer min-w-[9rem]" onClick={toggleModal}>Sim</button>
              </div>
            </div>
        </div>
      }
    </div>
  )
}