import Database from "better-sqlite3";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

const dbPath = join(__dirname, "PI.db");

export const db = new Database(dbPath);
console.log("Banco conectado:", dbPath);
