import { getAllService, registerService } from "@/database/serviceRepository";
import { NextResponse } from "next/server";


export async function GET() {
  const patients = getAllService();
  return NextResponse.json(patients);
}

export async function POST(req: Request) {
  const body = await req.json();
  const {
    paciente_id,
    recepcionista_id
  } = body

  if  (!paciente_id || !recepcionista_id) {
    return NextResponse.json({ error: "Dados obrigatórios incompletos" }, { status: 400 })
  }
  try {
      const id = await registerService(
        paciente_id,
        recepcionista_id
      );
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}