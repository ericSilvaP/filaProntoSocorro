import { db } from "./index";

export function registerPatient(
  nome: string, 
  cartao_sus: number, 
  cpf: string, 
  data_nascimento: string, 
  sexo: string, 
  estado_civil: string, 
  telefone: string,
  tipo_sanguineo?: string, 
  nome_pai?: string,
  nome_mae?: string,
) {
  const stmt = db.prepare(
    'INSERT INTO Paciente (nome, cartao_sus, cpf, data_nascimento, tipo_sanguineo, sexo, estado_civil, telefone, nome_pai, nome_mae) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  );

  const info = stmt.run(
    nome,
    cartao_sus,
    cpf,
    data_nascimento,
    tipo_sanguineo,
    sexo,
    estado_civil,
    telefone,
    nome_pai ?? null,
    nome_mae ?? null
  );

  return info.lastInsertRowid
}

export function getAllPatients() {
  const stmt = db.prepare('SELECT * FROM Paciente')
  return stmt.all()
}

export function getPatientByCpf(cpf: string) {
  const stmt = db.prepare('SELECT * FROM Paciente WHERE cpf = @cpf');
  return stmt.get({ cpf });
}

export function deletePatientById(id: number) {
  const stmt = db.prepare('DELETE FROM Paciente WHERE paciente_id = ?')
  const info = stmt.run(id)
  return info.changes
}

export function deletePatientByCpf(cpf: string) {
  const stmt = db.prepare('DELETE FROM Paciente WHERE cpf = ?')
  const info = stmt.run(cpf)
  return info.changes
}