import { getDoctorByCPF } from "@/database/doctorRespository"
import { NextResponse } from "next/server"

export async function GET(
  _req: Request,
  { params }: { params: { cpf: string }}
) {
  const cpf = decodeURIComponent(params.cpf)
  const doctor = getDoctorByCPF(cpf)

  if (!doctor) return NextResponse.json({ error: "Not found" }, { status: 404 })

  return NextResponse.json(doctor)
}
