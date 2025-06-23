import { createUser, getAllUsers } from "@/database/userRepository";
import { NextResponse } from "next/server";


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
    const id = createUser(email, password, role, reference_id)
    return NextResponse.json({ id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
