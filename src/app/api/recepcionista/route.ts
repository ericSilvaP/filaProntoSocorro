import { getAllRecepcionistas, createRecepcionista } from '@/database/receptionistRepository'
import { NextResponse } from 'next/server'

export async function GET() {
  const recepcionistas = getAllRecepcionistas()
  return NextResponse.json(recepcionistas)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { nome, cpf, data_nascimento, sexo, estado_civil, telefone, nome_pai, nome_mae } = body

  if (!nome || !cpf || !data_nascimento || !sexo || !estado_civil || !telefone) {
    return NextResponse.json({ error: 'Dados obrigatórios incompletos' }, { status: 400 })
  }

  try {
    const id = createRecepcionista(
      nome,
      cpf,
      data_nascimento,
      sexo,
      estado_civil,
      telefone,
      nome_pai,
      nome_mae,
    )

    return NextResponse.json({ recepcionista_id: id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
