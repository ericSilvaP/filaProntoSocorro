import { deletePatientFromPriorityQueue } from "@/database/priorityQueue"
import { NextResponse } from "next/server"

export async function DELETE(
  _req: Request,
  { params }: { params: { atendimento_id: string } }
) {
  const atendimento_id = Number(params.atendimento_id)

  if (isNaN(atendimento_id)) {
    return NextResponse.json(
      { error: "Atendimento_id deve ser um número válido" },
      { status: 400 }
    )
  }

  try {
    const result = deletePatientFromPriorityQueue(atendimento_id)

    if (result === 0) {
      return NextResponse.json(
        { error: "Atendimento não encontrado na fila de prioridade" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: "Atendimento deletado com sucesso da fila de prioridade",
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: "Erro interno", detalhe: error.message },
      { status: 500 }
    )
  }
}
