import { db } from "./index"

export function insertInPriorityQueue(
  id: number,
  patientId: number,
  riskRatingId: number
) {
  const stmt = db.prepare(`
    INSERT INTO FilaDePrioridade (
      atendimento_id, paciente_id, 
      classificacao_risco_id
    ) VALUES (?, ?, ?)
  `)

  const info = stmt.run(
    id,
    patientId,
    riskRatingId
  )
  return info.lastInsertRowid
}

export function getPriorityQueue() {
  const stmt = db.prepare(
    'SELECT * FROM FilaDePrioridade'
  );
  return stmt.all();
}

export function deletePatientFromPriorityQueue(patientId: number) {
  const stmt = db.prepare('DELETE FROM FilaDePrioridade WHERE paciente_id = ?')
  const info = stmt.run(patientId)
  return info.changes
}