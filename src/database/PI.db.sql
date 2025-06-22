BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "Atendimento" (
	"atendimento_id" INTEGER PRIMARY KEY AUTOINCREMENT,
	"paciente_id" INTEGER NOT NULL,
	"consulta_id" INTEGER,
	"recepcionista_id" INTEGER NOT NULL,
	"avaliacao_clinica_id" INTEGER,
	"inicio" DATETIME NOT NULL,
	"fim" DATETIME,
	FOREIGN KEY("avaliacao_clinica_id") REFERENCES "AvaliacaoClinica"("avaliacao_clinica_id"),
	FOREIGN KEY("consulta_id") REFERENCES "Consulta"("consulta_id"),
	FOREIGN KEY("paciente_id") REFERENCES "Paciente"("paciente_id"),
	FOREIGN KEY("recepcionista_id") REFERENCES "Recepcionista"("recepcionista_id")
);

CREATE TABLE IF NOT EXISTS "AvaliacaoClinica" (
	"avaliacao_clinica_id" INTEGER PRIMARY KEY AUTOINCREMENT,
	"atendimento_id" INTEGER NOT NULL,
	"classificacao_risco_id" INTEGER NOT NULL,
	"pressao_arterial" VARCHAR(10) NOT NULL,
	"frequencia_cardiaca" INTEGER NOT NULL,
	"frequencia_respiratoria" INTEGER NOT NULL,
	"temperatura" INTEGER NOT NULL,
	"saturacao_oxigenio" INTEGER NOT NULL,
	"nivel_dor" INTEGER NOT NULL,
	FOREIGN KEY("classificacao_risco_id") REFERENCES "ClassificacaoDeRisco"("classificacao_risco_id"),
	FOREIGN KEY("atendimento_id") REFERENCES "Atendimento"("atendimento_id")
);

CREATE TABLE IF NOT EXISTS "ClassificacaoDeRisco" (
	"classificacao_risco_id" INTEGER PRIMARY KEY AUTOINCREMENT,
	"cor" VARCHAR(20) NOT NULL,
	"prioridade" INTEGER NOT NULL CHECK(prioridade IN (0, 1, 2, 3, 4)),
	"tempo_max_espera_segundos" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "Consulta" (
	"consulta_id" INTEGER PRIMARY KEY AUTOINCREMENT,
	"medico_id" INTEGER NOT NULL,
	"inicio" DATETIME NOT NULL,
	"fim" DATETIME,
	"diagnostico" TEXT,
	FOREIGN KEY("medico_id") REFERENCES "Medico"("medico_id")
);

CREATE TABLE IF NOT EXISTS "Enfermeira" (
	"enfermeira_id" INTEGER PRIMARY KEY AUTOINCREMENT,
	"coren" VARCHAR(7) NOT NULL,
	"nome" VARCHAR(100) NOT NULL,
	"cpf" CHAR(11) NOT NULL,
	"data_nascimento" DATE NOT NULL,
	"sexo" CHAR(1) NOT NULL,
	"estado_civil" VARCHAR(30),
	"telefone" VARCHAR(15) NOT NULL,
	"nome_pai" VARCHAR(100),
	"nome_mae" VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS "Medico" (
	"medico_id" INTEGER PRIMARY KEY AUTOINCREMENT,
	"especialidade" VARCHAR(200) NOT NULL,
	"crm" CHAR(10) NOT NULL,
	"nome" VARCHAR(100) NOT NULL,
	"cpf" CHAR(11) NOT NULL,
	"data_nascimento" DATE NOT NULL,
	"sexo" CHAR(1) NOT NULL,
	"estado_civil" VARCHAR(30),
	"telefone" VARCHAR(15) NOT NULL,
	"nome_pai" VARCHAR(100),
	"nome_mae" VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS "Paciente" (
	"paciente_id" INTEGER PRIMARY KEY AUTOINCREMENT,
	"nome" VARCHAR(100) NOT NULL,
	"nome_pai" VARCHAR(100),
	"nome_mae" VARCHAR(100),
	"cartao_sus" CHAR(15),
	"cpf" CHAR(11) NOT NULL,
	"data_nascimento" DATE NOT NULL,
	"tipo_sanguineo" VARCHAR(3) CHECK(tipo_sanguineo IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
	"sexo" CHAR(1) NOT NULL,
	"estado_civil" VARCHAR(30) NOT NULL,
	"telefone" VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS "Recepcionista" (
	"recepcionista_id" INTEGER PRIMARY KEY AUTOINCREMENT,
	"nome" VARCHAR(100) NOT NULL,
	"cpf" CHAR(11) NOT NULL,
	"data_nascimento" DATE NOT NULL,
	"sexo" CHAR(1) NOT NULL,
	"estado_civil" VARCHAR(30),
	"telefone" VARCHAR(15) NOT NULL,
	"nome_pai" VARCHAR(100),
	"nome_mae" VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS "FilaDePrioridade" (
	"atendimento_id" INTEGER PRIMARY KEY,
	"paciente_id" INTEGER NOT NULL,
	"classificacao_risco_id" INTEGER NOT NULL,
	FOREIGN KEY ("atendimento_id") REFERENCES "Atendimento"("atendimento_id"),
	FOREIGN KEY ("paciente_id") REFERENCES "Paciente"("paciente_id"),
	FOREIGN KEY ("classificacao_risco_id") REFERENCES "ClassificacaoDeRisco"("classificacao_risco_id")
);

CREATE TABLE IF NOT EXISTS "Usuario" (
  "usuario_id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "email" VARCHAR(100) NOT NULL UNIQUE,
  "senha" TEXT NOT NULL, -- hash da senha
  "papel" TEXT NOT NULL CHECK (papel IN ('medico', 'enfermeira', 'recepcionista', 'admin')),
  "referencia_id" INTEGER NOT NULL
);

COMMIT;
