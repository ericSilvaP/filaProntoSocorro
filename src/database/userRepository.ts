import { db } from "."

export function createUser(email: string, password: string, role: string, reference_id: number) {
  const stmt = db.prepare('INSERT INTO Usuario (email, senha, papel, referencia_id) VALUES (?, ?, ?, ?)')
  const info = stmt.run(email, password, role, reference_id)
  return info.lastInsertRowid
}

export function getAllUsers() {
  const stmt = db.prepare('SELECT * FROM Usuario')
  const resp = stmt.all()
  return resp 
}

export function getUserByEmail(email: string) {
  const stmt = db.prepare('SELECT * FROM Usuario WHERE email = @email')
  return stmt.get({ email })
}
