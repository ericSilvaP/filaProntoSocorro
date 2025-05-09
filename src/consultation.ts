import { Attendence } from './attendence'
import { Doctor } from './doctor'

export class Consultation {
  constructor(
    private id: number,
    private doctor: Doctor,
    private attendence: Attendence,
    private start_time: Date,
    private diagnosis?: string,
    private end_time?: Date,
  ) {}

  addDiagnosis(newDiagnosis: string): void {
    this.diagnosis = newDiagnosis
  }

  endConsultation(): void {
    this.end_time = new Date()
  }
}
