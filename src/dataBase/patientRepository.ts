import { db } from "..";


export function registerPatient(name: string, nameFather: string, nameMother: string, cardSus: number, cpf: number, birthDate: string, bloodType: string, sex: string, maritalStatus: string, phone: string) 
{
  const stmt = db.prepare(
    'INSERT INTO Paciente (name, nameFather, nameMother, cardSus, cpf, birthDate, bloodType, sex, maritalStatus, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
  
  const info = stmt.run(name, nameFather, nameMother, cardSus, cpf, birthDate, bloodType, sex, maritalStatus, phone);

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