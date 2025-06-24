import { db } from "./index"

export function insertInPriorityQueue(
  atendimento_id: number,
  paciente_id: number,
  classificacao_risco_id: number
) {
  const stmt = db.prepare(`
    INSERT INTO FilaDePrioridade (
      atendimento_id, paciente_id, 
      classificacao_risco_id
    ) VALUES (?, ?, ?)
  `);

  const info = stmt.run(
    atendimento_id,
    paciente_id,
    classificacao_risco_id
  );
  return info.lastInsertRowid;
}

export function getPriorityQueue() {
  const stmt = db.prepare(
    'SELECT * FROM FilaDePrioridade'
  );
  return stmt.all();
}

export function getPriorityQueueByCpf(cpf: string) {
  const stmt = db.prepare(`
    'SELECT * FROM FilaDePrioridade 
    WHERE cpf = @cpf'
  `);
  return stmt.get({ cpf });
  
}

export function deletePatientFromPriorityQueue(patientId: number) {
  const stmt = db.prepare('DELETE FROM FilaDePrioridade WHERE paciente_id = ?')
  const info = stmt.run(patientId)
  return info.changes
}

export function deletePatientFromPriorityQueueByCpf(cpf: string) {
  const stmt = db.prepare(`
    DELETE FROM FilaDePrioridade 
    WHERE paciente_id = (
      SELECT id FROM Paciente WHERE cpf = ?
    )
  `)
  const info = stmt.run(cpf)
  return info.changes
}
