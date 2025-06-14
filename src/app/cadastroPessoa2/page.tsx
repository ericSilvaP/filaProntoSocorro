import { BloodType } from "@/types/bloodType"
import Link from "next/link"

export default function CadastroPessoa() {

  const bloodTypes = Object.values(BloodType)

  return (
    <div className="flex items-center py-[5rem] flex-col">
      <div className="flex flex-col px-10 gap-10">
        <main className="bg-[#1f5c77] p-6 rounded-lg text-white flex gap-5 flex-wrap max-w-[72rem] text-xl font-bold">

          <div className="w-full">
            <h1 className="text-center w-full font-extrabold text-2xl">INFORMAÇÕES BÁSICAS DE SAÚDE</h1>
          </div>
          <div className="flex justify-end w-full gap-10">
            <div className="">Alergias:</div>
            <div className="w-[750px] h-[150px]">
              <textarea 
              className="bg-white text-black h-full w-full resize-none font-extralight"
              />
            </div>
          </div>
          <div className="flex justify-end w-full gap-10">
            <div className="">Doenças:</div>
            <div className="w-[750px] h-[150px]">
              <textarea 
              className="bg-white text-black h-full w-full resize-none font-extralight"
              />
            </div>
          </div>
          <div className="flex justify-end w-full gap-10">
            <div className="">Uso de medicamentos: </div>
            <div className="w-[750px] h-[150px]">
              <textarea 
              className="bg-white text-black h-full w-full resize-none font-extralight"
              />
            </div>
          </div>
          <div className="flex justify-end w-full gap-10">
            <div>Tipo de sangue:</div>
            <div className="w-2xl flex gap-8">
              {
                bloodTypes.map(bt => (
                  <label className="flex gap-2">
                    <input type="radio" name="blood-type" value={bt} key={bt} className="scale-150" />
                    <div>
                      {bt}
                    </div>
                  </label>
                ))
              }
            </div>
          </div>
        </main>
        <div className="flex justify-between">
          <Link href={"/cadastroPessoa"}>
            <button className="bg-[rgb(56,163,165)] p-2 text-white text-2xl font-bold rounded">Voltar</button>
          </Link>
          <Link href={"/"}>
          
            <button className="bg-[rgb(56,163,165)] p-2 text-white text-2xl font-bold rounded">Cadastrar Paciente</button>
          </Link>
        </div>
      </div>
    </div>
  )
}