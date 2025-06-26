import { NextResponse } from "next/server"
import { getAllPatients, registerPatient } from "@/database/patientRepository"

export async function GET() {
  const recepcionistas = getAllPatients()
  return NextResponse.json(recepcionistas)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { 
    nome, 
    cartao_sus,
    cpf, 
    data_nascimento, 
    tipo_sanguineo,
    sexo, 
    estado_civil, 
    telefone, 
    nome_pai, 
    nome_mae 
  } = body

  if (!nome || !cartao_sus || !cpf || !data_nascimento || !sexo || !estado_civil || !telefone) {
    return NextResponse.json({ error: 'Dados obrigatórios incompletos' }, { status: 400 })
  }

  try {
    const id = registerPatient(
    nome,
    cartao_sus,
    cpf,
    data_nascimento,
    sexo,
    estado_civil,
    telefone,
    tipo_sanguineo,
    nome_pai,
    nome_mae
    )

    return NextResponse.json({ id: id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}