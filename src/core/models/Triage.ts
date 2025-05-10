import { Patient } from './Patient'
import { VitalSignals } from './VitalSignals'
import { RiskLevel } from '../../types/riskLevel'

export class Triage {
  constructor(
    private id: number,
    private patient: Patient,
    // private date: Date,
    private riskLevel?: RiskLevel,
    private vitalSignals?: VitalSignals,
  ) {
    // this.date = new Date()
  }

  getRisk(): number | undefined {
    return this.riskLevel
  }

  setRisk(newRisk: RiskLevel): void {
    this.riskLevel = newRisk
  }
}
