export class LegalQueue {
  /*
    queues[0] = prioridade especial
    queues[1] = prioridade legal
    queues[2] = normal
  */

  private queues: number[][]
  private lastCalleds: number[]

  constructor() {
    this.queues = [[], [], []]
    this.lastCalleds = [0, 0, 0]
  }

  enqueue(queueI: number): boolean {
    if (queueI >= this.queues.length) {
      return false
    }

    const queue = this.queues[queueI]
    queue.push(this.lastCalleds[queueI] + 1)
    return true
  }

  dequeue(queueI: number): number {
    if (queueI >= this.queues.length) {
      return -1
    }

    const queue = this.queues[queueI]
    if (queue.length == 0) {
      return -1
    } else {
      return queue.splice(0, 1)[0]
    }
  }
}
