import { RiskLevel } from '../../types/riskLevel'
import { Attendance } from '../models/nonPeople/Attendance'

export class QueueEntry {
  public readonly maxWaitingTime: number
  constructor(
    private attendence: Attendance,
    private priorityLevel: RiskLevel | number,
  ) {
    this.maxWaitingTime = this.defineMaxWaitingTime()
  }

  getAttendence(): Attendance {
    return this.attendence
  }

  getPriorityLevel(): number {
    return this.priorityLevel
  }

  toString(): string {
    return `Attendence ID: ${this.attendence}, Priority: ${this.priorityLevel}`
  }

  defineMaxWaitingTime(): number {
    // tempo em milissegundos
    switch (this.priorityLevel) {
      case 0:
        return 0
      case 1:
        return 600000 // 10 minutos
      case 2:
        return 3600000 // 60 minutos
      case 3:
        return 7200000 // 120 minutos
      case 4:
        return 14400000 // 240 minutos
      default:
        return 14400000
    }
  }

  elapsedTime(): number {
    const now = new Date().getTime()
    const entryTime = this.attendence.getStartTime().getTime()
    return now - entryTime
  }

  setPriorityLevel(newPriority: number): void {
    this.priorityLevel = newPriority
  }
}
