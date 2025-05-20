import { Consultation } from './Consultation'
import { Patient } from './Patient'
import { Recepcionist } from './Receptionist'
import { Triage } from './Triage'

export class Attendence {
  public readonly start_time: Date

  constructor(
    private id: number,
    private patient: Patient,
    private recepcionist: Recepcionist,
    private triage?: Triage,
    private consultation?: Consultation,
    private end_time?: Date,
  ) {
    this.start_time = new Date()
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

  getRecepcionist(): Recepcionist {
    return this.recepcionist
  }

  // String representation
  toString(): string {
    return `Id: ${this.id}, Hora de início: ${this.start_time.toTimeString()}`
  }
}
