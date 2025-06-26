import { db } from "./index"

export function insertInPriorityQueue(
  atendimento_id: number,
  paciente_id: number,
) {
  const stmt = db.prepare(`
    INSERT INTO FilaDePrioridade (
      atendimento_id, paciente_id 
    ) VALUES (?, ?)
  `);

  const info = stmt.run(
    atendimento_id,
    paciente_id
  );
  return info.lastInsertRowid;
}

export function updatePriorityInQueue(
  atendimento_id: number,
  prioridade: number
) {
  const stmt = db.prepare(`
    UPDATE Atendimento
    SET prioridade = ?
    WHERE id = ?
  `);

  const result = stmt.run(prioridade, atendimento_id);

  return result.changes;
}


export function getAllService() {
  const stmt = db.prepare(
    'SELECT * FROM Atendimento'
  );
  return stmt.all();
}

export function getPriorityQueue() {
  const stmt = db.prepare(
    'SELECT * FROM FilaDePrioridade'
  );
  return stmt.all();
}

export function getPatientPriorityQueueAtnId(paciente_id: number) {
  const stmt = db.prepare(
    'SELECT * FROM FilaDePrioridade WHERE paciente_id = ?'
  );
  return stmt.all(paciente_id);
}

export function deletePatientFromPriorityQueue(paciente_id: number) {
  const stmt = db.prepare(`
    DELETE FROM FilaDePrioridade WHERE paciente_id = ?
  `);
  const info = stmt.run(paciente_id);
  return info.changes;
}
