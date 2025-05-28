# 🏥 Fila de Pronto Socorro

Sistema de triagem hospitalar para gerenciamento de atendimentos em prontos-socorros, com foco em priorização dinâmica de pacientes e análise de desempenho.

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

2. Instale as dependências (se houver):

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

## 🧑‍💻 Autor

Desenvolvido por [Eric Silva](https://github.com/ericSilvaP)
