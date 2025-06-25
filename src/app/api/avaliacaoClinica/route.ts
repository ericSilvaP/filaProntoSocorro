import { getAllClinicalAssessment,registerClinicalAssessment } from "@/database/clinicalAssessmentRepository";
import { NextResponse } from "next/server";


export async function GET() {
  const reviews = getAllClinicalAssessment();
  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  const body = await req.json();
  const {
    atendimento_id,
    classificacao_risco_id,
    pressao_arterial,
    frequencia_cardiaca,
    frequencia_respiratoria,
    temperatura,
    saturacao_oxigenio,
    nivel_dor
  } = body

  if (!atendimento_id || !classificacao_risco_id || !pressao_arterial || !frequencia_cardiaca || !frequencia_respiratoria || !temperatura || !saturacao_oxigenio || !nivel_dor) {
    return NextResponse.json({ error: "Dados obrigatórios incompletos" }, { status: 400 })
  }
  try {
      const id = await registerClinicalAssessment(
        atendimento_id,
        classificacao_risco_id,
        pressao_arterial,
        frequencia_cardiaca,
        frequencia_respiratoria,
        temperatura,
        saturacao_oxigenio,
        nivel_dor
      );
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}