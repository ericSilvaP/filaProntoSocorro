import { getPatientByCpf } from '@/database/patientRepository'
import { NextResponse } from 'next/server'

export async function GET(_req: Request, { params }: { params: { cpf: string } }) {
  const cpf = decodeURIComponent(params.cpf)
  const receptionist = getPatientByCpf(cpf)

  if (!receptionist) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(receptionist)
}