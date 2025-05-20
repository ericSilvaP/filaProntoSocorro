export class LegalQueue {
  /*
    queues[0] = prioridade especial
    queues[1] = prioridade legal
    queues[2] = normal

    lastCalleds = senhas numéricas auto incrementais
  */

  private queues: number[][]
  private lastCalleds: number[]

  constructor() {
    this.queues = [[], [], []]
    this.lastCalleds = [0, 0, 0]
  }

  enqueue(priority: number): boolean {
    if (priority >= this.queues.length || priority < 0) {
      return false
    }

    const queue = this.queues[priority]
    queue.push(this.lastCalleds[priority] + 1)
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
