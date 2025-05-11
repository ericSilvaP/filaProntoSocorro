import { AccessLevel } from '@/types/accessLevel'
import { Gender } from '@/types/gender'

import { Patient } from './Patient'
import { Person } from './Person'

export abstract class Users extends Person {
  constructor(
    id: number,
    cpf: string,
    name: string,
    birthDate: Date,
    gender: Gender,
    adress: string,
    protected accessLevel: AccessLevel,
    protected username: string,
    protected password: string,
    phoneNumber?: number[],
  ) {
    super(id, cpf, name, birthDate, gender, adress, phoneNumber)
  }

  registerPatient(
    id: number,
    cpf: string,
    name: string,
    birthDate: Date,
    gender: Gender,
    adress: string,
    sus: number,
    allergies: string[],
    blood_type: string,
    phoneNumber?: number[],
  ): Patient {
    return new Patient(id, cpf, name, birthDate, gender, adress, sus, allergies, blood_type, phoneNumber)
  }
}
