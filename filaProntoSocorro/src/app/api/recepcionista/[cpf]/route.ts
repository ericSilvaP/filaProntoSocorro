import { deleteRecepcionistaByCpf } from '@/database/receptionistRepository'
import { NextResponse } from 'next/server'

export async function DELETE(_req: Request, { params }: { params: { cpf: string } }) {
  const cpf = params.cpf

  if (!cpf) {
    return NextResponse.json({ error: 'CPF obrigatório' }, { status: 400 })
  }

  try {
    const result = deleteRecepcionistaByCpf(cpf)

    if (result === 0) {
      return NextResponse.json({ error: 'Recepcionista não encontrado' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Recepcionista deletado com sucesso' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
