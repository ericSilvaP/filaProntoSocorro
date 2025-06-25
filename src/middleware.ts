import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const role = request.cookies.get('userRole')?.value
  const pathname = request.nextUrl.pathname

  // Defina rotas públicas que não devem ser protegidas
  const publicPaths = ['/', '/login', '/api/login', '/favicon.ico']

  // Se estiver em rota pública, deixa passar
  if (!publicPaths.includes(pathname) && !role) {
    return NextResponse.redirect(new URL("/login", request.url)) // volta pro login
  }

  return NextResponse.next()
}

// Protege todas as rotas exceto as públicas definidas
// Melhor deixar rodar apenas nas rotas privadas para evitar overhead
export const config = {
  matcher: ['/painel/:path*', '/admin/:path*'], 
}