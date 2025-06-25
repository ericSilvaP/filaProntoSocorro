import { removeClinicalAssessmentByAtendimentoId } from "@/database/clinicalAssessmentRepository";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: { params: { atendimento_id: string } }
) {
  const atendimentoId = Number(params.atendimento_id);
  if (!atendimentoId || isNaN(atendimentoId)) {
    return NextResponse.json(
      { error: "ID de atendimento inválido" },
      { status: 400 }
    );
  }

  try {
    const result = await removeClinicalAssessmentByAtendimentoId(atendimentoId);

    if (result === 0) {
      return NextResponse.json(
        { error: "Avaliação não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Avaliação removida" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao remover avaliação" },
      { status: 500 }
    );
  }
}