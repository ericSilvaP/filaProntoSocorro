import { removePatientFromService } from "@/database/serviceRepository";
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
    const result = await removePatientFromService(atendimentoId);
    
    if (result === 0) {
      return NextResponse.json(
        { error: "Atendimento não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Atendimento removido com sucesso" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao remover atendimento" },
      { status: 500 }
    );
  }
}