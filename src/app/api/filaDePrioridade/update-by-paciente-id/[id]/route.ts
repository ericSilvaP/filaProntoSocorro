import { updatePriorityInQueue } from "@/database/priorityQueue";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const atendimento_Id = Number(params.id);
  if (isNaN(atendimento_Id)) {
    return NextResponse.json(
      { error: `ID de atendimento inválido - ${params.id}` },
      { status: 400 }
    );
  }

  const body = await req.json();
  const { prioridade } = body;

  if (prioridade === null || prioridade === undefined) {
    return NextResponse.json(
      { error: "prioridade é obrigatório" },
      { status: 400 }
    );
  }

  try {
    const result = updatePriorityInQueue(atendimento_Id, prioridade);

    if (result === 0) {
      return NextResponse.json(
        { error: "Atendimento_id não encontrado na fila de prioridade" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Prioridade atribuída com sucesso a fila",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Erro ao atualizar a prioriodade",
        detalhe: error.message,
      },
      { status: 500 }
    );
  }
}
