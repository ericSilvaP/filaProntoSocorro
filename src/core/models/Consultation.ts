import { Attendence } from './Attendence'
import { Doctor } from './Doctor'

export class Consultation {
  private start_time: Date
  constructor(
    private id: number,
    private doctor: Doctor,
    private attendence: Attendence,
    private diagnosis?: string,
    private end_time?: Date,
  ) {
    this.start_time = new Date()
  }

  addDiagnosis(newDiagnosis: string): void {
    this.diagnosis = newDiagnosis
  }

  endConsultation(): void {
    this.end_time = new Date()
  }
}
