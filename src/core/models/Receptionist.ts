import { AccessLevel } from '@/types/accessLevel'
import { BloodType } from '@/types/bloodType'
import { Gender } from '@/types/gender'

import { Attendence } from './Attendence'
import { Patient } from './Patient'
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

  registerPatient(
    id: number,
    cpf: string,
    name: string,
    birthDate: Date,
    gender: Gender,
    adress: string,
    sus: number,
    blood_type: BloodType,
    allergies: string[],
    phoneNumber?: number[],
  ): Patient {
    return new Patient(id, cpf, name, birthDate, gender, adress, sus, allergies, blood_type, phoneNumber)
  }

  createAttendence(id: number, patient: Patient): Attendence {
    return new Attendence(id, patient)
  }

  toString(): string {
    return `Id: ${this.id}, Name: ${this.name}, Data de Nascimento: ${this.birthDate.toLocaleDateString()}`
  }
}
