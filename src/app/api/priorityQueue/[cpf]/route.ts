
import { deletePatientFromPriorityQueueByCpf } from "@/database/priorityQueue"
import { NextResponse } from "next/server"

export async function DELETE(
  _req: Request,
  { params }: { params: { cpf: string } }
) {
  const cpf = params.cpf

  if (!cpf) {
    return NextResponse.json({ error: "CPF obrigatório" }, { status: 400 })
  }

  try {
    const result = deletePatientFromPriorityQueueByCpf(cpf)

    if (result === 0) {
      return NextResponse.json({ error: "Paciente não encontrado na fila de prioridade" }, { status: 404 })
    }

    return NextResponse.json({ message: "Paciente deletado com sucesso da fila de prioridade" })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}