/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const db = require('../config/database');

// ==> Método que cria uma estante
exports.createEstante = async (req, res) => {
  const {
    periodo, clienteId,
  } = req.body;
  let clienteName;
  try {
    const insertQuery = 'INSERT INTO estantes (periodo, cliente_id) VALUES (?, ?)';
    db.execute('SELECT nome FROM clientes WHERE id = ?', [clienteId], (err, results, fields) => {
      clienteName = results[0].name;
    });
    db.execute(insertQuery, [periodo, clienteId], (err, results, fields) => {
      if (err) {
        res.status(500).send({
          developMessage: err.sqlMessage,
          userMessage: 'Falha ao criar a Estante.',
        });
        return false;
      }
      res.status(201).send({
        message: 'Estante criada com sucesso!',
        fields,
        estante: {
          periodo,
          clienteId,
          clienteName,
        },
        affectedRows: results.affectedRows,
      });
    });
  } catch (error) {
    console.error('createEstante', error);
    res.status(500).send({ message: 'Ocorreu um erro ao criar a Estante.' });
  }
};

// ==> Método que atualiza uma estante
exports.updateEstante = async (req, res) => {
  const { periodo, clienteId, id } = req.body;
  try {
    const updateQuery = 'UPDATE estantes SET periodo = ?, cliente_id = ? WHERE id = ?';
    db.execute(updateQuery, [periodo, clienteId, id], (err, results, fields) => {
      if (err) {
        res.status(500).send({
          developMessage: err.sqlMessage,
          userMessage: 'Falha ao atualizar a Estante.',
        });
        return false;
      }
      res.status(200).send({
        message: `Estante de ID ${id} atualizada com sucesso!`,
        periodo,
        clienteId,
        affectedRows: results.affectedRows,
      });
    });
  } catch (error) {
    console.error('updateEstante', error);
    res.status(500).send({ message: 'Ocorreu um erro ao atualizar a Estante.' });
  }
};

// ==> Método que deleta uma estante
exports.deleteEstante = async (req, res) => {
  const { id } = req.params;
  try {
    db.execute('DELETE FROM estantes WHERE id = ?', [id], (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.sqlMessage,
          userMessage: 'Falha ao excluir a Estante.',
        });
        return false;
      }
      res.status(200).send({
        message: 'Estante excluída com sucesso!',
        affectedRows: results.affectedRows,
      });
    });
  } catch (error) {
    console.error('deleteEstante', error);
    res.status(500).send({ message: 'Ocorreu um erro ao excluir a Estante.' });
  }
};

// ==> Método que retorno a Estante porém sem os dados do Cliente, apenas o ID
exports.listAllEstantes = async (req, res) => {
  try {
    db.execute('SELECT * FROM estantes', (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.sqlMessage,
          userMessage: 'Falha ao listar as Estantes.',
        });
        return false;
      }
      res.status(200).send({ estantes: results });
    });
  } catch (error) {
    console.error('listAllEstantes', error);
    res.status(500).send({ message: 'Ocorreu um erro ao listar as estantes.' });
  }
};

// ==> Método que retorna a Estante com os Dados do Cliente (Nome);
exports.listAllEstantesCliente = async (req, res) => {
  try {
    const selectQuery = 'SELECT periodo, clientes.name FROM estantes INNER JOIN clientes ON estantes.cliente_id = clientes.id';
    db.execute(selectQuery, (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.sqlMessage,
          userMessage: 'Falha ao listar as Estantee.',
        });
        return false;
      }
      res.status(200).send({ estantes: results });
    });
  } catch (error) {
    console.error('listAllEstantes', error);
    res.status(500).send({ message: 'Ocorreu um erro ao listar as estantes.' });
  }
};

// ==> Método que lista uma estante específica
exports.listOneEstante = async (req, res) => {
  try {
    db.execute('SELECT * from estantes WHERE id = ?',
      [req.params.id],
      (err, results) => {
        if (err) {
          res.status(500).send({
            developMessage: err.sqlMessage,
            userMessage: 'Falha ao listar a Estante.',
          });
          return false;
        }
        res.status(200).send({ estante: results });
      });
  } catch (error) {
    console.error('listOneEstante', error);
    res.status(500).send({ message: 'Ocorreu um erro ao listar a estante.' });
  }
};
