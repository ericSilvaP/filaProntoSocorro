import { Roles } from '@/types/accessLevel'
import { Gender } from '@/types/gender'

import { Patient } from './Patient'
import { Users } from './Users'
import { PriorityQueue } from '../triage/priorityQueue'

export class Doctor extends Users {
  constructor(
    id: number,
    cpf: string,
    name: string,
    birthDate: Date,
    gender: Gender,
    adress: string,
    username: string,
    password: string,
    private crm: number,
    private specialty: string,
    phoneNumber?: number[],
  ) {
    super(id, cpf, name, birthDate, gender, adress, Roles.DOCTOR, username, password, phoneNumber)
  }

  nextPatient(prioQueue: PriorityQueue): Patient | undefined {
    return prioQueue.dequeueNext()?.getAttendence().getPatient()
  }

  toString(): string {
    return `Id: ${this.id}, CRM ${this.crm}, Specialty: ${this.specialty},Name: ${this.name}, Data de Nascimento: ${this.birthDate.toLocaleDateString()}`
  }
}
