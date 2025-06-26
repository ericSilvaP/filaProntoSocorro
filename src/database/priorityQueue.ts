import { db } from "./index"

// Inserção
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

export function deletePatientFromPriorityQueue(paciente_id: number) {
  const stmt = db.prepare(`
    DELETE FROM FilaDePrioridade WHERE paciente_id = ?
  `);
  const info = stmt.run(paciente_id);
  return info.changes;
}

export function deletePatientFromPriorityQueueByCpf(cpf: string) {
  const paciente = db.prepare(`
    SELECT id FROM Paciente WHERE cpf = ?
  `).get(cpf) as { id: number } | undefined;

  if (!paciente) {
    throw new Error("Paciente com o CPF informado não encontrado.");
  }

  const stmt = db.prepare(`
    DELETE FROM FilaDePrioridade 
    WHERE paciente_id = (
      SELECT id FROM Paciente WHERE cpf = ?
    )
  `)
  const info = stmt.run(cpf)
  return info.changes
}