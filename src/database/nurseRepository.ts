import { db } from "./index"

export function createNurse(
  coren: string,
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
    INSERT INTO Enfermeira (
      coren, nome, cpf, data_nascimento, sexo,
      estado_civil, telefone, nome_pai, nome_mae
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const info = stmt.run(
    coren,
    nome,
    cpf,
    data_nascimento,
    sexo,
    estado_civil,
    telefone,
    nome_pai ?? null,
    nome_mae ?? null
  );

  return info.lastInsertRowid;
}

export function getAllNurses() {
  const stmt = db.prepare('SELECT * FROM Enfermeira')
  const resp = stmt.all()
  return resp 
}

export function getNurseByCPF(cpf: string) {
  const stmt = db.prepare('SELECT * FROM Enfermeira WHERE cpf = @cpf')
  return stmt.get({ cpf })
}

export function deleteNurseById(id: number) {
  const stmt = db.prepare('DELETE FROM Enfermeira WHERE enfermeira_id = ?')
  const info = stmt.run(id)
  return info.changes
}

export function deleteNurseByCpf(cpf: string) {
  const stmt = db.prepare('DELETE FROM Enfermeira WHERE cpf = ?')
  const info = stmt.run(cpf)
  return info.changes 
}
