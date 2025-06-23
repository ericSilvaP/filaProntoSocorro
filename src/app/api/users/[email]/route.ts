import { getUserByEmail } from "@/database/userRepository";
import { NextResponse } from "next/server";


export async function GET(
  _req: Request,
  { params }: { params: { email: string }}
) {
  const email = decodeURIComponent(params.email)
  const user = getUserByEmail(email)

  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 })

  return NextResponse.json(user)
}