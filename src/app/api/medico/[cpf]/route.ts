import { deleteDoctorByCpf } from '@/database/doctorRespository'
import { NextResponse } from 'next/server'

export async function DELETE(_req: Request, { params }: { params: { cpf: string } }) {
  const cpf = params.cpf

  if (!cpf) {
    return NextResponse.json({ error: 'CPF obrigatório' }, { status: 400 })
  }

  try {
    const result = deleteDoctorByCpf(cpf)

    if (result === 0) {
      return NextResponse.json({ error: 'Médico não encontrado' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Médico deletado com sucesso' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
