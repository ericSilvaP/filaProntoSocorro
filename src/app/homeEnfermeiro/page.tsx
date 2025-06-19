import { Person } from "@/components/person";
import Image from 'next/image'

export default function HomeEnfermeiro() {
    return (
        <div className='flex justify-center gap-3 lg:gap-50 mt-[3rem] font-[family-name:var(--font-gabarito)]'>
            <div className='flex flex-col gap-10 justify-center'>

                <div className=''>
                    <h1 className='text-center font-bold text-2xl'>Pacientes Para Avaliação</h1>

                    <div className='bg-[rgb(56,163,165)] p-5 flex justify-center items-center flex-col w-2xl gap-5 shadow-2xl rounded-2xl'>
                        <div className='flex w-full flex-col items-center'>
                            <h2 className='font-bold text-white'>Próximo</h2>
                            <div className="bg-white w-[75%] flex p-6">

                                <div className='flex-3 flex justify-center items-center'>
                                    <div className='rounded-full size-[6rem] bg-[rgb(128,237,153)] flex justify-center items-center'>
                                        <Image src={"/person_40_anil.svg"} alt='' height={60} width={60} />
                                    </div>
                                </div>

                                <div className='flex-7 flex flex-col gap-1.5'>
                                    <div>
                                        <strong>Nome</strong>: Pessoa 1
                                    </div>
                                    <div className=''>
                                        <strong>Idade</strong>: 24 anos
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

            </div>

            <div>
                <h1 className='text-center font-bold text-2xl'>Atendidos Recentemente</h1>
                <div className="flex flex-col p-8 justify-center items-center bg-[rgb(128,237,153)] gap-8 md:w-auto shadow-2xl">
                    {[1, 2, 3, 4, 5].map(n => (
                        <div key={n} className="flex justify-center w-full gap-3 items-center">
                            <Person name={`Pessoa ${n}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}