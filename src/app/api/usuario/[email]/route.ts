import { deleteDoctorById } from "@/database/doctorRespository"
import { deleteNurseById } from "@/database/nurseRepository"
import { deleteRecepcionistaById } from "@/database/receptionistRepository"
import { getUserByEmail, deleteUserByEmail } from "@/database/userRepository"
import { NextResponse } from "next/server"

export async function DELETE(req: Request) {
  try {
    const { email } = await req.json()
    if (!email) {
      return NextResponse.json({ error: 'Email é obrigatório' }, { status: 400 })
    }

    // 1. Busca usuário
    const user = getUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    const { papel, referencia_id } = user

    // 2. Deleta funcionário conforme papel
    let deletedEmployeeCount = 0
    switch (papel) {
      case 'medico':
        deletedEmployeeCount = deleteDoctorById(referencia_id)
        break
      case 'enfermeira':
        deletedEmployeeCount = deleteNurseById(referencia_id)
        break
      case 'recepcionista':
        deletedEmployeeCount = deleteRecepcionistaById(referencia_id)
        break
      default:
        return NextResponse.json({ error: 'Papel inválido' }, { status: 400 })
    }

    if (deletedEmployeeCount === 0) {
      return NextResponse.json(
        { error: 'Funcionário não encontrado para deleção' },
        { status: 404 },
      )
    }

    // 3. Deleta usuário
    const deletedUserCount = deleteUserByEmail(email)
    if (deletedUserCount === 0) {
      return NextResponse.json({ error: 'Falha ao deletar usuário' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Usuário e funcionário deletados com sucesso' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
