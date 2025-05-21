import { QueueEntry } from './queueEntry'
import { Attendance } from '../models/nonPeople/Attendance'

export class PriorityQueue {
  private queues: QueueEntry[][]
  private expiredQueue: QueueEntry[]
  private attendenceMap: Map<string, Attendance>

  constructor(private nQueues: number) {
    this.queues = []
    this.expiredQueue = []
    this.addQueues(nQueues)
    this.attendenceMap = new Map()
  }

  private addQueues(nQueues: number): void {
    let i = 0
    while (i < nQueues) {
      this.queues.push([])
      i++
    }
  }

  enqueue(queueEntry: QueueEntry): void {
    const servicePriority: number = queueEntry.getPriorityLevel()
    if (servicePriority > this.nQueues - 1) {
      console.log('Invalid priority')
      return
    }

    this.queues[servicePriority].push(queueEntry)
    this.attendenceMap.set(queueEntry.getAttendence().getPatient().getCpf(), queueEntry.getAttendence())
  }

  dequeueNext(): QueueEntry | null {
    this.verifyTimes()
    if (this.expiredQueue.length > 0) return this.expiredQueue.shift()!
    for (let i = 0; i <= this.queues.length - 1; i++) {
      if (this.queues[i].length > 0) {
        const attendenceDel = this.queues[i].shift()!
        this.attendenceMap.delete(attendenceDel.getAttendence().getPatient().getCpf())
        return attendenceDel
      }
    }
    return null
  }

  static dequeue(queue: QueueEntry[]): QueueEntry | undefined {
    if (queue.length === 0) return undefined
    return queue.shift()
  }

  verifyTimes(): void {
    for (let i = 1; i < this.nQueues; i++) {
      const queue = this.queues[i]
      if (queue.length > 0) {
        const head = queue[0]
        if (head.elapsedTime() >= head.maxWaitingTime) {
          const expiredElement = PriorityQueue.dequeue(queue)
          if (expiredElement) {
            this.expiredQueue.push(expiredElement) // <- vai pra fila separada
          }
        }
      }
    }
  }

  searchPatient(cpf: string): Attendance | undefined {
    return this.attendenceMap.get(cpf)
  }

  getQueues(): QueueEntry[][] {
    return this.queues
  }

  getExpiredQueue(): QueueEntry[] {
    return this.expiredQueue
  }
}
