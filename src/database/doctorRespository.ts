import { db } from "./index"


export function createDoctor(
  especialidade: string,
  crm: string,
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
    INSERT INTO Medico (
      especialidade, crm, nome, cpf, data_nascimento, sexo,
      estado_civil, telefone, nome_pai, nome_mae
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const info = stmt.run(
    especialidade,
    crm,
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


export function getAllDoctors() {
  const stmt = db.prepare('SELECT * FROM Medico')
  return stmt.all()
}


export function getDoctorByCPF(cpf: string) {
  const stmt = db.prepare('SELECT * FROM Medico WHERE cpf = @cpf')
  return stmt.get({ cpf })
}


export function deleteDoctorByCpf(cpf: string) {
  const stmt = db.prepare('DELETE FROM Medico WHERE cpf = ?')
  const info = stmt.run(cpf)
  return info.changes
}


export function deleteDoctorById(id: number) {
  const stmt = db.prepare('DELETE FROM Medico WHERE medico_id = ?')
  const info = stmt.run(id)
  return info.changes
}