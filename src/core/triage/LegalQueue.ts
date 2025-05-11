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

  dequeue(): number | null {
    for (let i = 0; i <= 2; i++) {
      if (this.queues[i].length > 0) {
        return this.queues[i].shift()!
      }
    }
    return null
  }
}
