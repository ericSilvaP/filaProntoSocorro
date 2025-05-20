import { Gender } from '@/types/gender'
import { Roles } from '@/types/roles'

import { Person } from './Person'

export abstract class Users extends Person {
  constructor(
    id: number,
    cpf: string,
    name: string,
    birthDate: Date,
    gender: Gender,
    adress: string,
    protected role: Roles,
    protected username: string,
    protected password: string,
    phoneNumber?: number[],
  ) {
    super(id, cpf, name, birthDate, gender, adress, phoneNumber)
  }

  login(): void {}
}
