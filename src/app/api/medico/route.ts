import { getAllDoctors, createDoctor, deleteDoctorByCpf } from "@/database/doctorRespository";
import { NextResponse } from "next/server";

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
    nome_mae
  } = body

  if (!especialidade || !crm || !nome || !cpf || !data_nascimento || !sexo || !estado_civil || !telefone) {
    return NextResponse.json({ error: "Dados obrigatórios incompletos" }, { status: 400 })
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
      nome_mae
    )

    return NextResponse.json({ medico_id: id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { cpf: string } }
) {
  const cpf = params.cpf

  if (!cpf) {
    return NextResponse.json({ error: "CPF obrigatório" }, { status: 400 })
  }

  try {
    const result = deleteDoctorByCpf(cpf)

    if (result === 0) {
      return NextResponse.json({ error: "Médico não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ message: "Médico deletado com sucesso" })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}