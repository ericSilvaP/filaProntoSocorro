import { getPatientPriorityQueueAtnId } from "@/database/priorityQueue";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { paciente_id: string } }
) {
  const paciente_id = Number(decodeURIComponent(params.paciente_id));

  if (isNaN(paciente_id)) {
    return new Response("ID inválido", { status: 400 });
  }

  const patientSearch = getPatientPriorityQueueAtnId(paciente_id);

  if (!patientSearch || patientSearch.length === 0) {
    return new Response("Paciente não está na fila", { status: 404 });
  }

  return NextResponse.json(patientSearch);
}
