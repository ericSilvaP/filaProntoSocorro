import { getUserByEmail } from "@/database/userRepository";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, senha } = await req.json();

  if (!email || !senha) {
    return NextResponse.json({ error: "Email e senha obrigatórios" }, { status: 400 });
  }

  const user = getUserByEmail(email);

  if (!user) {
    return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
  }

  const senhaCorreta = senha === user.senha

  if (!senhaCorreta) {
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
  }

  // Exemplo de resposta
  return NextResponse.json({
    mensagem: "Login bem-sucedido",
    usuario: {
      email: user.email,
      papel: user.papel,
      referencia_id: user.referencia_id,
    },
  });
}