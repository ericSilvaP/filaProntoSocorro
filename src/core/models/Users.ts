import { AccessLevel } from '@/types/accessLevel'

import { Person } from './Person'

export abstract class Users extends Person {
  constructor(
    id: number,
    cpf: string,
    name: string,
    birthDate: Date,
    gender: string,
    adress: string,
    accessLevel: AccessLevel,
    protected username: string,
    protected password: string,
    phoneNumber?: number[],
  ) {
    super(id)
    // super(id, cpf, name, birthDate, gender, adress, phoneNumber)
  }
}
