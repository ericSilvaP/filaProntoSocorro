import { Attendence } from './attendence'
import { Patient } from './patient'
import { PriorityQueue } from './priorityQueue'
import { QueueEntry } from './queueEntry'
import { RiskLevel } from './riskLevel'
import { Triage } from './triage'

const patient1: Patient = new Patient(1)
const patient2: Patient = new Patient(2)
const patient3: Patient = new Patient(3)

const triage1: Triage = new Triage(1, patient1, 0)
const triage2: Triage = new Triage(1, patient2, 1)
const triage3: Triage = new Triage(1, patient3, 2)

const attendence1: Attendence = new Attendence(1, patient1, triage1)
const attendence2: Attendence = new Attendence(2, patient2, triage2)
const attendence3: Attendence = new Attendence(3, patient3, triage3)

const redRisk = RiskLevel.Red
const yellowRisk = RiskLevel.Yellow
const orangeRisk = RiskLevel.Orange

const queueE1 = new QueueEntry(attendence1, redRisk)
const queueE2 = new QueueEntry(attendence2, yellowRisk)
const queueE3 = new QueueEntry(attendence3, orangeRisk)
const queueE4 = new QueueEntry(attendence3, orangeRisk)
const queueE5 = new QueueEntry(attendence3, redRisk)

const queue: PriorityQueue = new PriorityQueue(5)

const entriesQueues = [queueE1, queueE2, queueE3, queueE4, queueE5]

for (let i of entriesQueues) queue.enqueue(i)

console.log(queue.getQueues())
queue.verifyTimes()
console.log(queue.getExpiredQueue())
