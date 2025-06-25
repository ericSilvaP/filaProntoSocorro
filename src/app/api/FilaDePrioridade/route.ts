import { getPriorityQueue, insertInPriorityQueue } from "@/database/priorityQueue";
import { NextResponse } from "next/server";


export async function GET() {
  const patients = getPriorityQueue();
  return NextResponse.json(patients);
}

export async function POST(req: Request) {
  const body = await req.json();
  const {
    atendimento_id,
    paciente_id,
    classificacao_risco_id
  } = body

  if (!atendimento_id || !paciente_id || !classificacao_risco_id) {
    return NextResponse.json({ error: "Dados obrigatórios incompletos" }, { status: 400 })
  }
  try {
      const id = await insertInPriorityQueue(
        atendimento_id,
        paciente_id,
        classificacao_risco_id
      );
    return NextResponse.json({ id }, { status: 201 });
  } catch (err: any) {
  return NextResponse.json(
    { error: "Erro ao inserir paciente na fila de prioridade", detalhe: err.message },
    { status: 500 }
  );
}
}