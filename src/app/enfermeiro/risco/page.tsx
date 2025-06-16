'use client'

import { SuccesModal } from "@/components/sucessModal"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function Risco() {

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const [showModal, setShowModal] = useState(false)

    function onSubmit() {
        setShowModal(true)
        setTimeout(() => router.push("/"), 2000)
    } 

    return (
        <div className="mt-[3rem] flex justify-center">
            <div className="flex flex-col gap-10">
                <main className="bg-[#1f5c77] py-6 px-[5rem] rounded-lg text-white flex flex-col gap-7 flex-wrap max-w-[72rem] text-xl font-bold">
                    <h1 className="text-center w-full font-extrabold text-2xl tracking-wider">Classificação de Risco</h1>
                    { errors.risk_level && <div className="text-red-500 text-center font-normal">Selecione um risco</div> }
                    <div className="flex flex-col gap-4">
                        <label className="cursor-pointer flex">
                            <input
                                type="radio"
                                value={0}
                                className="peer hidden"
                                {...register("risk_level", { required: true })}
                            />
                            <span className="bg-[#ef233c] rounded py-3 px-6 hover:opacity-90 transition duration-150 peer-checked:outline flex-1 text-center">
                                Emergência
                            </span>
                        </label>

                        <label className="cursor-pointer flex">
                            <input
                                type="radio"
                                value={1}
                                className="peer hidden"
                                {...register("risk_level", { required: true })}
                            />
                            <span className="bg-[#e85d04] rounded py-3 px-6 hover:opacity-90 transition duration-150 peer-checked:outline flex-1 text-center">
                                Muito Urgente
                            </span>
                        </label>

                        <label className="cursor-pointer flex">
                            <input
                                type="radio"
                                value={2}
                                className="peer hidden"
                                {...register("risk_level", { required: true })}
                            />
                            <span className="bg-[#ffba08] rounded py-3 px-6 hover:opacity-90 transition duration-150 peer-checked:outline flex-1 text-center">
                                Urgente
                            </span>
                        </label>

                        <label className="cursor-pointer flex">
                            <input
                                type="radio"
                                value={3}
                                className="peer hidden"
                                {...register("risk_level", { required: true })}
                            />
                            <span className="bg-[#7cb518] rounded py-3 px-6 hover:opacity-90 transition duration-150 peer-checked:outline flex-1 text-center">
                                Pouco Urgente
                            </span>
                        </label>

                        <label className="cursor-pointer flex">
                            <input
                                type="radio"
                                value={4}
                                className="peer hidden"
                                {...register("risk_level", { required: true })}
                            />
                            <span className="bg-[#5c95ff] rounded py-3 px-6 hover:opacity-90 transition duration-150 peer-checked:outline flex-1 text-center">
                                Não Urgente
                            </span>
                        </label>
                    </div>
                </main>
                <div className="flex justify-evenly">
                    <div>
                        <button className="bg-[rgb(56,163,165)] p-2 text-white text-2xl  font-bold rounded min-w-[9rem] cursor-pointer shadow-2xl hover:opacity-[90%] transition duration-150" onClick={() => handleSubmit(onSubmit)()}>Voltar</button>
                    </div>
                    <div>
                        <button className="bg-[rgb(56,163,165)] p-2 text-white text-2xl font-bold rounded min-w-[9rem] cursor-pointer shadow-2xl hover:opacity-[90%] transition duration-150" onClick={() => handleSubmit(onSubmit)()}>Finalizar</button>
                    </div>
                </div>
            </div>
            {
                showModal && <SuccesModal message="Triagem Concluída!" />
            }
        </div>
    )
}