import { Patient } from './patient'

export class Triage {
  constructor(
    private id: number,
    private patient: Patient,
    // private blood_pressure: number,
    // private heart_rate: number,
    // private respiratory_rate: number,
    // private temperature: number,
    // private oxygen_saturation: number,
    // private pain_level: number,
    // private date: Date,
    // private time: Date,
    // private symptoms: string[],
    private risk: number,
  ) {}

  getRisk(): number {
    return this.risk
  }

  setRisk(newRisk: number): void {
    this.risk = newRisk
  }
}
