import { Gender } from '@/types/gender'
import { Roles } from '@/types/roles'

import { Attendence } from './Attendence'
import { Consultation } from './Consultation'
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

  createConsultation(id: number, attendence: Attendence): Consultation {
    return new Consultation(id, this, attendence)
  }

  nextPatient(prioQueue: PriorityQueue): Attendence | undefined {
    return prioQueue.dequeueNext()?.getAttendence()
  }

  toString(): string {
    return `Id: ${this.id}, CRM ${this.crm}, Specialty: ${this.specialty},Name: ${this.name}, Data de Nascimento: ${this.birthDate.toLocaleDateString()}`
  }
}
