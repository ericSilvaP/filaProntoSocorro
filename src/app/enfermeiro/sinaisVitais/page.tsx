'use client'

import { Controller, useForm } from "react-hook-form"

export default function SinaisVitais() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm()

    enum pain_level {
        LIGHT = "Leve",
        MEDIUM = "Moderada",
        INTENSE = "Intensa",
        EXTREME = "Incapacitante"
    }

    const pain_levels = Object.values(pain_level)

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
                        <Controller
                            name="heart_rate"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (

                                <input
                                    {...field}
                                    onChange={(e) => {
                                        const formatted = replaceNumbersNPoint(e.target.value)
                                        field.onChange(formatted)
                                    }}
                                    value={field.value}
                                    type="text" className={`custom-input flex-5 ${errors.heart_rate && 'outline-2 outline-[rgb(240,101,58)]'}`}
                                />
                            )} />
                    </div>
                    <div className="flex items-center">
                        <div className="text-white flex-5">
                            Frequência Respiratória (bpm):
                        </div>
                        <Controller
                            name="respiratory_rate"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    onChange={(e) => {
                                        const formatted = replaceNumbersNPoint(e.target.value)
                                        field.onChange(formatted)
                                    }}
                                    value={field.value}
                                    type="text" className={`custom-input flex-5 ${errors.respiratory_rate && 'outline-2 outline-[rgb(240,101,58)]'}`}
                                />
                            )} />
                    </div>
                    <div className="flex items-center">
                        <div className="text-white flex-5">
                            Pressão Arterial (mmHg):
                        </div>
                        <Controller
                            name="blood_pressure"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    onChange={(e) => {
                                        const formatted = replaceNumbersNPoint(e.target.value)
                                        field.onChange(formatted)
                                    }}
                                    value={field.value}
                                    type="text" className={`custom-input flex-5 ${errors.blood_pressure && 'outline-2 outline-[rgb(240,101,58)]'}`}
                                />
                            )} />
                    </div>
                    <div className="flex items-center">
                        <div className="text-white flex-5">
                            Temperatura Corporal (°C):
                        </div>
                        <Controller
                            name="temperature"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    onChange={(e) => {
                                        const formatted = replaceNumbersNPoint(e.target.value)
                                        field.onChange(formatted)
                                    }}
                                    value={field.value}
                                    type="text" className={`custom-input flex-5 ${errors.temperature && 'outline-2 outline-[rgb(240,101,58)]'}`}
                                />
                            )} />
                    </div>
                    <div className="flex items-center">
                        <div className="text-white flex-5">
                            Saturação O² (%):
                        </div>
                        <Controller
                            name="oxygen_saturation"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (

                                <input
                                    {...field}
                                    onChange={(e) => {
                                        const formatted = replaceNumbersNPoint(e.target.value)
                                        field.onChange(formatted)
                                    }}
                                    value={field.value}
                                    type="text" className={`custom-input flex-5 ${errors.oxygen_saturation && 'outline-2 outline-[rgb(240,101,58)]'}`}
                                />
                            )} />
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="text-white flex-5">
                            Nível de Dor:
                        </div>
                        <div className="flex justify-between gap-6 flex-5">
                            {
                                pain_levels.map((pl, i) => (
                                    <label className="flex gap-3" key={pl}>
                                        <input 
                                        type="radio" 
                                        value={i} 
                                        className="scale-200"
                                        {...register("pain_level", { required: true })}
                                        />
                                        <div>{pl}</div>
                                    </label>
                                ))
                            }
                        </div>
                    </div>
                </main>
                <div className="flex justify-evenly">
                    <div>
                        <button className="bg-[rgb(56,163,165)] p-2 text-white text-2xl  font-bold rounded min-w-[9rem] cursor-pointer shadow-2xl hover:opacity-[90%] transition duration-150" onClick={() => handleSubmit(onSubmit)()}>Voltar</button>
                    </div>
                    <div>
                        <button className="bg-[rgb(56,163,165)] p-2 text-white text-2xl font-bold rounded min-w-[9rem] cursor-pointer shadow-2xl hover:opacity-[90%] transition duration-150" onClick={() => handleSubmit(onSubmit)()}>Próximo</button>
                    </div>
                </div>
            </div>

        </div>
    )
}