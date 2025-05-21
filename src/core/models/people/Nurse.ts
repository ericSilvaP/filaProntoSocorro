import { Gender } from '@/types/gender'
import { RiskLevel } from '@/types/riskLevel'
import { Roles } from '@/types/roles'

import { Users } from './Users'
import { Attendance } from '../nonPeople/Attendance'
import { Triage } from '../nonPeople/Triage'
import { VitalSignals } from '../nonPeople/VitalSignals'

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
    super(id, cpf, name, birthDate, gender, adress, Roles.NURSE, username, password, phoneNumber)
  }

  createTriage(id: number, attendence: Attendance, riskLevel: RiskLevel, vitalSignals: VitalSignals): Triage {
    return new Triage(id, attendence.getPatient(), riskLevel, vitalSignals)
  }

  toString(): string {
    return `Id: ${this.id}, Coren ${this.coren}, Name: ${this.name}, Data de Nascimento: ${this.birthDate.toLocaleDateString()}`
  }
}
