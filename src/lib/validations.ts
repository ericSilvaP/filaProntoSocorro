
export function replaceOnlyNumbers(s: string) {
  return s.replace(/\D/g, '')
}

export function isValidDate(datestring: string): boolean {
  const [day, month, year] = datestring.split('/').map(Number)
  if (day < 1 || month < 1 || month > 12) return false
  const lastDayMonth = new Date(year, month, 0).getDate()
  return day <= lastDayMonth
}

export function isValidCPF(cpf: string): boolean {
  const cleanCPF = cpf.replace(/\D/g, '')
  if (cleanCPF.length !== 11) return false
  const nine = cleanCPF.slice(0, 9).split('')
  let sum = nine.reduce((acc, n, i) => acc + Number(n) * (10 - i), 0)
  let r = sum % 11
  const d1 = r < 2 ? 0 : 11 - r
  sum = nine.reduce((acc, n, i) => acc + Number(n) * (11 - i), 0) + d1 * 2
  r = sum % 11
  const d2 = r < 2 ? 0 : 11 - r
  return cleanCPF.endsWith(`${d1}${d2}`)
}

export function strToSqlDate(date: string) {
  const [day, month, year] = date.split("/");
  const sqlDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  return sqlDate;
}
