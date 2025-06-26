import { db } from "./index";

export function registerService(
  paciente_id: number, 
  recepcionista_id: number,
) {
  const stmt = db.prepare(`
    INSERT INTO Atendimento (
      paciente_id, 
      recepcionista_id,
      inicio
    ) VALUES (?, ?, ?)
  `);

  const sqlNowDate = new Date().toISOString().slice(0, 19).replace("T", " ");

  const info = stmt.run(
    paciente_id,
    recepcionista_id,
    sqlNowDate
  );
  return info.lastInsertRowid;
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