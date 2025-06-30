import { Status } from '@/types/status'

import { Attendance } from '../models/nonPeople/Attendance'

export function getAverageAttendanceTime(attendances: Attendance[]): number {
  const finished = attendances.filter((a) => a.getStatus() === Status.FINISHED)
  if (finished.length === 0) return 0
  const total = finished.reduce(
    (acc, a) => acc + (a.getEndTime()!.getTime() - a.getStartTime()!.getTime()),
    0,
  )
  return total / finished.length
}

export function getNoShowRate(attendances: Attendance[]): number {
  const total = attendances.length
  const noShows = attendances.filter((a) => a.getStatus() === Status.DIDNOTATTEND).length
  return total === 0 ? 0 : (noShows / total) * 100
}

export function getAttendanceRate(attendances: Attendance[]): number {
  const total = attendances.length
  const attended = attendances.filter((a) => a.getStatus() === Status.FINISHED).length
  return total === 0 ? 0 : (attended / total) * 100
}

export function getRiskLevelWaitTimes(attendances: Attendance[]): Record<string, number> {
  const riskTimes: Record<string, number[]> = {}

  for (const attendance of attendances) {
    const triage = attendance.getTriage()
    const endTime = attendance.getEndTime()

    if (!triage || !endTime || attendance.getStatus() !== Status.FINISHED) continue

    const risk = triage.getRisk()
    const waitTimeMs = endTime.getTime() - attendance.getStartTime().getTime()

    if (!riskTimes[risk]) {
      riskTimes[risk] = []
    }

    riskTimes[risk].push(waitTimeMs)
  }

  const averageWaitTimes: Record<string, number> = {}
  for (const risk in riskTimes) {
    const times = riskTimes[risk]
    const avg = times.reduce((a, b) => a + b, 0) / times.length
    averageWaitTimes[risk] = Math.round(avg / 60000) // minutos
  }

  return averageWaitTimes
}
