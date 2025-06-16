'use client'

import { replaceOnlyNumbers } from "@/app/cadastroPessoa/page"
import { useForm } from "react-hook-form"

export default function SinaisVitais() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    function onSubmit(data: unknown) {
        alert(JSON.stringify(data))
    }

    function replaceNumbersNPoint(data: string) {
        return data.replace(/[^\d\.]/, "")
    }
    
    return (
        <div className="mt-[3rem] flex justify-center">
            <div className="flex flex-col gap-10">
                <main className="bg-[#1f5c77] py-6 px-[5rem] rounded-lg text-white flex flex-col gap-7 flex-wrap max-w-[72rem] text-xl font-bold">
                    <h1 className="text-center w-full font-extrabold text-2xl tracking-wider">Sinais Vitais</h1>
                    <div className="flex items-center">
                        <div className="text-white flex-5">
                            Frequência Cardíaca (bpm):
                        </div>
                        <input type="text" className={`custom-input flex-5 ${errors.heart_rate && 'outline-2 outline-[rgb(240,101,58)]'}`} 
                        
                        {...register("heart_rate", {
                            required: true,
                            onChange: (e) => replaceNumbersNPoint(e.currentTarget.value)
                        })} 
                        />
                    </div>
                    <div className="flex items-center">
                        <div className="text-white flex-5">
                            Frequência Respiratória (bpm):
                        </div>
                        <input type="text" className={`custom-input flex-5 ${errors.respiratory_rate && 'outline-2 outline-[rgb(240,101,58)]'}`} 
                        {...register("respiratory_rate", {required: true})}
                        />
                    </div>
                    <div className="flex items-center">
                        <div className="text-white flex-5">
                            Pressão Arterial (mmHg):
                        </div>
                        <input type="text" 
                        className={`custom-input flex-5 ${errors.blood_pressure && 'outline-2 outline-[rgb(240,101,58)]'}`} 
                        {...register("blood_pressure", {required: true})}
                        />
                    </div>
                    <div className="flex items-center">
                        <div className="text-white flex-5">
                            Temperatura Corporal (°C):
                        </div>
                        <input 
                        type="text" 
                        className={`custom-input flex-5 ${errors.temperature && 'outline-2 outline-[rgb(240,101,58)]'}`} 
                        {...register("temperature", {required: true})}
                        />
                    </div>
                    <div className="flex items-center">
                        <div className="text-white flex-5"> 
                            Saturação O² (%):
                        </div>
                        <input 
                        type="text" 
                        className={`custom-input flex-5 ${errors.oxygen_saturation && 'outline-2 outline-[rgb(240,101,58)]'}`} 
                        {...register("oxygen_saturation", {required: true})}
                        />
                    </div>
                </main>
                <div className="flex justify-evenly">
                    <div>
                        <button className="bg-[rgb(56,163,165)] p-2 text-white text-2xl  font-bold rounded min-w-[9rem]" onClick={() => handleSubmit(onSubmit)()}>Voltar</button>
                    </div>
                    <div>
                        <button className="bg-[rgb(56,163,165)] p-2 text-white text-2xl font-bold rounded min-w-[9rem]" onClick={() => handleSubmit(onSubmit)()}>Próximo</button>
                    </div>
                </div>
            </div>

        </div>
    )
}