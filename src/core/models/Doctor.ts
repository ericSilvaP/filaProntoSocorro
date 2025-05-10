import { AccessLevel } from '@/types/accessLevel'

import { Users } from './Users'

export class Doctor extends Users {
  constructor(
    id: number,
    cpf: string,
    name: string,
    birthDate: Date,
    gender: string,
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
}
