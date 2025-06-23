import { getNurseByCPF } from "@/database/nurseRepository"
import { NextResponse } from "next/server"

export async function GET(
  _req: Request,
  { params }: { params: { cpf: string }}
) {
  const cpf = decodeURIComponent(params.cpf)
  const nurse = getNurseByCPF(cpf)

  if (!nurse) return NextResponse.json({ error: "Not found" }, { status: 404 })

  return NextResponse.json(nurse)
}
