export class VitalSignals {
  constructor(
    private blood_pressure: string,
    private heart_rate: number,
    private respiratory_rate: number,
    private temperature: number,
    private oxygen_saturation: number,
    private pain_level: number,
  ) {}

  // Blood Pressure
  getBloodPressure(): string {
    return this.blood_pressure
  }

  setBloodPressure(value: string): void {
    this.blood_pressure = value
  }

  // Heart Rate
  getHeartRate(): number {
    return this.heart_rate
  }

  setHeartRate(value: number): void {
    this.heart_rate = value
  }

  // Respiratory Rate
  getRespiratoryRate(): number {
    return this.respiratory_rate
  }

  setRespiratoryRate(value: number): void {
    this.respiratory_rate = value
  }

  // Temperature
  getTemperature(): number {
    return this.temperature
  }

  setTemperature(value: number): void {
    this.temperature = value
  }

  // Oxygen Saturation
  getOxygenSaturation(): number {
    return this.oxygen_saturation
  }

  setOxygenSaturation(value: number): void {
    this.oxygen_saturation = value
  }

  // Pain Level
  getPainLevel(): number {
    return this.pain_level
  }
}
