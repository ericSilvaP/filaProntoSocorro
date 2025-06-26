import { deletePatientByCpf } from '@/database/patientRepository'
import { NextResponse } from 'next/server'

export async function DELETE(_req: Request, { params }: { params: { cpf: string } }) {
  const cpf = params.cpf

  if (!cpf) {
    return NextResponse.json({ error: 'CPF obrigatório' }, { status: 400 })
  }

  try {
    const result = deletePatientByCpf(cpf)

    if (result === 0) {
      return NextResponse.json({ error: 'Paciente não encontrado' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Paciente deletado com sucesso' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}