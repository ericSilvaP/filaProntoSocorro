import { Consultation } from './Consultation'
import { Patient } from './Patient'
import { Triage } from './Triage'

export class Attendence {
  public readonly start_time: Date
  constructor(
    private id: number,
    private patient: Patient,
    public triage?: Triage,
    private consultation?: Consultation,
    private end_time?: Date,
  ) {
    this.start_time = new Date()
  }

  setEndTime(): void {
    this.end_time = new Date()
  }
}
