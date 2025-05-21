import { Attendance } from './Attendance'
import { Doctor } from './Doctor'

export class Consultation {
  private start_time: Date
  private end_time?: Date
  constructor(
    private id: number,
    private doctor: Doctor,
    private attendence: Attendance,
    private diagnosis?: string,
  ) {
    this.start_time = new Date()
  }

  addDiagnosis(newDiagnosis: string): void {
    this.diagnosis = newDiagnosis
  }

  endConsultation(): void {
    this.end_time = new Date()
  }

  getDiagnosis(): string | undefined {
    return this.diagnosis
  }
}
