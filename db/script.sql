-- Criação do banco de dados 'aula'
CREATE DATABASE aula;

-- Conecta ao banco de dados 'aula'
\c aula;

-- Criação da tabela 'usuarios'
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);
