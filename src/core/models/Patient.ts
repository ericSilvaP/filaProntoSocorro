import { Person } from './Person'

export class Patient extends Person {
  constructor(
    id: number,
    // cpf: string,
    // name: string,
    // birthDate: Date,
    // gender: string,
    // adress: string,
    // private sus: number,
    // private allergies: string[],
    // private blood_type: string,
    // phoneNumber?: number[]
  ) {
    super(id)
    // super(id, cpf, name, birthDate, gender, adress, phoneNumber)
  }
}
