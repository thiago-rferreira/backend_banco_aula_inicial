// Importação do framework Express para facilitar a criação de APIs web em Node.js
const express = require('express');

// Importação do módulo Pool do pacote 'pg' para criar um pool de conexões com o PostgreSQL
const { Pool } = require('pg');

// Criação de uma instância do aplicativo Express
const app = express();

// Definição da porta do servidor, utilizando a variável de ambiente PORT ou, se não definida, a porta 3000
const PORT = process.env.PORT || 3000;

// Middleware para permitir o parsing de JSON nas requisições
app.use(express.json());

// Configuração do pool de conexão com o PostgreSQL, especificando dados de acesso ao banco de dados
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'aula',
  password: 'ds564',
  port: 5432, // Porta padrão do PostgreSQL
});

// Rota para adicionar um usuário ao banco de dados
app.post('/usuarios', async (req, res) => {
  try {
    // Extrai os dados do corpo da requisição
    const { nome, email } = req.body;
    
    // Executa uma query SQL para inserir um novo usuário no banco de dados utilizando os dados da requisição
    await pool.query('INSERT INTO usuarios (nome, email) VALUES ($1, $2)', [nome, email]);
    
    // Retorna uma resposta de sucesso com o código HTTP 201
    res.status(201).send({ mensagem: 'Usuário adicionado com sucesso'});
  } catch (error) {
    // Em caso de erro, loga o erro e retorna uma resposta de erro com o código HTTP 500
    console.error('Erro ao adicionar usuário:', error);
    res.status(500).send('Erro ao adicionar usuário');
  }
});

// Rota para obter todos os usuários do banco de dados
app.get('/usuarios', async (req, res) => {
  try {
    // Executa uma query SQL para selecionar todos os usuários no banco de dados
    const result = await pool.query('SELECT * FROM usuarios');
    
    // Retorna uma resposta com os usuários encontrados e o número total de usuários
    res.json({
      total: result.rowCount,
      usuarios: result.rows,
    });
  } catch (error) {
    // Em caso de erro, loga o erro e retorna uma resposta de erro com o código HTTP 500
    console.error('Erro ao obter usuários:', error);
    res.status(500).send('Erro ao obter usuários');
  }
});

// Rota para atualizar um usuário no banco de dados
app.put('/usuarios/:id', async (req, res) => {
  try {
    // Extrai o ID do usuário a ser atualizado dos parâmetros da URL
    const { id } = req.params;
    
    // Extrai os novos dados do usuário do corpo da requisição
    const { nome, email } = req.body;
    
    // Executa uma query SQL para atualizar o usuário no banco de dados com os novos dados
    await pool.query('UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3', [nome, email, id]);
    
    // Retorna uma resposta de sucesso com o código HTTP 200
    res.status(200).send({ mensagem: 'Usuário atualizado com sucesso'});
  } catch (error) {
    // Em caso de erro, loga o erro e retorna uma resposta de erro com o código HTTP 500
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).send('Erro ao atualizar usuário');
  }
});

// Rota para excluir um usuário do banco de dados
app.delete('/usuarios/:id', async (req, res) => {
  try {
    // Extrai o ID do usuário a ser excluído dos parâmetros da URL
    const { id } = req.params;
    
    // Executa uma query SQL para excluir o usuário do banco de dados
    await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
    
    // Retorna uma resposta de sucesso com o código HTTP 200
    res.status(200).send({ mensagem: 'Usuário excluído com sucesso'});
  } catch (error) {
    // Em caso de erro, loga o erro e retorna uma resposta de erro com o código HTTP 500
    console.error('Erro ao excluir usuário:', error);
    res.status(500).send('Erro ao excluir usuário');
  }
});

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
