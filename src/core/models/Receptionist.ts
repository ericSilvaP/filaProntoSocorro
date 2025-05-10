import { AccessLevel } from '@/types/accessLevel'

import { Users } from './Users'

export class Recepcionist extends Users {
  constructor(
    id: number,
    cpf: string,
    name: string,
    birthDate: Date,
    gender: string,
    adress: string,
    accesLevel: AccessLevel,
    username: string,
    password: string,
    phoneNumber?: number[],
  ) {
    super(id, cpf, name, birthDate, gender, adress, accesLevel, username, password, phoneNumber)
  }
}
