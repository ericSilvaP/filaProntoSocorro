import { deleteNurseByCpf } from "@/database/nurseRepository"
import { NextResponse } from "next/server"

export async function DELETE(
  _req: Request,
  { params }: { params: { cpf: string } }
) {
  const cpf = params.cpf

  if (!cpf) {
    return NextResponse.json({ error: "CPF obrigatório" }, { status: 400 })
  }

  try {
    const result = deleteNurseByCpf(cpf)

    if (result === 0) {
      return NextResponse.json({ error: "Enfermeira não encontrada" }, { status: 404 })
    }

    return NextResponse.json({ message: "Enfermeira deletada com sucesso" })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
