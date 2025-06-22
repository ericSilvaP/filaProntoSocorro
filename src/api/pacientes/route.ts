import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const pacientes = await prisma.paciente.findMany()
  return NextResponse.json(pacientes)
}

export async function POST(req: Request) {
  const data = await req.json()

  const novoPaciente = await prisma.paciente.create({
    data: {
      nome: data.nome, 
      cpf: data.cpf,
      data_nascimento: new Date(data.data_nascimento),
      sexo: data.sexo,
      estado_civil: data.estado_civil,
      telefone: data.telefone,
      nome_pai: data.nome_pai,
      nome_mae: data.nome_mae,
      cartao_sus: data.cartao_sus,
      tipo_sanguineo: data.tipo_sanguineo,
    }
  })

  return NextResponse.json(novoPaciente)
}
