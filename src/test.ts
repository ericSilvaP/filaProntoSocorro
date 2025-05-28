import { randomInt } from 'crypto'

import { VitalSignals } from './core/models/nonPeople/VitalSignals'
import { Doctor } from './core/models/people/Doctor'
import { Nurse } from './core/models/people/Nurse'
import { Receptionist } from './core/models/people/Receptionist'
import { PriorityQueue } from './core/queueManagement/priorityQueue'
import { BloodType } from './types/bloodType'
import { Gender } from './types/gender'
import { RiskLevel } from './types/riskLevel'
import { Status } from './types/status'

// Instanciando os profissionais para uso no teste
const recepcionist = new Receptionist(
  1,
  '123.456.789-00',
  'Maria Recepcionista',
  new Date('1980-01-01'),
  Gender.FEMALE,
  'Rua A, 123',
  'maria.recep',
  'senha123',
)
const nurse = new Nurse(
  2,
  '987.654.321-00',
  'João Enfermeiro',
  new Date('1975-05-20'),
  Gender.MALE,
  'Rua B, 456',
  'joao.enf',
  'senha456',
  123456,
)
const doctor = new Doctor(
  3,
  '456.789.123-00',
  'Dra. Ana Médica',
  new Date('1970-12-12'),
  Gender.FEMALE,
  'Rua C, 789',
  'ana.med',
  'senha789',
  654321,
  'Clínico Geral',
)

// Criando a fila de prioridade com 5 níveis (conforme seu exemplo)
const priorityQueue = new PriorityQueue(5)

console.time('Teste 10k inserções e 5k remoções')

for (let i = 1; i <= 10000; i++) {
  // Cadastro do paciente
  const patient = recepcionist.registerPatient(
    i,
    `000.000.000-${('000' + i).slice(-3)}`,
    `Paciente ${i}`,
    new Date(1990, 0, 1),
    Gender.MALE,
    `Rua Teste, ${i}`,
    100000000 + i,
    BloodType.O_POSITIVE,
    ['Nenhuma'],
  )

  // Criação do atendimento e triagem com nível de risco randomizado
  const attendance = recepcionist.createAttendance(i, patient)

  const vitalSigns = new VitalSignals('120/80', 80, 18, 36.5, 98, 2)

  // Criar triagem com risco aleatório entre 0 e 4 (assumindo RiskLevel de 0 a 4)
  const risk = randomInt(0, 5) as RiskLevel

  const triage = nurse.createTriage(i, attendance, risk, vitalSigns)
  attendance.setTriage(triage)

  // Enfileirar na fila de prioridade
  recepcionist.enqueuePriorityQueue(priorityQueue, attendance)

  if (i % 1000 === 0) {
    console.log(`Inseridos ${i} pacientes...`)
  }
}

console.log('Inserção concluída, iniciando remoções...')

// Agora remover 5.000 pacientes do início da fila (supondo dequeue funciona)
for (let i = 0; i < 5000; i++) {
  const next = doctor.nextPatient(priorityQueue)
  if (!next) {
    console.error('Fila vazia antes de remover 5000 pacientes!')
    break
  }
  // Finalizar o atendimento para simular remoção da fila
  next.setStatus(Status.FINISHED)
}

console.log('Remoções concluídas')
console.log(`Pacientes restantes na fila: ${priorityQueue.getQueues().length}`)

console.timeEnd('Teste 10k inserções e 5k remoções')
