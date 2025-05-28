import { Request, Response } from 'express'

import { Attendance } from '@/core/models/nonPeople/Attendance'
import { Receptionist } from '@/core/models/people/Receptionist'
import {
  getAverageAttendanceTime,
  getNoShowRate,
  getAttendanceRate,
  getRiskLevelWaitTimes,
} from '@/core/queueManagement/Analytics'

const attendances: Attendance[] = []

export function createAttendance(req: Request, res: Response) {
  const {
    patientId,
    patientCpf,
    patientName,
    patientBirthDate,
    patientGender,
    patientAdress,
    patientSus,
    patientBloodType,
    patientAllergies,
    patientPhoneNumber,

    receptionistId,
    receptionistCpf,
    receptionistName,
    receptionistBirthDate,
    receptionistGender,
    receptionistAdress,
    receptionistUsername,
    receptionistPassword,
    receptionistPhoneNumber,
  } = req.body

  try {
    const birthDatePatient = new Date(patientBirthDate)
    const birthDateReceptionist = new Date(receptionistBirthDate)

    const receptionist = new Receptionist(
      receptionistId,
      receptionistCpf,
      receptionistName,
      birthDateReceptionist,
      receptionistGender,
      receptionistAdress,
      receptionistUsername,
      receptionistPassword,
      receptionistPhoneNumber,
    )

    const patient = receptionist.registerPatient(
      patientId,
      patientCpf,
      patientName,
      birthDatePatient,
      patientGender,
      patientAdress,
      patientSus,
      patientBloodType,
      patientAllergies,
      patientPhoneNumber,
    )

    const attendance = receptionist.createAttendance(Date.now(), patient)
    attendances.push(attendance)

    res.status(201).json(attendance)
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar atendimento', details: (error as Error).message })
  }
}

export function listAttendances(req: Request, res: Response) {
  res.json(attendances)
}

export function getAnalytics(req: Request, res: Response) {
  const avgTime = getAverageAttendanceTime(attendances)
  const noShow = getNoShowRate(attendances)
  const attendRate = getAttendanceRate(attendances)
  const waitTimes = getRiskLevelWaitTimes(attendances)

  res.json({
    tempoMedio: avgTime,
    taxaAusencia: noShow,
    taxaAtendimento: attendRate,
    tempoEsperaPorRisco: waitTimes,
  })
}
