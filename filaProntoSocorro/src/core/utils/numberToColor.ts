export function numberToColor(n: number): string {
  let result: string = ``
  if (n == 0) {
    result = 'Vermelho 🔴'
  } else if (n == 1) {
    result = 'Laranja 🟠'
  } else if (n == 2) {
    result = 'Amarelo 🟡'
  } else if (n == 3) {
    result = 'Verde 🟢'
  } else if (n == 4) {
    result = 'Azul 🔵'
  } else {
    result = 'Inválido'
  }
  return result
}
