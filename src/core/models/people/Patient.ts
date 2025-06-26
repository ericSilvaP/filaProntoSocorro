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
    phoneNumber: number,
    private sus: number,
    private blood_type: BloodType,
  ) {
    super(id, cpf, name, birthDate, gender, phoneNumber)
  }

  // Getters
  getSus(): number {
    return this.sus
  }

  getBloodType(): BloodType {
    return this.blood_type
  }

  getId(): number {
    return this.id
  }

  setName(newName: string): void {
    this.name = newName
  }

  toString(): string {
    return `Id: ${this.id}, Name: ${this.name}, Data de Nascimento: ${this.birthDate.toLocaleDateString()}`
  }
}
