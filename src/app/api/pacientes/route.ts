import { getAllPatients, registerPatient } from "@/database/patientRepository";
import { NextResponse } from "next/server";


export async function GET() {
  const patients = getAllPatients();
  return NextResponse.json(patients);
}

export async function POST(req: Request) {
  const body = await req.json();
  const {
    nome,
    cartao_sus,
    cpf,
    data_nascimento,
    tipo_sanguineo,
    sexo,
    estado_civil,
    telefone,
    nome_pai,
    nome_mae
  } = body

  if (!nome || !cartao_sus || !cpf || !data_nascimento || !tipo_sanguineo || !sexo || !estado_civil || !telefone) {
    return NextResponse.json({ error: "Dados obrigatórios incompletos" }, { status: 400 })
  }
  try {
      const id = await registerPatient(
        nome,
        cartao_sus,
        cpf,
        data_nascimento,
        tipo_sanguineo,
        sexo,
        estado_civil,
        telefone,
        nome_pai,
        nome_mae
      );
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}