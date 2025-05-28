import { VitalSignals } from './VitalSignals'
import { RiskLevel } from '../../../types/riskLevel'
import { Patient } from '../people/Patient'

export class Triage {
  constructor(
    private id: number,
    private patient: Patient,
    private riskLevel: RiskLevel,
    private vitalSignals: VitalSignals,
  ) {}

  getRisk(): number {
    return this.riskLevel
  }

  setRisk(newRisk: RiskLevel): void {
    this.riskLevel = newRisk
  }
}
