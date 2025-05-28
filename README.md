# 🏥 Fila de Pronto Socorro

<p align="center">
  <img src="https://img.shields.io/github/languages/top/ericSilvaP/filaProntoSocorro" />
  <img src="https://img.shields.io/github/commit-activity/m/ericSilvaP/filaProntoSocorro" />
  <img src="https://img.shields.io/github/repo-size/ericSilvaP/filaProntoSocorro" />
  <img src="https://img.shields.io/github/license/ericSilvaP/filaProntoSocorro" />
  <img src="https://img.shields.io/github/last-commit/ericSilvaP/filaProntoSocorro" />
</p>

Sistema de triagem hospitalar para gerenciamento de atendimentos em prontos-socorros, com foco em priorização dinâmica de pacientes e análise de desempenho.

Projeto integrador do Bloco 2 do curso de **Tecnólogo em Sistemas de Computação (TSC)** na **UESPI**.

---

## 🎓 Disciplinas envolvidas

- **Banco de Dados** – Prof. Rocha  
- **Estruturas de Dados** – Prof. Dario  
- **Programação Orientada a Objetos (POO)** – Prof. Eyder Rios

## 📋 Funcionalidades

* Definição de número de filas operando
* Cadastro de pacientes pela recepção
* Atribuição de triagem ao atendimento por enfermeiros
* Fila de prioridade de atendimentos com base no risco da triagem atribuída
* Atribuição de consultas por médicos
* Registro completo de atendimentos
* Geração de métricas de desempenho

## 🧰 Tecnologias utilizadas

* TypeScript
* Express
* Next
* MySQL

## 🚀 Como executar o projeto

> Requisitos: Node.js 18+ e TypeScript instalados globalmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/ericSilvaP/filaProntoSocorro.git
   cd filaProntoSocorro
   ```

2. Instale as dependências:

   ```bash
   npm install ts-node
   ```

3. Execute o projeto:

   ```bash
   npm run dev
   ```

> Obs: O banco de dados será integrado nas próximas versões.

## 📈 Melhorias futuras

* Integração com banco de dados PostgreSQL
* Interface gráfica para uso em tempo real por hospitais
* API REST para comunicação com front-end
* Autenticação de usuários por cargo (médico, enfermeiro, recepcionista)
* Dashboard com gráficos e relatórios

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## 🧑‍💻 Autor

Desenvolvido por [Eric Silva](https://github.com/ericSilvaP)
