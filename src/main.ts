import { Attendence } from './core/models/Attendence'
import { Nurse } from './core/models/Nurse'
import { Patient } from './core/models/Patient'
import { Triage } from './core/models/Triage'
import { PriorityQueue } from './core/triage/priorityQueue'
import { QueueEntry } from './core/triage/queueEntry'
import { Gender } from './types/gender'
import { RiskLevel } from './types/riskLevel'

const patient1: Patient = new Patient(1)
const patient2: Patient = new Patient(2)
const patient3: Patient = new Patient(3)

const redRisk = RiskLevel.Red
const yellowRisk = RiskLevel.Yellow
const orangeRisk = RiskLevel.Orange

const triage1: Triage = new Triage(1, patient1, redRisk, 'onosm')
const triage2: Triage = new Triage(1, patient2, yellowRisk)
const triage3: Triage = new Triage(1, patient3, orangeRisk)

const attendence1: Attendence = new Attendence(1, patient1, triage1)
const attendence2: Attendence = new Attendence(2, patient2, triage2)
const attendence3: Attendence = new Attendence(3, patient3, triage3)

const queueE1 = new QueueEntry(attendence1, redRisk)
const queueE2 = new QueueEntry(attendence2, yellowRisk)
const queueE3 = new QueueEntry(attendence3, orangeRisk)
const queueE4 = new QueueEntry(attendence3, orangeRisk)
const queueE5 = new QueueEntry(attendence3, redRisk)

const queue: PriorityQueue = new PriorityQueue(5)

const entriesQueues = [queueE1, queueE2, queueE3, queueE4, queueE5]

// for (let i of entriesQueues) queue.enqueue(i)
