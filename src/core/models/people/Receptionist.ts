import { BloodType } from '@/types/bloodType'
import { Gender } from '@/types/gender'
import { Roles } from '@/types/roles'

import { Patient } from './Patient'
import { Users } from './Users'
import { LegalQueue } from '../../queueManagement/LegalQueue'
import { PriorityQueue } from '../../queueManagement/priorityQueue'
import { QueueEntry } from '../../queueManagement/queueEntry'
import { Attendance } from '../nonPeople/Attendance'

export class Receptionist extends Users {
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
    super(id, cpf, name, birthDate, gender, adress, Roles.RECEPTIONIST, username, password, phoneNumber)
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
    allergies?: string[],
    phoneNumber?: number[],
  ): Patient {
    return new Patient(id, cpf, name, birthDate, gender, adress, sus, blood_type, allergies, phoneNumber)
  }

  createAttendance(id: number, patient: Patient): Attendance {
    return new Attendance(id, patient, this)
  }

  enqueuePriorityQueue(priorityQueue: PriorityQueue, attendance: Attendance): void {
    const queueEntry = new QueueEntry(attendance, attendance.getTriage()!.getRisk())
    priorityQueue.enqueue(queueEntry)
  }

  nextLegalQueue(legalQueue: LegalQueue): number | null {
    return legalQueue.dequeue()
  }

  toString(): string {
    return `Id: ${this.id}, Name: ${this.name}, Data de Nascimento: ${this.birthDate.toLocaleDateString()}`
  }
}
