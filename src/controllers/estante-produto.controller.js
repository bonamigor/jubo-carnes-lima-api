/* eslint-disable consistent-return */
const db = require('../config/database');

// ==> Método que adicionará um produto na estante
exports.addProdutoNaEstante = async (req, res) => {
  const { idEstante, idProduto } = req.params;
  try {
    const insertQuery = 'INSERT INTO estante_produto (estante_id, produto_id) VALUES (? ,?)';
    db.execute(insertQuery, [idEstante, idProduto], (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.message,
          userMessage: 'Falha ao listar os Produtos da Estante.',
        });
        return false;
      }
      res.status(201).send({
        message: `Produto adicionado na Estante de ID ${idEstante}`,
        affectedRows: results.affectedRows,
      });
    });
  } catch (error) {
    console.error('addProdutoNaEstante', error);
    res.status(500).send({ message: 'Ocorreu um erro ao adicionar o Produto na Estante.' });
  }
};

// ==> Método que deletará um produto da estante
exports.deleteProdutoDaEstante = async (req, res) => {
  const { idEstante, idProduto } = req.params;
  try {
    const deleteQuery = 'DELETE FROM estante_produto WHERE estante_id = ? AND produto_id = ?';
    db.execute(deleteQuery, [idEstante, idProduto], (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.message,
          userMessage: 'Falha ao excluir o Produto da Estante.',
        });
        return false;
      }
      res.status(201).send({
        message: `Produto excluído da Estante de ID ${idEstante}`,
        affectedRows: results.affectedRows,
      });
    });
  } catch (error) {
    console.error('deleteProdutoDaEstante', error);
    res.status(500).send({ message: 'Ocorreu um erro ao deletar o Produto da Estante.' });
  }
};

// ==> Método que listará todos os produtos de uma estante específica
exports.listAllProdutosNaEstante = async (req, res) => {
  try {
    const selectQuery = 'SELECT produtos.nome as nome_produto, produtos.preco_custo, produtos.unidade_medida from estante_produto INNER JOIN produtos ON estante_produto.produto_id = produtos.id WHERE estante_id = ?';
    db.execute(selectQuery, [req.params.id], (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.message,
          userMessage: 'Falha ao listar os Produtos da Estante.',
        });
        return false;
      }
      res.status(200).send({ estante: results });
    });
  } catch (error) {
    console.error('listAllProdutosNaEstante', error);
    res.status(500).send({ message: 'Ocorreu um erro ao listar os produtos na estante.' });
  }
};
