import { db } from "./index";

export function registerService(
  paciente_id: number, 
  recepcionista_id: number,
) {
  const stmt = db.prepare(`
    INSERT INTO Atendimento (
      paciente_id, 
      recepcionista_id,
      status,
      inicio
    ) VALUES (?, ?, ?, ?)
  `);

  const now = new Date()
  now.setHours(now.getHours() - 3) // ajusta UTC-3

  const sqlNowDate = now.toISOString().slice(0, 19).replace("T", " ")

  const info = stmt.run(
    paciente_id,
    recepcionista_id,
    0,
    sqlNowDate
  )
  return info.lastInsertRowid
}


export function updateAvaliacaoClinica(
  atendimento_id: number,
  avaliacao_clinica_id: number
) {
  const stmt = db.prepare(`
    UPDATE Atendimento
    SET avaliacao_clinica_id = ?
    WHERE atendimento_id = ?
  `)

  const result = stmt.run(avaliacao_clinica_id, atendimento_id)

  return result.changes
}

export function updateStatus(
  atendimento_id: number,
  status: number
) {
  const stmt = db.prepare(`
    UPDATE Atendimento
    SET status = ?
    WHERE atendimento_id = ?
  `)

  const result = stmt.run(status, atendimento_id)

  return result.changes
}

export function getAllService() {
  const stmt = db.prepare(
    'SELECT * FROM Atendimento'
  );
  return stmt.all();
}

export function getServiceByAtendimentoId(atendimento_id: number) {
  const stmt = db.prepare(`
    SELECT * FROM Atendimento WHERE atendimento_id = ?
  `);
  return stmt.get(atendimento_id);
}

export function removePatientFromService(paciente_id: number) {
  const stmt = db.prepare(`
    DELETE FROM Atendimento WHERE paciente_id = ?
  `);
  const info = stmt.run(paciente_id);
  return info.changes;
}