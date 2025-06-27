import { updateStatus } from '@/database/serviceRepository'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const atendimentoId = Number(params.id)

  if (isNaN(atendimentoId)) {
    return NextResponse.json(
      { error: `ID de atendimento inválido - ${params.id}` },
      { status: 400 }
    )
  }

  const body = await req.json()
  const { status } = body

  if (status === null || status === undefined || status < 0 || status > 5) {
    return NextResponse.json(
      { error: 'Status é obrigatório e deve estar entre 0 e 5' },
      { status: 400 }
    )
  }

  try {
    const result = updateStatus(atendimentoId, status)

    if (result === 0) {
      return NextResponse.json(
        { error: 'Atendimento_id não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Status do atendimento atualizado com sucesso',
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Erro ao atualizar o status do atendimento',
        detalhe: error.message,
      },
      { status: 500 }
    )
  }
}
