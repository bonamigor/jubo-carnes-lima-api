/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const db = require('../config/database');

// ==> Método que cria o produto no Banco de Dados.
exports.createProduto = async (req, res) => {
  const {
    nome, precoCusto, unidadeMedida,
  } = req.body;
  try {
    const insertQuery = 'INSERT INTO produtos (nome, preco_custo, unidade_medida) VALUES (?, ?, ?)';
    db.execute(insertQuery, [nome, precoCusto, unidadeMedida], (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.message,
          userMessage: 'Falha ao criar o Produto.',
        });
        return false;
      }
      console.log(results);
      res.status(201).send({
        message: 'Produto criado com sucesso!',
        produto: {
          nome,
          precoCusto,
          unidadeMedida,
          affectedRows: results.affectedRows,
        },
      });
    });
  } catch (error) {
    console.error('createProduto', error);
    res.status(500).send({ message: 'Ocorreu um erro ao criar o Produto.' });
  }
};

// ==> Método que atualiza todas as propriedades do Produto.
exports.updateProduto = async (req, res) => {
  const {
    nome, precoCusto, unidadeMedida, id,
  } = req.body;
  try {
    const updateQuery = 'UPDATE produtos SET nome = ?, preco_custo = ?, unidade_medida = ? WHERE id = ?';
    db.execute(updateQuery, [nome, precoCusto, unidadeMedida, id], (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.message,
          userMessage: 'Falha ao atualizar o Produto.',
        });
        return false;
      }
      res.status(200).send({
        message: `Produto de ID ${id} atualizado com sucesso!`,
        nome,
        precoCusto,
        unidadeMedida,
        affectedRows: results.affectedRows,
      });
    });
  } catch (error) {
    console.error('updateProduto', error);
    res.status(500).send({ message: 'Ocorreu um erro ao atualizar o Produto.' });
  }
};

// ==> Método que exclui um produto da Base de Dados.
exports.deleteProduto = async (req, res) => {
  try {
    db.execute('DELETE FROM produtos WHERE id = ?', [req.params.id], (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.message,
          userMessage: 'Falha ao excluir o Produto.',
        });
        return false;
      }
      res.status(200).send({
        message: 'Produto excluído com sucesso!',
        affectedRows: results.affectedRows,
      });
    });
  } catch (error) {
    console.error('deleteProduto', error);
    res.status(500).send({ message: 'Ocorreu um erro ao excluir o Produto.' });
  }
};

// ==> Método que retorna todos os Produtos cadastrados.
exports.listAllProdutos = async (req, res) => {
  try {
    db.execute('SELECT * FROM produtos', (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.message,
          userMessage: 'Falha ao listar os Produtos.',
        });
        return false;
      }
      res.status(200).send({ produtos: results });
    });
  } catch (error) {
    console.error('listAllProdutos', error);
    res.status(500).send({ message: 'Ocorreu um erro ao listar os produtos.' });
  }
};

exports.listOneProduto = async (req, res) => {
  try {
    db.execute('SELECT * FROM produtos WHERE id = ?',
      [req.params.id],
      (err, results) => {
        if (err) {
          res.status(500).send({
            developMessage: err.message,
            userMessage: 'Falha ao listar o Produto.',
          });
          return false;
        }
        res.status(200).send({ produto: results[0] });
      });
  } catch (error) {
    console.error('listOneProduto', error);
    res.status(500).send({ message: 'Ocorreu um erro ao listar o produto.' });
  }
};
