import { useState } from "react";

export function InputCPF() {
  const [value, setValue] = useState("")
  const [isValid, setIsValid] = useState<boolean | null>(null)

  // Função para validar CPF
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const getMessage = () => {
    if (isValid === null) return "Digite seu CPF ou RG";
    return isValid ? "Documento válido" : "CPF inválido";
  };

  return (
    <div className="flex flex-col gap-2 text-white">
      <label>CPF ou RG:</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Apenas números"
        className="p-2 rounded text-black"
        maxLength={11}
      />
      <span className={`${isValid === false ? "text-red-400" : "text-green-400"}`}>
        {getMessage()}
      </span>
    </div>
  );
}
