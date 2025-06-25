import { db } from "./index";

export function registerService(
  atendimento_id: number, 
  paciente_id: number, 
  classificacao_risco_id: number
) {
  const stmt = db.prepare(`
    INSERT INTO Atendimento (
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