'use client'

import { useState } from "react"

export default function CadastroPessoa() {

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "") // remove tudo que não for número

    if (input.length > 8) input = input.slice(0, 8) // limita a 8 dígitos (DDMMYYYY)

    // adiciona barras automaticamente
    if (input.length > 4) {
      input = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4)}`
    } else if (input.length > 2) {
      input = `${input.slice(0, 2)}/${input.slice(2)}`
    }

    setFormData((prev) => ({ ...prev, birthDate: input }))
  }

  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    civilStatus: "0",
    sus: "",
    cpf: "",
    rg: "",
    mother: "",
    father: "",
    sex: "0",
    address: "",
    cep: "",
    phone: "",
  })

  const [errors, setErrors] = useState({
    name: false,
    birthDate: false,
    civilStatus: false,
    sus: false,
    cpf: false,
    rg: false,
    mother: false,
    father: false,
    sex: false,
    address: false,
    cep: false,
    phone: false,
  })

  function handleSubmit() {
    let formIsValid = true

    Object.entries(formData).forEach(([key, value]) => {
    if (!value.trim() || value === "0") {
      setErrors((prev) => ({ ...prev, [key]: true}))
      formIsValid = false
    } else {
      setErrors((prev) => ({...prev, [key]: false}))
    }
  })
    
    const date = formData.birthDate
    if ()

    if (!formIsValid) return

    alert(JSON.stringify(formData))
  }


  return (
    <div className="flex items-center mt-[5rem] flex-col">
      
      <div className="flex flex-col px-10">
        <main className="bg-[#1f5c77] p-6 rounded-lg text-white flex gap-5 flex-wrap max-w-[65rem]">

          <h2 className="text-center w-full font-extrabold text-2xl">IDENTIFICAÇÃO DO PACIENTE</h2>

          <div className="w-full">

            <div className="flex gap-2 items-center">
              <label>Nome: </label>
              <input 
                type="text" 
                value={formData.name}
                className={`custom-input ${errors.name ? 'error' : ''} w-full`}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
          </div>

          <div className="w-full">

            <div className="flex gap-2 items-center">
              <label>Nome da mãe: </label>
              <input 
                type="text" 
                value={formData.mother}
                className={`custom-input ${errors.mother ? 'error' : ''} w-full`}
                onChange={(e) => setFormData((prev) => ({ ...prev, mother: e.target.value }))}
              />
            </div>
          </div>

          <div className="w-full">

            <div className="flex gap-2 items-center">
              <label>Nome do pai: </label>
              <input 
                type="text" 
                value={formData.father}
                className={`custom-input ${errors.father ? 'error' : ''} w-full`}
                onChange={(e) => setFormData((prev) => ({ ...prev, father: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex justify-between w-full gap-7">

            <div className="flex gap-2 items-center">
              <label>Data de nascimento: </label>
              <input 
                type="text" 
                value={formData.birthDate}
                className={`custom-input ${errors.birthDate ? 'error' : ''} w-[7.5rem]`}
                onChange={handleChangeDate}
              />
            </div>

            <div className="flex gap-2 items-center">
              <label>Estado civil: </label>
              <select 
                value={formData.civilStatus}
                className={`custom-input ${errors.civilStatus ? 'error' : ''}`}
                onChange={(e) => setFormData((prev) => ({ ...prev, civilStatus: e.target.value }))}
              >
                <option value="0">Selecione uma opção</option>
                <option value="c">Casado</option>
                <option value="s">Solteiro</option>
              </select>
            </div>
            
            <div className="flex gap-2 items-center">
              <label>Sexo: </label>
              <select
                value={formData.sex}
                className={`custom-input ${errors.sex ? 'error' : ''}`}
                onChange={(e) => setFormData((prev) => ({ ...prev, sex: e.target.value }))}
              >
                <option value="0">Selecione uma opção</option>
                <option value="m">Masculino</option>
                <option value="f">Feminino</option>
                <option value="i">Indefinido</option>
              </select>
            </div>

          </div>

          <div className="flex justify-between w-full gap-7">
            <div className="flex gap-2 items-center w-full">
              <label>CPF: </label>
              <input
                type="text" 
                value={formData.cpf}
                className={`custom-input ${errors.cpf ? 'error' : ''} w-full`}
                onChange={(e) => setFormData((prev) => ({ ...prev, cpf: e.target.value }))}
              />
            </div>

            <div className="flex gap-2 items-center w-full">
              <label>RG: </label>
              <input
                type="text" 
                value={formData.rg}
                className={`custom-input ${errors.rg ? 'error' : ''} w-full`}
                onChange={(e) => setFormData((prev) => ({ ...prev, rg: e.target.value }))}
              />
            </div>

            <div className="flex gap-2 items-center w-full">
              <label>SUS: </label>
              <input
                type="text" 
                value={formData.sus}
                className={`custom-input ${errors.sus ? 'error' : ''} w-full`}
                onChange={(e) => setFormData((prev) => ({ ...prev, sus: e.target.value }))}
              />
            </div>
          </div>

          <div className="w-full">

            <div className="flex gap-2 items-center">
              <label>Endereço: </label>
              <input 
                type="text" 
                value={formData.address}
                className={`custom-input ${errors.address ? 'error' : ''} w-full`}
                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex justify-between w-full gap-7">

            <div className="flex gap-2 items-center">
              <label>Telefone: </label>
              <input 
                type="text" 
                value={formData.phone}
                className={`custom-input ${errors.phone ? 'error' : ''}`}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>

            <div className="flex gap-2 items-center">
              <label>CEP: </label>
              <input 
                type="text" 
                value={formData.phone}
                className={`custom-input ${errors.cep ? 'error' : ''}`}
                onChange={(e) => setFormData((prev) => ({ ...prev, cep: e.target.value }))}
              />
            </div>

          </div>

        </main>

        <div className="flex justify-end w-full mt-5">
          <button 
          className="bg-[rgb(56,163,165)] p-2 text-white text-2xl font-bold rounded" 
          onClick={handleSubmit}>
            Próximo
          </button>
        </div>
      </div>
    </div>
  )
}
