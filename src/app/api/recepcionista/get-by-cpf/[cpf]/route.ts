import { getRecepcionistaByCPF } from '@/database/receptionistRepository'
import { NextResponse } from 'next/server'

export async function GET(_req: Request, { params }: { params: { cpf: string } }) {
  const cpf = decodeURIComponent(params.cpf)
  const receptionist = getRecepcionistaByCPF(cpf)

  if (!receptionist) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(receptionist)
}
