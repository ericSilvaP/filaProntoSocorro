import { Status } from '@/types/status'

import { Consultation } from './Consultation'
import { Triage } from './Triage'
import { Patient } from '../people/Patient'
import { Receptionist } from '../people/Receptionist'

export class Attendance {
  public readonly start_time: Date
  private end_time?: Date
  private status: number
  constructor(
    private id: number,
    private patient: Patient,
    private recepcionist: Receptionist,
    private triage?: Triage,
    private consultation?: Consultation,
  ) {
    this.start_time = new Date()
    this.status = Status.WAITING
  }

  // Setters
  setTriage(triage: Triage): void {
    this.triage = triage
  }

  setConsultation(consultation: Consultation): void {
    this.consultation = consultation
  }

  setEndTime(): void {
    this.end_time = new Date()
  }

  setStatus(newStatus: Status): void {
    this.status = newStatus
  }

  // Getters
  getId(): number {
    return this.id
  }

  getPatient(): Patient {
    return this.patient
  }

  getTriage(): Triage | undefined {
    return this.triage
  }

  getConsultation(): Consultation | undefined {
    return this.consultation
  }

  getStartTime(): Date {
    return this.start_time
  }

  getEndTime(): Date | undefined {
    return this.end_time
  }

  getRecepcionist(): Receptionist {
    return this.recepcionist
  }

  getStatus(): number {
    return this.status
  }

  // String representation
  toString(): string {
    return `Id: ${this.id}, Hora de início: ${this.start_time.toTimeString()}`
  }
}
