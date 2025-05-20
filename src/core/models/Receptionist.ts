import { Roles } from '@/types/accessLevel'
import { BloodType } from '@/types/bloodType'
import { Gender } from '@/types/gender'

import { Attendence } from './Attendence'
import { Patient } from './Patient'
import { Users } from './Users'
import { LegalQueue } from '../triage/LegalQueue'
import { PriorityQueue } from '../triage/priorityQueue'
import { QueueEntry } from '../triage/queueEntry'

export class Recepcionist extends Users {
  constructor(
    id: number,
    cpf: string,
    name: string,
    birthDate: Date,
    gender: Gender,
    adress: string,
    username: string,
    password: string,
    phoneNumber?: number[],
  ) {
    super(id, cpf, name, birthDate, gender, adress, Roles.RECEPCIONIST, username, password, phoneNumber)
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

  enqueuePriorityQueue(priorityQueue: PriorityQueue, attendence: Attendence): void {
    const queueEntry = new QueueEntry(attendence, attendence.getTriage()!.getRisk())
    priorityQueue.enqueue(queueEntry)
  }

  nextLegalQueue(legalQueue: LegalQueue): number | null {
    return legalQueue.dequeue()
  }

  toString(): string {
    return `Id: ${this.id}, Name: ${this.name}, Data de Nascimento: ${this.birthDate.toLocaleDateString()}`
  }
}
