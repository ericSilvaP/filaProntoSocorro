
import { getPriorityQueueByCpf } from "@/database/priorityQueue";
import { NextResponse } from "next/server";

export async function GET(req: Request, 
  { params }: { params: { cpf: string } }) {
  const cpf = decodeURIComponent(params.cpf);
  const patient = getPriorityQueueByCpf(cpf);
  if (!patient) {
    return new Response("Patient not found", { status: 404 });
  }
  return NextResponse.json(patient);
}