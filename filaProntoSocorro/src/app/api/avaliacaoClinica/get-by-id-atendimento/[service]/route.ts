import { getClinicalAssessmentByAtendimentoId } from "@/database/clinicalAssessmentRepository";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { atendimento_id: string } }
) {
  try {
    const atendimento_id = Number(params.atendimento_id);

    if (isNaN(atendimento_id)) {
      return new Response("ID de atendimento inválido", { status: 400 });
    }

    const reviews = await getClinicalAssessmentByAtendimentoId(atendimento_id);
    
    if (!reviews) {
      return new Response("Avaliação não encontrada", { status: 404 });
    }
    
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Erro ao buscar avaliação:", error);
    return new Response("Erro interno do servidor", { status: 500 });
  }
}