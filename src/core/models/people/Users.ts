import { Gender } from '@/types/gender'
import { RiskLevel } from '@/types/riskLevel'
import { Roles } from '@/types/roles'

import { Person } from './Person'
import { PriorityQueue } from '../../queueManagement/priorityQueue'

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

  changePriority(prioQueue: PriorityQueue, cpf: string, newRisk: RiskLevel): boolean {
    const attendence = prioQueue.searchPatient(cpf)
    if (!attendence) return false
    const triage = attendence.getTriage()
    if (!triage) return false
    triage.setRisk(newRisk)
    return true
  }
}
