export const runtime = "nodejs";

import { getPatientByCpf } from '@/database/patientRepository';
import { NextResponse } from 'next/server';

export async function GET(_req: Request, context: { params: { cpf: string } }) {
  const cpf = decodeURIComponent(context.params.cpf);
  const patient = getPatientByCpf(cpf);

  if (!patient) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(patient);
}
