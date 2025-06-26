import {
  createUser,
  getAllUsers,
} from '@/database/userRepository'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function GET() {
  const users = getAllUsers()
  return NextResponse.json(users)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password, role, reference_id } = body

  if (!email || !password || !role || !reference_id) {
    return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 })
  }

  try {
    const encryptedPassword = await bcrypt.hash(password, 10)
    const id = createUser(email, encryptedPassword, role, reference_id)
    return NextResponse.json({ id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
