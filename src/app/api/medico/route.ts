import { getAllDoctors, createDoctor, deleteDoctorByCpf } from '@/database/doctorRespository'
import { NextResponse } from 'next/server'

export async function GET() {
  const doctors = getAllDoctors()
  return NextResponse.json(doctors)
}

export async function POST(req: Request) {
  const body = await req.json()
  const {
    especialidade,
    crm,
    nome,
    cpf,
    data_nascimento,
    sexo,
    estado_civil,
    telefone,
    nome_pai,
    nome_mae,
  } = body

  if (
    !especialidade ||
    !crm ||
    !nome ||
    !cpf ||
    !data_nascimento ||
    !sexo ||
    !estado_civil ||
    !telefone
  ) {
    return NextResponse.json({ error: 'Dados obrigatórios incompletos'}, { status: 400 })
  }

  try {
    const id = createDoctor(
      especialidade,
      crm,
      nome,
      cpf,
      data_nascimento,
      sexo,
      estado_civil,
      telefone,
      nome_pai,
      nome_mae,
    )

    return NextResponse.json({ id: id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
