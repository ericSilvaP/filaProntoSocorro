import { db } from "./index";

export function registerClinicalAssessment(
  atendimento_id: number,
  classificacao_risco_id: number,
  pressao_arterial: string,
  frequencia_cardiaca: number,
  frequencia_respiratoria: number,
  temperatura: number,
  saturacao_oxigenio: number,
  nivel_dor: number,
) {
  const stmt = db.prepare(`
    INSERT INTO AvaliacaoClinica (
      atendimento_id, classificacao_risco_id, 
      pressao_arterial, frequencia_cardiaca, 
      frequencia_respiratoria, temperatura, 
      saturacao_oxigenio, nivel_dor
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(
    atendimento_id,
    classificacao_risco_id,
    pressao_arterial,
    frequencia_cardiaca,
    frequencia_respiratoria,
    temperatura,
    saturacao_oxigenio,
    nivel_dor
  );
  return info.lastInsertRowid;
}

export function getAllClinicalAssessment() {
  const stmt = db.prepare(
    'SELECT * FROM AvaliacaoClinica'
  );
  return stmt.all();
}

export function getClinicalAssessmentByAvaliacaoClinicaId(avaliacao_clinica_id: number) {
  const stmt = db.prepare(`
    SELECT * FROM AvaliacaoClinica WHERE avaliacao_clinica_id = ?
  `);
  return stmt.get(avaliacao_clinica_id);
}

export function getClinicalAssessmentByAtendimentoId(atendimento_id: number) {
  const stmt = db.prepare(`
    SELECT * FROM AvaliacaoClinica WHERE atendimento_id = ?
  `);
  return stmt.get(atendimento_id);
}

export function removeClinicalAssessmentByAvaliacaoClinicaId(avaliacao_clinica_id: number) {
  const stmt = db.prepare(`
    DELETE FROM AvaliacaoClinica WHERE avaliacao_clinica_id = ?
  `);
  const info = stmt.run(avaliacao_clinica_id);
  return info.changes;
}

export function removeClinicalAssessmentByAtendimentoId(atendimento_id: number) {
  const stmt = db.prepare(`
    DELETE FROM AvaliacaoClinica WHERE atendimento_id = ?
  `);
  const info = stmt.run(atendimento_id);
  return info.changes;
}