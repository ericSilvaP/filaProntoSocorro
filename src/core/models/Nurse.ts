import { AccessLevel } from '@/types/accessLevel'
import { Gender } from '@/types/gender'
import { RiskLevel } from '@/types/riskLevel'

import { Attendence } from './Attendence'
import { Patient } from './Patient'
import { Triage } from './Triage'
import { Users } from './Users'
import { VitalSignals } from './VitalSignals'
import { PriorityQueue } from '../triage/priorityQueue'
import { QueueEntry } from '../triage/queueEntry'

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

  createTriage(id: number, attendence: Attendence, riskLevel: RiskLevel, vitalSignals: VitalSignals): Triage {
    return new Triage(id, attendence.getPatient(), riskLevel, vitalSignals)
  }

  toString(): string {
    return `Id: ${this.id}, Coren ${this.coren}, Name: ${this.name}, Data de Nascimento: ${this.birthDate.toLocaleDateString()}`
  }
}
