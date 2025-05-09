import { Patient } from './patient'
import { RiskLevel } from './riskLevel'

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
    private riskLevel?: RiskLevel | number,
  ) {}

  getRisk(): number | undefined {
    return this.riskLevel
  }

  setRisk(newRisk: RiskLevel | number): void {
    this.riskLevel = newRisk
  }
}
