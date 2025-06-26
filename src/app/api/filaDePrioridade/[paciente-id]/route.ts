import { deletePatientFromPriorityQueue } from "@/database/priorityQueue"
import { NextResponse } from "next/server"

export async function DELETE(
  _req: Request,
  { params }: { params: { paciente_id: string } }
) {
  const paciente_id = Number(params.paciente_id)

  if (isNaN(paciente_id)) {
    return NextResponse.json(
      { error: "paciente_id deve ser um número válido" },
      { status: 400 }
    )
  }

  try {
    const result = deletePatientFromPriorityQueue(paciente_id)

    if (result === 0) {
      return NextResponse.json(
        { error: "Paciente não encontrado na fila de prioridade" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: "Paciente deletado com sucesso da fila de prioridade",
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: "Erro interno", detalhe: error.message },
      { status: 500 }
    )
  }
}
