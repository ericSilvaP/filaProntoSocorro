import { createNurse, deleteNurseByCpf, getAllNurses } from '@/database/nurseRepository'
import { NextResponse } from 'next/server'

export async function GET() {
  const nurses = getAllNurses()
  return NextResponse.json(nurses)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { coren, nome, cpf, data_nascimento, sexo, estado_civil, telefone, nome_pai, nome_mae } =
    body

  if (!coren || !nome || !cpf || !data_nascimento || !sexo || !estado_civil || !telefone) {
    return NextResponse.json({ error: 'Dados obrigatórios incompletos' }, { status: 400 })
  }

  try {
    const id = createNurse(
      coren,
      nome,
      cpf,
      data_nascimento,
      sexo,
      estado_civil,
      telefone,
      nome_pai,
      nome_mae,
    )

    return NextResponse.json({ enfermeira_id: id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
