import { randomInt } from 'crypto'

import { VitalSignals } from './core/models/nonPeople/VitalSignals'
import { Doctor } from './core/models/people/Doctor'
import { Nurse } from './core/models/people/Nurse'
import { Receptionist } from './core/models/people/Receptionist'
import {
  getAverageAttendanceTime,
  getNoShowRate,
  getAttendanceRate,
  getRiskLevelWaitTimes,
} from './core/queueManagement/Analytics'
import { PriorityQueue } from './core/queueManagement/priorityQueue'
import { numberToColor } from './core/utils/numberToColor'
import { BloodType } from './types/bloodType'
import { Gender } from './types/gender'
import { RiskLevel } from './types/riskLevel'
import { Status } from './types/status'

// Instanciação dos profissionais
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

// Pacientes a serem cadastrados
const patientData = [
  { name: 'Carlos', risk: RiskLevel.YELLOW },
  { name: 'Pedro', risk: RiskLevel.ORANGE },
  { name: 'José', risk: RiskLevel.GREEN },
  { name: 'Frederica', risk: RiskLevel.ORANGE },
  { name: 'Marcela', risk: RiskLevel.BLUE },
  { name: 'Maria', risk: RiskLevel.RED },
]

// Fila de prioridade
const priorityQueue = new PriorityQueue(5)

// Fluxo
console.log('--- INICIANDO ATENDIMENTO ---')

// Etapas: Cadastro, atendimento, triagem, fila
const attendances = patientData.map((data, index) => {
  const patient = recepcionist.registerPatient(
    index + 1,
    `111.222.333-${index}0`,
    data.name,
    new Date('1990-03-15'),
    Gender.MALE,
    'Rua D, 101',
    123456789 + index,
    BloodType.O_POSITIVE,
    ['Nenhuma'],
  )
  console.log(`📋 Paciente cadastrado: ${patient.getName()}`)

  const attendance = recepcionist.createAttendance(index + 1, patient)
  console.log(`🕐 Atendimento criado para: ${patient.getName()}`)

  const vitalSigns = new VitalSignals('120/80', 80, 18, 36.5, 98, 2)
  const triage = nurse.createTriage(index + 1, attendance, data.risk, vitalSigns)
  attendance.setTriage(triage)

  console.log(`🩺 Triagem realizada para ${patient.getName()}`)
  console.log(
    `📊 Sinais vitais: Pressão ${vitalSigns.getBloodPressure()}, FC ${vitalSigns.getHeartRate()}, Temp ${vitalSigns.getTemperature()}°C`,
  )
  console.log(`⚠️  Nível de risco: ${triage.getRisk()}`)

  recepcionist.enqueuePriorityQueue(priorityQueue, attendance)
  console.log(`📥 ${patient.getName()} adicionado à fila de prioridade.\n`)

  return attendance
})

console.log(priorityQueue.toString())

// Consulta médica
console.log(`=== INÍCIO CONSULTAS ===`)
while (true) {
  const nextAttendence = doctor.nextPatient(priorityQueue)
  if (nextAttendence) {
    // const attendenceSearch = priorityQueue.searchPatient('111.222.333-10')
    // if (attendenceSearch) console.log(`Paciente ${attendenceSearch?.getPatient().getName()}\n`)
    // else console.log('Paciente não encontrado\n')

    if (!doctor.patientCome(randomInt(-3, 2))) {
      // se o paciente não comparecer uma vez é colocado no fim da fila. Se não novamente, é dispensado
      if (nextAttendence.getStatus() == Status.WAITING) {
        const risk = nextAttendence.getTriage()!.getRisk()

        console.log(`🚫 Paciente ${nextAttendence.getPatient().getName()} não compareceu uma vez.\n`)
        nextAttendence.setStatus(Status.CALLEDONCE)

        if (risk < priorityQueue.getQueues().length - 1) nextAttendence.getTriage()?.setRisk(risk + 1)

        recepcionist.enqueuePriorityQueue(priorityQueue, nextAttendence)
      } else if (nextAttendence.getStatus() == Status.CALLEDONCE) {
        console.log(`🚫 Paciente ${nextAttendence.getPatient().getName()} não compareceu segunda vez.\n`)
        nextAttendence.setStatus(Status.DIDNOTATTEND)
      }
      console.log(priorityQueue.toString())

      continue
    }
    console.log(
      `🏥 ${doctor.getName()} está atendendo ${nextAttendence.getPatient().getName()}\n⭐ Prioridade - ${numberToColor(nextAttendence.getTriage()!.getRisk())}`,
    )
    const consultation = doctor.createConsultation(Date.now(), nextAttendence)
    consultation.addDiagnosis('Gripe comum.')
    consultation.endConsultation()
    nextAttendence.setEndTime()
    console.log(`✅ Consulta finalizada. Diagnóstico: ${consultation.getDiagnosis()}`)
    console.log(`📤 Atendimento encerrado para: ${nextAttendence.getPatient().getName()}\n`)
    nextAttendence.setStatus(Status.FINISHED)
    console.log(priorityQueue.toString())
  } else {
    console.log('⚠️  Nenhum paciente na fila para atendimento.\n')
    break
  }
}

console.log('--- FIM DO ATENDIMENTO ---')

const avgTime = getAverageAttendanceTime(attendances)
console.log(`\n⏱️ Tempo médio de atendimento: ${(avgTime / 1000).toFixed(2)}s`)

const noShow = getNoShowRate(attendances)
console.log(`🚫 Taxa de desistência: ${noShow.toFixed(1)}%`)

const attendanceRate = getAttendanceRate(attendances)
console.log(`👥 Taxa de comparecimento: ${attendanceRate.toFixed(1)}%`)

const waitTimes = getRiskLevelWaitTimes(attendances)
for (const level in waitTimes) {
  console.log(`⏳ Tempo médio de espera (${level}): ${(waitTimes[level] / 1000).toFixed(2)}s`)
}
