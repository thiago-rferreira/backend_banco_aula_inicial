const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Configuração do pool de conexão com o PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'aula',
  password: 'ds564',
  port: 5432, // Porta padrão do PostgreSQL
});

// Rota para adicionar um usuário
app.post('/usuarios', async (req, res) => {
  try {
    const { nome, email } = req.body;
    await pool.query('INSERT INTO usuarios (nome, email) VALUES ($1, $2)', [nome, email]);
    res.status(201).send({ mensagem: 'Usuário adicionado com sucesso'});
  } catch (error) {
    console.error('Erro ao adicionar usuário:', error);
    res.status(500).send('Erro ao adicionar usuário');
  }
});

// Rota para obter todos os usuários
app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json({
        total: result.rowCount,
        usuarios: result.rows,
    });
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    res.status(500).send('Erro ao obter usuários');
  }
});

// Rota para atualizar um usuário
app.put('/usuarios/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, email } = req.body;
      await pool.query('UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3', [nome, email, id]);
      res.status(200).send({ mensagem: 'Usuário atualizado com sucesso'});
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).send('Erro ao atualizar usuário');
    }
  });
  
  // Rota para excluir um usuário
  app.delete('/usuarios/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
      res.status(200).send({ mensagem: 'Usuário excluído com sucesso'});
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      res.status(500).send('Erro ao excluir usuário');
    }
  });
  
  // Rota para obter um usuário por ID
app.get('/usuarios/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
      if (result.rowCount === 0) {
        res.status(404).send({ mensagem: 'Usuário não encontrado' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (error) {
      console.error('Erro ao obter usuário por ID:', error);
      res.status(500).send('Erro ao obter usuário por ID');
    }
  });
  
  
// Inicie o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


//como instalar o nodemon
//npm install -g nodemon
//nodemon index.js
