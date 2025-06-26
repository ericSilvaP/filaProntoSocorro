import { getUserByEmail } from "@/database/userRepository";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { setCookie } from "@/lib/cookies";

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: "Email e senha obrigatórios" }, { status: 400 })
  }

  const user = getUserByEmail(email)

  if (!user) {
    return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
  }

  const senhaCorreta = await bcrypt.compare(password, user.senha)

  if (!senhaCorreta) {
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 })
  }

  const response = NextResponse.json({ 
    message: "Login bem-sucedido",
    usuario: {
      email: user.email,
      papel: user.papel,
      id: user.usuario_id
    }
  })

  setCookie(response, "userId", user.usuario_id);
  setCookie(response, "userRole", user.papel);

  return response;
}