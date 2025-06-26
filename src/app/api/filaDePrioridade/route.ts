import { getPriorityQueue, insertInPriorityQueue } from "@/database/priorityQueue";
import { NextResponse } from "next/server";


export async function GET() {
  const patients = getPriorityQueue();
  return NextResponse.json(patients);
}

export async function POST(req: Request) {
  const body = await req.json();
  const {
    idQueue,
    patientId,
    riskRatingId
  } = body

  if (!idQueue || !patientId || !riskRatingId) {
    return NextResponse.json({ error: "Dados obrigatórios incompletos" }, { status: 400 })
  }
  try {
      const id = insertInPriorityQueue(
        idQueue,
        patientId,
        riskRatingId
      );
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao inserir paciente na fila de prioridade" }, { status: 500 });
  }
}