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

  if (
    atendimento_id === undefined || atendimento_id === null ||
    classificacao_risco_id === undefined || classificacao_risco_id === null ||
    !pressao_arterial ||
    frequencia_cardiaca === undefined || frequencia_cardiaca === null ||
    frequencia_respiratoria === undefined || frequencia_respiratoria === null ||
    temperatura === undefined || temperatura === null ||
    saturacao_oxigenio === undefined || saturacao_oxigenio === null ||
    nivel_dor === undefined || nivel_dor === null
  ) {
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