/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const db = require('../config/database');

// ==> Método que adicionará um cliente ao banco de dados
exports.createCliente = async (req, res) => {
  try {
    const {
      nome, cnpj, endereco, email, cidade, estado, cep, telefone, ativo,
    } = req.body;
    const insertQuery = 'INSERT INTO clientes (nome, cnpj, endereco, email, cidade, estado, cep, telefone, ativo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const queryData = [nome, cnpj, endereco, email, cidade, estado, cep, telefone, ativo];
    db.execute(insertQuery, queryData, (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.message,
          userMessage: 'Falha ao criar o Cliente.',
        });
        return false;
      }
      res.status(201).send({
        message: 'Cliente criado com sucesso!',
        cliente: {
          nome, cnpj, endereco, email, cidade, estado, cep, telefone, ativo,
        },
        affectedRows: results.affectedRows,
      });
    });
  } catch (error) {
    res.status(500).send({ message: 'Ocorreu um erro ao criar o Cliente.' });
  }
};

// ==> Método que atualizará um cliente específico
exports.updateCliente = async (req, res) => {
  const {
    nome, cnpj, endereco, email, cidade, estado, cep, telefone, ativo, id,
  } = req.body;
  try {
    const updateQuery = 'UPDATE clientes SET nome = ?, cnpj = ?, endereco = ?, email = ?, cidade = ?, estado = ?, cep = ?, telefone = ?, ativo = ? WHERE id = ?';
    db.execute(updateQuery,
      [nome, cnpj, endereco, email, cidade, estado, cep, telefone, ativo, id],
      (err, results) => {
        if (err) {
          res.status(500).send({
            developMessage: err.message,
            userMessage: 'Falha ao atualizar o Cliente.',
          });
          return false;
        }
        res.status(201).send({
          message: 'Cliente atualizado com sucesso!',
          cliente: {
            id, nome, cnpj, endereco, email, cidade, estado, cep, telefone, ativo,
          },
          affectedRows: results.affectedRows,
        });
      });
  } catch (error) {
    console.error('updateCliente', error);
    res.status(500).send({ message: 'Ocorreu um erro ao atualizar o Cliente.' });
  }
};

// ==> Método que deletará um cliente específico
exports.deleteCliente = async (req, res) => {
  try {
    db.execute('DELETE FROM clientes WHERE id = ?',
      [req.params.id], (err, results) => {
        if (err) {
          res.status(500).send({
            developMessage: err.message,
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

// ==> Método que listará todos os clientes
exports.listAllClientes = async (req, res) => {
  try {
    db.execute('SELECT * FROM clientes', (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.message,
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

// ==> Método que listará um cliente específico
exports.listOneCliente = async (req, res) => {
  try {
    db.execute('SELECT * FROM clientes WHERE id = ?', [req.params.id], (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.message,
          userMessage: 'Falha ao listar o Cliente.',
        });
        return false;
      }
      res.status(200).send({ cliente: results[0] });
    });
  } catch (error) {
    console.error('listOneCliente', error);
    res.status(500).send({ message: 'Ocorreu um erro ao listar o cliente.' });
  }
};
