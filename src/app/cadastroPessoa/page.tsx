'use client'

import { useState } from "react"


export default function CadastroPessoa() {
  const [value, setValue] = useState("")
  const [isValid, setIsValid] = useState<boolean | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    civilStatus: "",
    sus: "",
    cpf: "",
    rg: "",
    mother: "",
    father: "",
    sex: "",
    address: "",
    cep: "",
    phone: "",
    contact: "",
  })

  const validateCPF = (cpf: string) => {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf[i]) * (10 - i);
    }
    let firstCheck = 11 - (sum % 11);
    if (firstCheck > 9) firstCheck = 0;
    if (firstCheck !== parseInt(cpf[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf[i]) * (11 - i);
    }
    let secondCheck = 11 - (sum % 11);
    if (secondCheck > 9) secondCheck = 0;

    return secondCheck === parseInt(cpf[10]);
  }

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleChangeCPF = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setValue(raw);

    if (raw.length === 11) {
      setIsValid(validateCPF(raw));
    } else if (raw.length >= 7 && raw.length <= 9) {
      setIsValid(true); // RG geralmente tem 7 a 9 dígitos, sem validação exata
    } else {
      setIsValid(null);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { [key: string]: string } = {}

    for (const key in formData) {
      if (!formData[key as keyof typeof formData]) {
        newErrors[key] = "Campo obrigatório"
      }
    }

    if (formData.cpf && !validateCPF(formData.cpf)) {
      newErrors.cpf = "CPF inválido"
    }

    if (formData.cep && !/^\d{5}-?\d{3}$/.test(formData.cep)) {
      newErrors.cep = "CEP inválido"
    }

    if (formData.phone && !/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/.test(formData.phone)) {
      newErrors.phone = "Telefone inválido"
    }

    if (formData.birthDate && !/^\d{2}\/\d{2}\/\d{4}$/.test(formData.birthDate)) {
      newErrors.birthDate = "Data inválida (DD/MM/AAAA)"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      alert("Formulário válido!")
      // aqui você pode enviar os dados para o backend
    }
  }

  return (
    <div className="flex justify-center mt-[5rem]">

      <main className="bg-[#1f5c77] p-6 rounded-lg text-white flex gap-5 flex-wrap">

        <form onSubmit={handleSubmit} className="flex gap-5 flex-col">
          <h2 className="text-xl font-bold w-full text-center">Identificação do paciente</h2>

          <div className="flex gap-5">

            <div className="flex items-center gap-2"> {/* nome */}
              Nome:
              <input name="name" value={formData.name} onChange={handleChange} className="flex-1 bg-white text-black font-medium p-1.5 rounded w-[7.5rem] truncate whitespace-nowrap overflow-hidden tracking-wide" />
            </div>

            <div className="flex items-center gap-2"> {/* data de nascimento */}
              Data de Nascimento
              <input name="birthDate" placeholder="DD/MM/AAAA" value={formData.birthDate} onChange={handleChange} className="flex-1 bg-white text-black font-medium p-1.5 rounded w-[7.5rem] truncate whitespace-nowrap overflow-hidden tracking-wide" />
            </div>
            
            <div className="flex items-center gap-2"> {/* estado civil */}
              Estado Civil
              <input name="civilStatus" placeholder="Estado civil" value={formData.civilStatus} onChange={handleChange} className="flex-1 bg-white text-black font-medium p-1.5 rounded w-[7.5rem] truncate whitespace-nowrap overflow-hidden tracking-wide" />
            </div>
          </div>

          <div className="flex gap-5">

            <div className="flex items-center gap-2"> {/* SUS */}
              SUS:
              <input name="sus" placeholder="SUS" value={formData.sus} onChange={handleChange} className="flex-1 bg-white text-black font-medium p-1.5 rounded w-[7.5rem] truncate whitespace-nowrap overflow-hidden tracking-wide" />
            </div>

            <div className="flex items-center gap-2"> {/* CPF */}
              CPF:
              <input name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChangeCPF} className="flex-1 bg-white text-black font-medium p-1.5 rounded w-[7.5rem] truncate whitespace-nowrap overflow-hidden tracking-wide" />
            </div>

            <div className="flex items-center gap-2"> {/* RG */}
              RG:
              <input name="rg" placeholder="RG" value={formData.rg} onChange={handleChange} className="flex-1 bg-white text-black font-medium p-1.5 rounded w-[7.5rem] truncate whitespace-nowrap overflow-hidden tracking-wide" />
            </div>

          </div>

          <div className="flex gap-2">

            <div className="flex items-center gap-2"> {/* nome da mãe*/}
              Nome da Mãe:
              <input name="mother" placeholder="Nome da mãe" value={formData.mother} onChange={handleChange} className="flex-1 bg-white text-black font-medium p-1.5 rounded w-[7.5rem] truncate whitespace-nowrap overflow-hidden tracking-wide" />
            </div>

            <div className="flex items-center gap-2"> {/* nome do pai */}
              Nome do Pai:
              <input name="father" placeholder="Nome do pai" value={formData.father} onChange={handleChange} className="flex-1 bg-white text-black font-medium p-1.5 rounded w-[7.5rem] truncate whitespace-nowrap overflow-hidden tracking-wide" />
            </div>

            <div className="flex items-center gap-2"> {/* sexo */}
              Sexo:
              <input name="sex" placeholder="Sexo" value={formData.sex} onChange={handleChange} className="flex-1 bg-white text-black font-medium p-1.5 rounded w-[7.5rem] truncate whitespace-nowrap overflow-hidden tracking-wide" />
            </div>

          </div>

          <div className="flex gap-2">

            <div className="flex items-center gap-2"> {/* Endereço */}
              Endereço: 
              <input name="address" placeholder="Endereço" value={formData.address} onChange={handleChange} className="flex-1 bg-white text-black font-medium p-1.5 rounded w-[7.5rem] truncate whitespace-nowrap overflow-hidden tracking-wide" />
            </div>

            <div className="flex items-center gap-2"> {/* cep */}
              CEP: 
              <input name="cep" placeholder="CEP" value={formData.cep} onChange={handleChange} className="flex-1 bg-white text-black font-medium p-1.5 rounded w-[7.5rem] truncate whitespace-nowrap overflow-hidden tracking-wide" />
            </div>

            <div className="flex items-center gap-2"> {/* telefone */}
              Telefone:
              <input name="phone" placeholder="Telefone" value={formData.phone} onChange={handleChange} className="flex-1 bg-white text-black font-medium p-1.5 rounded w-[7.5rem] truncate whitespace-nowrap overflow-hidden tracking-wide" />
            </div>

          </div>

          <input name="contact" placeholder="Contato" value={formData.contact} onChange={handleChange} className="text-black p-1 rounded" />

          {/* Erros */}
          <div className="text-red-300 text-sm">
            {Object.entries(errors).map(([key, msg]) => (
              <div key={key}>{key.toUpperCase()}: {msg}</div>
            ))}
          </div>

          <button type="submit" className="self-end mt-4 bg-teal-500 text-white font-bold px-4 py-2 rounded hover:bg-teal-600">
            Próximo →
          </button>
        </form>
      </main>
    </div>
  )
}
