import { replaceOnlyNumbers } from "./validations"

export const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>): string => {
  let input = e.target.value.replace(/\D/g, '') // remove tudo que não for número

  if (input.length > 8) input = input.slice(0, 8) // limita a 8 dígitos (DDMMYYYY)

  // adiciona barras
  if (input.length > 4) {
    input = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4)}`
  } else if (input.length > 2) {
    input = `${input.slice(0, 2)}/${input.slice(2)}`
  }

  return input
}

export const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
  let input = replaceOnlyNumbers(e.target.value).slice(0, 11)

  input = input.replace(/(\d{2})(\d)/, '($1) $2')
  input = input.replace(/(\d{5})(\d)/, '$1-$2')

  return input
}

export const handleChangeCPF = (e: React.ChangeEvent<HTMLInputElement>): string => {
  let input = replaceOnlyNumbers(e.target.value.slice(0, 14))

  input = input.replace(/(\d{3})(\d)/, '$1.$2')
  input = input.replace(/(\d{3})(\d)/, '$1.$2')
  input = input.replace(/(\d{3})(\d)/, '$1-$2')

  return input
}

export const handleChangeCOREN = (e: React.ChangeEvent<HTMLInputElement>): string => {
  let input = e.target.value.toUpperCase()

  input = input.replace(/[^A-Z0-9]/g, '')

  if (input.length < 3) input = input.replace(/[^A-Z]/, '')

  const match = input.match(/^([A-Z]{0,2})(\d{0,6})([A-Z]{0,2})/)

  if (!match) return input

  const [, uf, number, category] = match

  let formatted = uf
  if (number) formatted += `-${number}`
  if (category) formatted += ` ${category}`

  return formatted.trim()
}

export const handleChangeCRM = (e: React.ChangeEvent<HTMLInputElement>): string => {
  let input = e.target.value.toUpperCase()

  input = input.replace(/[^A-Z0-9]/g, '')

  if (input.length < 3) input = input.replace(/[^A-Z]/, '')

  const match = input.match(/^([A-Z]{0,2})(\d{0,6})/)

  if (!match) return input

  const [, uf, number] = match

  let formatted = uf
  if (number) formatted += `-${number}`

  return formatted.trim()
}