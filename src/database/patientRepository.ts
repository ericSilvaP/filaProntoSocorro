import { db } from "./index";


export function registerPatient(
  name: string, 
  
  cardSus: number, 
  cpf: number, 
  birthDate: string, 
  bloodType: string, 
  sex: string, 
  maritalStatus: string, 
  phone: string,
  nameFather?: string,
  nameMother?: string,
) {
  const stmt = db.prepare(
    'INSERT INTO Paciente (name, cardSus, cpf, birthDate, bloodType, sex, maritalStatus, phone, nameFather, nameMother) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  );

  const info = stmt.run(
    name,
    cardSus,
    cpf,
    birthDate,
    bloodType,
    sex,
    maritalStatus,
    phone,
    nameFather ?? null,
    nameMother ?? null
  );

  return info.lastInsertRowid;
}

export function getAllPatients() {
  const stmt = db.prepare('SELECT * FROM Paciente');
  return stmt.all();
}

export function getPatientByCpf(cpf: number) {
  const stmt = db.prepare('SELECT * FROM Paciente WHERE cpf = @cpf');
  return stmt.get({ cpf });
}

export function deletePatientById(id: number) {
  const stmt = db.prepare('DELETE FROM Paciente WHERE paciente_id = ?')
  const info = stmt.run(id)
  return info.changes
}

export function deletePatientByCpf(cpf: number) {
  const stmt = db.prepare('DELETE FROM Paciente WHERE cpf = ?')
  const info = stmt.run(cpf)
  return info.changes
}