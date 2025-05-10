import { AccessLevel } from '@/types/accessLevel'
import { Gender } from '@/types/gender'

import { Users } from './Users'

export class Nurse extends Users {
  constructor(
    id: number,
    cpf: string,
    name: string,
    birthDate: Date,
    gender: Gender,
    adress: string,
    username: string,
    password: string,
    private coren: number,
    phoneNumber?: number[],
  ) {
    super(id, cpf, name, birthDate, gender, adress, AccessLevel.L2, username, password, phoneNumber)
  }

  toString(): string {
    return `Id: ${this.id}, Coren ${this.coren}, Name: ${this.name}, Data de Nascimento: ${this.birthDate.toLocaleDateString()}`
  }
}
