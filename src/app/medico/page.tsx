import Image from 'next/image'

export default function Medico() {

  return (
    <div className='flex justify-center gap-10'>
        <div className=''>

          <h1 className='text-center'>Fila de Prioridade</h1>
          
          <div className='bg-[rgb(56,163,165)] p-5 flex justify-center items-center flex-col w-2xl gap-5'>
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
              <button className="bg-[rgb(128,237,153)] p-1.5 rounded font-bold cursor-pointer">
                Chamar paciente
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}