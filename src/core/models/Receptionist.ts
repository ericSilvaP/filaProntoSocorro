import { AccessLevel } from '@/types/accessLevel'
import { Gender } from '@/types/gender'

import { Users } from './Users'

export class Recepcionist extends Users {
  constructor(
    id: number,
    cpf: string,
    name: string,
    birthDate: Date,
    gender: Gender,
    adress: string,
    accesLevel: AccessLevel,
    username: string,
    password: string,
    phoneNumber?: number[],
  ) {
    super(id, cpf, name, birthDate, gender, adress, accesLevel, username, password, phoneNumber)
  }

  toString(): string {
    return `Id: ${this.id}, Name: ${this.name}, Data de Nascimento: ${this.birthDate.toLocaleDateString()}`
  }
}
