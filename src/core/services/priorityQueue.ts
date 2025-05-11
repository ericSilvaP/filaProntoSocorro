import { QueueEntry } from './queueEntry'

export class PriorityQueue {
  private queues: QueueEntry[][]
  private expiredQueue: QueueEntry[]

  constructor(private nQueues: number) {
    this.queues = []
    this.expiredQueue = []
    this.addQueues(nQueues)
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
  }

  dequeueN(n: number): QueueEntry | undefined {
    if (n > this.queues.length || n < 0) return undefined
    const queue = this.queues[n]
    return PriorityQueue.dequeue(queue)
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

  getQueues(): QueueEntry[][] {
    return this.queues
  }

  getExpiredQueue(): QueueEntry[] {
    return this.expiredQueue
  }
}
