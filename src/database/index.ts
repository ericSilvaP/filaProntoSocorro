// import Database from "better-sqlite3";
// import { dirname, join } from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

// const dbPath = join(__dirname, 'db.sqlite')
// export const db = new Database(dbPath)

// console.log(dbPath, __dirname)

// db.exec(`
//   CREATE TABLE IF NOT EXISTS Usuario (
//   usuario_id INTEGER PRIMARY KEY AUTOINCREMENT,
//   email VARCHAR(100) NOT NULL UNIQUE,
//   senha TEXT NOT NULL, -- hash da senha
//   papel TEXT NOT NULL CHECK (papel IN ('medico', 'enfermeira', 'recepcionista', 'admin')),
//   referencia_id INTEGER NOT NULL
// );
// `)

import Database from 'better-sqlite3'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dbPath = join(__dirname, 'PI.db')

export const db = new Database(dbPath)
console.log('Banco conectado:', dbPath)
