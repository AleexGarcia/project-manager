# 📝 API Gerenciador de Projetos
Uma API RESTful para gerenciar projetos pessoais. Com essa API, você pode criar, ler, atualizar e excluir projetos. Cada projeto possui título, descrição e status, e você pode filtrar os projetos pelo status.

## 🚀 Funcionalidades
Criar um novo projeto: Adicione projetos com título, descrição e status.

- Listar todos os projetos: Veja todos os projetos cadastrados.

- Buscar um projeto por ID: Veja os detalhes de um projeto específico.

- Atualizar um projeto: Edite o título, descrição ou status de um projeto existente.

- Excluir um projeto: Apague um projeto do banco de dados.

## 🛠 Tecnologias Usadas
- Node.js: Ambiente de execução JavaScript no servidor.

- Express: Framework para construção de APIs.

- MongoDB: Banco de dados NoSQL.

- Mongoose: Biblioteca para modelar dados MongoDB em Node.js.

- TypeScript: Superset do JavaScript com tipagem estática.

- dotenv: Gerenciamento de variáveis de ambiente.

## 📋 Requisitos
Node.js (versão 14 ou superior)

MongoDB rodando localmente ou acesso a um cluster MongoDB remoto (ex: MongoDB Atlas)

## 🧰 Como rodar o projeto
1. Clonar o repositório

git clone https://github.com/seu-usuario/project-api.git
cd project-api

2. Instalar as dependências

npm install
3. Configurar as variáveis de ambiente
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/projectdb
```
PORT: A porta onde o servidor irá rodar.

MONGO_URI: A URL do seu banco de dados MongoDB.

1. Rodar o servidor

npm run dev
O servidor será iniciado na porta 3000 (ou a porta definida em .env). Agora você pode fazer requisições à API.

## 🧑‍💻 Endpoints da API
1. Listar todos os projetos
Método: GET

Rota: /api/projects

Descrição: Retorna todos os projetos cadastrados.

Exemplo de resposta:

```json
[
  {
    "_id": "12345",
    "title": "Meu primeiro projeto",
    "description": "Descrição do projeto.",
    "status": "In Progress",
    "createdAt": "2025-04-09T12:34:56.789Z"
  },
  {
    "_id": "67890",
    "title": "Outro projeto",
    "description": "Descrição do segundo projeto.",
    "status": "Completed",
    "createdAt": "2025-04-10T15:42:10.123Z"
  }
]
```
1. Criar um novo projeto
Método: POST

Rota: /api/projects

Corpo da requisição:

```json
{
  "title": "Novo Projeto",
  "description": "Descrição do novo projeto.",
  "status": "Planned"
}
```
Exemplo de resposta:
```json
{
  "_id": "abcdef123456",
  "title": "Novo Projeto",
  "description": "Descrição do novo projeto.",
  "status": "Planned",
  "createdAt": "2025-04-10T17:00:00.000Z"
}
```
1. Buscar um projeto por ID
Método: GET

Rota: /api/projects/:id

Descrição: Retorna os detalhes de um projeto específico.

Exemplo de resposta:

```json
{
  "_id": "12345",
  "title": "Meu primeiro projeto",
  "description": "Descrição do projeto.",
  "status": "In Progress",
  "createdAt": "2025-04-09T12:34:56.789Z"
}
```
1. Atualizar um projeto
Método: PUT

Rota: /api/projects/:id

Corpo da requisição:

```json
{
  "title": "Projeto Atualizado",
  "description": "Descrição atualizada.",
  "status": "Completed"
}```

Exemplo de resposta:

```json
{
  "_id": "12345",
  "title": "Projeto Atualizado",
  "description": "Descrição atualizada.",
  "status": "Completed",
  "createdAt": "2025-04-09T12:34:56.789Z"
}```

1. Excluir um projeto
Método: DELETE

Rota: /api/projects/:id

Descrição: Remove o projeto especificado.

Exemplo de resposta:

```json
{
  "message": "Projeto deletado com sucesso"
}
```
## 💡 Estrutura do Projeto

src/

models/: Contém os esquemas e modelos do Mongoose.

controllers/: Lógica de manipulação de dados e controle de rotas.

routes/: Define as rotas e os controladores que elas utilizam.

config/: Configurações como a conexão com o banco de dados.

index.ts: Ponto de entrada da aplicação, onde o servidor Express é inicializado.

## 🚧 Melhorias Futuras

Autenticação: Implementar autenticação usando JWT (JSON Web Tokens) para proteger as rotas.

Validação: Validar dados de entrada com Joi ou express-validator.

Deploy: Deploy no Heroku ou Vercel.

Testes: Adicionar testes unitários com Jest ou Mocha.

Swagger: Documentação da API com Swagger.

## 📜 Licença

Este projeto é licenciado sob a MIT License.

🛠 Contribuindo
Se você deseja contribuir para este projeto, faça um fork deste repositório, crie uma nova branch para suas alterações, e então envie um pull request.

