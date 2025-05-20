import { Attendence } from './core/models/Attendence'
import { Nurse } from './core/models/Nurse'
import { Patient } from './core/models/Patient'
import { Triage } from './core/models/Triage'
import { VitalSignals } from './core/models/VitalSignals'
import { PriorityQueue } from './core/triage/priorityQueue'
import { QueueEntry } from './core/triage/queueEntry'
import { BloodType } from './types/bloodType'
import { Gender } from './types/gender'
import { RiskLevel } from './types/riskLevel'

const patient1: Patient = new Patient(
  1,
  '100000000',
  'Eric',
  new Date(2005, 9, 12),
  Gender.Male,
  's',
  123,
  BloodType.A_NEGATIVE,
  ['s', 'f'],
)

const patient2: Patient = new Patient(
  2,
  '100000000',
  'Daniel',
  new Date(2005, 9, 12),
  Gender.Male,
  's',
  123,
  BloodType.A_NEGATIVE,
  ['s', 'f'],
)
const patient3: Patient = new Patient(
  3,
  '100000000',
  'Jurema',
  new Date(2005, 9, 12),
  Gender.Male,
  's',
  123,
  BloodType.A_NEGATIVE,
  ['s', 'f'],
)

const redRisk = RiskLevel.Red
const yellowRisk = RiskLevel.Yellow
const orangeRisk = RiskLevel.Orange

const vitalSignals = new VitalSignals('100/70', 80, 15, 36, 97, 2)

const triage1: Triage = new Triage(1, patient1, redRisk, vitalSignals)
const triage2: Triage = new Triage(1, patient2, yellowRisk, vitalSignals)
const triage3: Triage = new Triage(1, patient3, orangeRisk, vitalSignals)

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

// RECEPCIONISTA
// 1 - registrar paciente, se necessário
// 2 - puxar paciente do bd, criando uma instância do mesmo
// 3 - criar atendimento com o respectivo paciente
// ENFERMEIRO
// 4 - colocar informações sobre a triagem no atendimento
// SISTEMA
// 5 - automaticamente colocar o paciente na fila de prioridade
// MÉDICO
// 6 - chamar próximo paciente
// 7 - colocar as informações necessárias a consulta e encerrá-la
