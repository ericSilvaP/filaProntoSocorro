export class VitalSignals {
  constructor(
    private blood_pressure: number,
    private heart_rate: number,
    private respiratory_rate: number,
    private temperature: number,
    private oxygen_saturation: number,
    private pain_level: number,
    private symptoms: string[],
  ) {}
}
