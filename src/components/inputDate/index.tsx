import { useState } from "react";

export function InputDate( { valueP }: { valueP: string }) {

  const [value, setValue] = useState(valueP)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "") // remove tudo que não for número

    if (input.length > 8) input = input.slice(0, 8) // limita a 8 dígitos (DDMMYYYY)

    // adiciona barras automaticamente
    if (input.length > 4) {
      input = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4)}`
    } else if (input.length > 2) {
      input = `${input.slice(0, 2)}/${input.slice(2)}`
    }

    setValue(input)
  }

  return (
    <div className="flex gap-2 items-center">
      <label className="text-white">Data de Nascimento:</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="DD/MM/AAAA"
        className="bg-white text-black font-medium p-1.5 rounded w-[7.5rem] truncate whitespace-nowrap overflow-hidden tracking-wide"
        maxLength={10}
      />
    </div>
  );
}
