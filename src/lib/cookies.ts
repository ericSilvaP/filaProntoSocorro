import { NextResponse } from "next/server";

export function setCookie(response: NextResponse, name: string, value: string | number) {
  response.cookies.set(name, value.toString(), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 2,
  });
}
