import { updateAvaliacaoClinica } from "@/database/serviceRepository";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const atendimento_Id = Number(params.id);
  if (isNaN(atendimento_Id)) {
    return NextResponse.json(
      { error: "ID de atendimento inválido" },
      { status: 400 }
    );
  }

  const body = await req.json();
  const { avaliacao_clinica_id } = body;

  if (!avaliacao_clinica_id) {
    return NextResponse.json(
      { error: "avaliacao_clinica_id é obrigatório" },
      { status: 400 }
    );
  }

  try {
    const result = updateAvaliacaoClinica(atendimento_Id, avaliacao_clinica_id);

    if (result === 0) {
      return NextResponse.json(
        { error: "Atendimento não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Avaliação clínica atribuída com sucesso ao atendimento",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Erro ao atualizar atendimento",
        detalhe: error.message,
      },
      { status: 500 }
    );
  }
}
