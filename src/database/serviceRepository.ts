import { db } from "./index";

export function registerService(
  paciente_id: number, 
  consulta_id: number,
  recepcionista_id: number,
  inicio: string,
  fim: string
) {
  const stmt = db.prepare(`
    INSERT INTO Atendimento (
      paciente_id, 
      consulta_id,
      recepcionista_id,
      inicio,
      fim
    ) VALUES (?, ?, ?, ?, ?)
  `);

  const info = stmt.run(
    paciente_id,
    consulta_id,
    recepcionista_id,
    inicio,
    fim
  );

  return info.lastInsertRowid;
}


export function updateAvaliacaoClinica(
  atendimento_id: number,
  avaliacao_clinica_id: number
) {
  const stmt = db.prepare(`
    UPDATE Atendimento
    SET avaliacao_clinica_id = ?
    WHERE id = ?
  `);

  const result = stmt.run(avaliacao_clinica_id, atendimento_id);

  return result.changes;
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