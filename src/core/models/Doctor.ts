import { AccessLevel } from '@/types/accessLevel'
import { Gender } from '@/types/gender'

import { Users } from './Users'

export class Doctor extends Users {
  constructor(
    id: number,
    cpf: string,
    name: string,
    birthDate: Date,
    gender: Gender,
    adress: string,
    accessLevel: AccessLevel,
    username: string,
    password: string,
    private crm: number,
    private specialty: string,
    phoneNumber?: number[],
  ) {
    super(id, cpf, name, birthDate, gender, adress, accessLevel, username, password, phoneNumber)
  }

  toString(): string {
    return `Id: ${this.id}, CRM ${this.crm}, Specialty: ${this.specialty},Name: ${this.name}, Data de Nascimento: ${this.birthDate.toLocaleDateString()}`
  }
}
