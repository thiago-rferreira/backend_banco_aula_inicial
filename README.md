# API de Gerenciamento de Usuários com PostgreSQL e Express - Aula inicial

Este é um exemplo de uma API web construída com Node.js, Express e PostgreSQL para gerenciar usuários. A API permite a criação, leitura, atualização e exclusão (CRUD) de usuários em um banco de dados PostgreSQL.

## Configuração do Ambiente

Certifique-se de ter o Node.js e o PostgreSQL instalados em sua máquina.

1. Instale as dependências do projeto:
npm install express pg


2. Configure as variáveis de ambiente:
- `PORT`: Porta em que o servidor será executado.
- Dados de acesso ao banco de dados PostgreSQL (`user`, `host`, `database`, `password`, `port`).

## Criando o Banco de Dados

1 . Antes de iniciar o servidor, é necessário criar o banco de dados no PostgreSQL. Você pode fazer isso executando os comandos no console do PostgreSQL ou em uma ferramenta de administração:
- Os comandos encontram-se dentro da pasta db, no arquivo script.sql.

### Aviso Importante

Os dados de acesso ao banco de dados estão expostos neste projeto, pois é destinado a fins educacionais como projeto de estudo para alunos. Certifique-se de não utilizar informações sensíveis neste contexto.

## Endpoints

- **POST /usuarios**: Adiciona um novo usuário.
- Corpo da requisição: `{ "nome": "Nome do Usuário", "email": "email@exemplo.com" }`

- **GET /usuarios**: Retorna todos os usuários.
- Resposta: `{ "total": 3, "usuarios": [...] }`

- **PUT /usuarios/:id**: Atualiza um usuário existente.
- Parâmetros da URL: `id` do usuário.
- Corpo da requisição: `{ "nome": "Novo Nome", "email": "novoemail@exemplo.com" }`

- **DELETE /usuarios/:id**: Exclui um usuário existente.
- Parâmetros da URL: `id` do usuário.

## Execução

Para iniciar o servidor, execute:
node nome-do-arquivo.js


O servidor será iniciado na porta especificada.

Certifique-se de substituir `nome-do-arquivo.js` pelo nome do arquivo onde o código está localizado.

