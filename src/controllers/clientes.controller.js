/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const db = require('../config/database');

exports.createCliente = async (req, res) => {
  const {
    nome, cnpj, endereco, email, cidade, estado, telefone, ativo,
  } = req.body;
  try {
    const insertQuery = 'INSERT INTO clientes (nome, cnpj, endereco, email, cidade, estado, telefone, ativo) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.execute(insertQuery,
      [nome, cnpj, endereco, email, cidade, estado, telefone, ativo],
      (err, results) => {
        if (err) {
          res.status(500).send({
            developMessage: err.sqlMessage,
            userMessage: 'Falha ao criar o Cliente.',
          });
          return false;
        }
        res.status(201).send({
          message: 'Cliente criado com sucesso!',
          cliente: {
            nome, cnpj, endereco, email, cidade, estado, telefone, ativo,
          },
          affectedRows: results.affectedRows,
        });
      });
  } catch (error) {
    console.error('createCliente', error);
    res.status(500).send({ message: 'Ocorreu um erro ao criar o Cliente.' });
  }
};

exports.updateCliente = async (req, res) => {
  const {
    nome, cnpj, endereco, email, cidade, estado, telefone, ativo, id,
  } = req.body;
  try {
    const updateQuery = 'UPDATE clientes SET nome = ?, cnpj = ?, endereco = ?, email = ?, cidade = ?, estado = ?, telefone = ?, ativo = ? WHERE id = ?';
    db.execute(updateQuery,
      [nome, cnpj, endereco, email, cidade, estado, telefone, ativo, id],
      (err, results) => {
        if (err) {
          res.status(500).send({
            developMessage: err.sqlMessage,
            userMessage: 'Falha ao atualizar o Cliente.',
          });
          return false;
        }
        res.status(201).send({
          message: 'Cliente atualizado com sucesso!',
          cliente: {
            id, nome, cnpj, endereco, email, cidade, estado, telefone, ativo,
          },
          affectedRows: results.affectedRows,
        });
      });
  } catch (error) {
    console.error('updateCliente', error);
    res.status(500).send({ message: 'Ocorreu um erro ao atualizar o Cliente.' });
  }
};

exports.deleteCliente = async (req, res) => {
  const { id } = req.body;
  try {
    db.execute('DELETE FROM clientes WHERE id = ?',
      [id], (err, results) => {
        if (err) {
          res.status(500).send({
            developMessage: err.sqlMessage,
            userMessage: 'Falha ao deletar o Cliente.',
          });
          return false;
        }
        res.status(200).send({
          message: 'Cliente excluído com sucesso!',
          affectedRows: results.affectedRows,
        });
      });
  } catch (error) {
    console.error('deleteCliente', error);
    res.status(500).send({ message: 'Ocorreu um erro ao excluir o Cliente.' });
  }
};

exports.listAllClientes = async (req, res) => {
  try {
    db.execute('SELECT * FROM clientes', (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.sqlMessage,
          userMessage: 'Falha ao listar os Clientes.',
        });
        return false;
      }
      res.status(200).send({ clientes: results });
    });
  } catch (error) {
    console.error('listAllClientes', error);
    res.status(500).send({ message: 'Ocorreu um erro ao listar os clientes.' });
  }
};

exports.listOneCliente = async (req, res) => {
  try {
    db.execute('SELECT * FROM clientes WHERE id = ?', [req.params.id], (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.sqlMessage,
          userMessage: 'Falha ao listar o Cliente.',
        });
        return false;
      }
      res.status(200).send({ cliente: results });
    });
  } catch (error) {
    console.error('listOneCliente', error);
    res.status(500).send({ message: 'Ocorreu um erro ao listar o cliente.' });
  }
};
