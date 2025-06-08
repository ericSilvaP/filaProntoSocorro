'use client'

import { Field } from "@/components/field";
import { SearchBar } from "@/components/searchBar";
import { useState } from "react";

export default function Tela2() {
  const [selectedOption, setSelectedOption] = useState("")

  return (
    <div className="">
      <div className="mt-[3rem] ml-[3rem] w-[17rem]">
        <SearchBar />
      </div>
      <div className="flex justify-center mt-[5rem]">
        <main className="flex flex-col h-[500px] bg-[rgb(56,163,165)] rounded p-5">
          <h1 className="absolute self-center text-white font-extrabold tracking-wide">INFORMAÇÕES PESSOAIS</h1>
          <div className="flex gap-5">

            <div className="flex justify-center items-center rounded-full bg-white w-[80px] h-[80px]">
              <span className="material-symbols-outlined text-4xl" 
              style={{fontVariationSettings: "'FILL' 0, 'wght' 100, 'GRAD' 0, 'opsz' 96"}}>
                person
              </span>
            </div>

            <div className="mt-10 flex gap-4">
              <div className="flex flex-col gap-4 items-end">
                <Field fieldName="Nome" fieldInfo="Eric" fieldInfoSize={160}/>
                <Field fieldName="SUS" fieldInfo="0123456789" fieldInfoSize={160}/>
                <Field fieldName="Nome da Mãe" fieldInfo="Vandrea Silva Patricio" fieldInfoSize={160}/>
              </div>

              <div className="flex flex-col gap-4">
                <Field fieldName="Data de Nascimento" fieldInfo="12/10/2005"/>
                <Field fieldName="CPF" fieldInfo="492.719.478-78"/>
                <Field fieldName="Nome do Pai" fieldInfo="Espedito Gomes Patricio Filho"/>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex text-white gap-2 items-center">
                  Sexo:
                  <select name="" id="" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} className="flex items-center gap-2 p-1.5 rounded bg-white text-black">
                    <option value="f" className="text-black">FEM</option>
                    <option value="m" className="text-black">MASC</option>
                  </select>
                </div>
                <Field fieldName="RG" fieldInfo="492.719.478-78"/>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}