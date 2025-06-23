import { db } from "."

export function createRecepcionista(
  nome: string,
  cpf: string,
  data_nascimento: string,
  sexo: string,
  estado_civil: string,
  telefone: string,
  nome_pai?: string,
  nome_mae?: string
) {
  const stmt = db.prepare(`
    INSERT INTO Recepcionista (
      nome, cpf, data_nascimento, sexo,
      estado_civil, telefone, nome_pai, nome_mae
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const info = stmt.run(
    nome,
    cpf,
    data_nascimento,
    sexo,
    estado_civil,
    telefone,
    nome_pai ?? null,
    nome_mae ?? null
  )

  return info.lastInsertRowid
}

export function getAllRecepcionistas() {
  const stmt = db.prepare('SELECT * FROM Recepcionista')
  return stmt.all()
}

export function getRecepcionistaByCPF(cpf: string) {
  const stmt = db.prepare('SELECT * FROM Recepcionista WHERE cpf = @cpf')
  return stmt.get({ cpf })
}

export function deleteRecepcionistaByCpf(cpf: string) {
  const stmt = db.prepare('DELETE FROM Recepcionista WHERE cpf = ?')
  const info = stmt.run(cpf)
  return info.changes
}

export function deleteRecepcionistaById(id: number) {
  const stmt = db.prepare('DELETE FROM Recepcionista WHERE recepcionista_id = ?')
  const info = stmt.run(id)
  return info.changes
}
