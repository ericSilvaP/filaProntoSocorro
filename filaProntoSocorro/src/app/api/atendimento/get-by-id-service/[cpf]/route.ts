import { getServiceByAtendimentoId } from "@/database/serviceRepository";
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

    const service = await getServiceByAtendimentoId(atendimento_id);
    
    if (!service) {
      return new Response("Serviço não encontrado", { status: 404 });
    }
    
    return NextResponse.json(service);
  } catch (error) {
    console.error("Erro ao buscar serviço:", error);
    return new Response("Erro interno do servidor", { status: 500 });
  }
}