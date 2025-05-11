import { BloodType } from '@/types/bloodType'
import { Gender } from '@/types/gender'

import { Person } from './Person'

export class Patient extends Person {
  constructor(
    id: number,
    cpf: string,
    name: string,
    birthDate: Date,
    gender: Gender,
    adress: string,
    private sus: number,
    private allergies: string[],
    private blood_type: BloodType,
    phoneNumber?: number[],
  ) {
    super(id, cpf, name, birthDate, gender, adress, phoneNumber)
  }

  toString(): string {
    return `Id: ${this.id}, Name: ${this.name}, Data de Nascimento: ${this.birthDate.toLocaleDateString()}`
  }
}
