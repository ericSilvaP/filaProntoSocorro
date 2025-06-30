import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logout bem sucedido!" })

  response.cookies.delete("userRole")

  return response
}