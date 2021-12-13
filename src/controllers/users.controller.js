/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const sha1 = require('sha1');
const db = require('../config/database');

// ==> Método que adicionará um usuário ao banco de dados
exports.createUser = async (req, res) => {
  const {
    nome, email, senha, admin, clienteId,
  } = req.body;
  try {
    const insertQuery = 'INSERT INTO users (nome, email, senha, admin, cliente_id) VALUES (?, ?, ?, ?, ?)';
    db.execute(insertQuery,
      [nome, email, sha1(senha), admin, clienteId],
      (err, results) => {
        if (err || results.affectedRows === 0) {
          res.status(500).send({
            developMessage: err.message,
            userMessage: 'Falha ao criar o Usuário.',
          });
          return false;
        }
        res.status(201).send({
          message: 'Usuário criado com sucesso!',
          affectedRows: results.affectedRows,
        });
      });
  } catch (error) {
    console.error('createUser', error);
    res.status(500).send({ message: 'Ocorreu um erro ao criar o Usuário.' });
  }
};

// ==> Método que atualizará um usuário específico
exports.updateUser = async (req, res) => {
  const {
    nome, email, senha, admin, clienteId, id,
  } = req.body;
  try {
    const updateQuery = 'UPDATE users SET nome = ?, email = ?, senha = ?, admin = ?, cliente_id = ? WHERE id = ?';
    db.execute(updateQuery,
      [nome, email, sha1(senha), admin, clienteId],
      (err, results) => {
        if (err) {
          res.status(500).send({
            developMessage: err.message,
            userMessage: 'Falha ao atualizar o Usuário.',
          });
          return false;
        }
        res.status(201).send({
          message: 'Usuário atualizado com sucesso!',
          user: {
            id, nome, email,
          },
          affectedRows: results.affectedRows,
        });
      });
  } catch (error) {
    console.error('updateUser', error);
    res.status(500).send({ message: 'Ocorreu um erro ao atualizar o Usuário.' });
  }
};

// ==> Método que deletará um usuário específico
exports.deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    db.execute('DELETE FROM users WHERE id = ?',
      [id], (err, results) => {
        if (err) {
          res.status(500).send({
            developMessage: err.message,
            userMessage: 'Falha ao deletar o Usuário.',
          });
          return false;
        }
        res.status(200).send({
          message: 'Usuário excluído com sucesso!',
          affectedRows: results.affectedRows,
        });
      });
  } catch (error) {
    console.error('deleteUser', error);
    res.status(500).send({ message: 'Ocorreu um erro ao excluir o Usuário.' });
  }
};

// ==> Método que listará todos os usuário
exports.listAllUsers = async (req, res) => {
  try {
    db.execute('SELECT id, nome, email, admin, cliente_id FROM users', (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.message,
          userMessage: 'Falha ao listar os Usuários.',
        });
        return false;
      }
      res.status(200).send({ users: results });
    });
  } catch (error) {
    console.error('listAllUsers', error);
    res.status(500).send({ message: 'Ocorreu um erro ao listar os usuários.' });
  }
};

// ==> Método que listará um cliente específico
exports.listOneUser = async (req, res) => {
  try {
    db.execute('SELECT id, nome, email, admin, cliente_id FROM users WHERE id = ?', [req.params.id], (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.message,
          userMessage: 'Falha ao listar o Usuário.',
        });
        return false;
      }
      res.status(200).send({ user: results });
    });
  } catch (error) {
    console.error('listOneUser', error);
    res.status(500).send({ message: 'Ocorreu um erro ao listar o usuário.' });
  }
};
