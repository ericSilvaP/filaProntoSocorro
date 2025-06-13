import Image from 'next/image'

export default function Medico() {

  return (
    <div className='flex justify-center'>
        <div>
          <div>
            <h1 className='text-center'>
              Fila de Prioridade
            </h1>
          </div>
          <div>
            <h2>Próximo</h2>
            <div>
              <div>
                <Image src={"/person_40_anil.svg"} alt='' height={30} width={30}/>
              </div>
              <div>
                <div>Nome: </div>
                <div>Idade: </div>
                <div>Classificação: </div>
              </div>
            </div>
            <div>
              <button>Chamar paciente</button>
            </div>
          </div>
        </div>
    </div>
  )
}