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
    paciente_id
  } = body

  if (!atendimento_id || !paciente_id) {
    return NextResponse.json({ error: "Dados obrigatórios incompletos" }, { status: 400 })
  }
  try {
      const id = insertInPriorityQueue(
        atendimento_id,
        paciente_id
      );
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao inserir paciente na fila de prioridade" }, { status: 500 });
  }
}