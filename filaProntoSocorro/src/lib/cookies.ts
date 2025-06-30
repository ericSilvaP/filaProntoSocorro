import { NextResponse } from "next/server";

export function setCookie(response: NextResponse, name: string, value: string | number) {
  response.cookies.set(name, value.toString(), {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 2,
  });
}

export function getCookie(name: string): string | undefined {
  const value = document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='));
  return value?.split('=')[1];
}