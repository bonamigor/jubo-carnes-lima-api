const db = require('../config/database');

exports.adicionarItemAoPedido = async (req, res) => {
  const { estanteId, produtoId, quantidade } = req.body;
  const { pedidoId } = req.params;
  // Essa Query recupera o Preço de Venda do Produto para poder calcular o preço total.
  const selectQuery = 'SELECT preco_venda FROM estante_produto INNER JOIN preco_quantidade ON estante_produto.preco_quantidade_id = preco_quantidade.id WHERE estante_produto.estante_id = ? AND estante_produto.produto_id = ?';
  const insertQuery = 'INSERT INTO item_pedido (pedido_id, produto_id, item_quantidade, preco_total) VALUES (?, ?, ?, ?)';
  db.execute(selectQuery, [estanteId, produtoId], (err, results) => {
    if (err) {
      console.error(err);
    }
    const precoTotal = results[0].preco_venda * quantidade;
    db.execute(insertQuery, [pedidoId, produtoId, quantidade, precoTotal], (error, result) => {
      if (error || result.affectedRows === 0) {
        res.status(500).send({
          developMessage: err.sqlMessage,
          userMessage: 'Falha ao inserir o Item ao pedido.',
        });
        return false;
      }
      res.status(201).send({
        message: 'Item adicionado ao Pedido com sucesso!',
        affectedRows: result.affectedRows,
      });
      this.calculaValorTotal(req, res);
      this.atualizaQuantidadeAoInserir(req, res);
    });
  });
};

exports.atualizaItemNoPedido = async (req, res) => {
  const { estanteId, produtoId, quantidade } = req.body;
  const { pedidoId, itemPedidoId } = req.params;
  // Essa Query recupera o Preço de Venda do Produto para poder calcular o preço total.
  const selectQuery = 'SELECT preco_venda FROM estante_produto INNER JOIN preco_quantidade ON estante_produto.preco_quantidade_id = preco_quantidade.id WHERE estante_produto.estante_id = ? AND estante_produto.produto_id = ?';
  const updateQuery = 'UPDATE item_pedido SET pedido_id = ?, produto_id = ?, item_quantidade = ?, preco_total = ? WHERE id = ?';
  db.execute(selectQuery, [estanteId, produtoId], (err, results) => {
    if (err) {
      console.error(err);
    }
    const precoTotal = results[0].preco_venda * quantidade;
    db.execute(updateQuery,
      [pedidoId, produtoId, quantidade, precoTotal, itemPedidoId],
      (error, result) => {
        if (error || result.affectedRows === 0) {
          res.status(500).send({
            developMessage: error.sqlMessage,
            userMessage: 'Falha ao atualizar o Item do pedido.',
          });
          return false;
        }
        res.status(201).send({
          message: 'Item atualizado no Pedido com sucesso!',
          affectedRows: result.affectedRows,
        });
        this.calculaValorTotal(req, res);
        this.atualizaQuantidadeAoAtualizar(req, res);
      });
  });
};

exports.calculaValorTotal = async (req, res) => {
  const { pedidoId } = req.params;
  const query = `UPDATE pedidos SET valor_total = (SELECT SUM(preco_total) as total FROM item_pedido WHERE pedido_id = ${pedidoId}) WHERE id = ${pedidoId}`;
  try {
    db.query(query);
  } catch (error) {
    res.status(500).send({
      message: 'Ocorreu um erro ao calcular o valor total do Pedido.',
      erro: error,
    });
  }
};

exports.atualizaQuantidadeAoInserir = async (req, res) => {
  const { estanteId, produtoId, quantidade } = req.body;
  const query = `UPDATE preco_quantidade SET quantidade = quantidade - ${quantidade} WHERE id = (SELECT preco_quantidade_id FROM estante_produto WHERE estante_id = ${estanteId} and produto_id = ${produtoId})`;
  try {
    db.query(query);
  } catch (error) {
    res.status(500).send({
      message: 'Ocorreu um erro ao atualizar a quantidade do Produto.',
      erro: error,
    });
  }
};

exports.atualizaQuantidadeAoAtualizar = async (req, res) => {
  const { estanteId, produtoId, quantidade } = req.body;
  const selectQuery = `SELECT preco_quantidade_id FROM estante_produto WHERE estante_id = ${estanteId} AND produto_id = ${produtoId}`;
  const quantidadeQuery = 'SELECT quantidade FROM preco_quantidade WHERE id = ?';
  const updateQuery = 'UPDATE preco_quantidade SET quantidade = ? WHERE id = ?';
  try {
    db.query(selectQuery, (erro, result) => {
      const precoQuantidadeId = result[0].preco_quantidade_id;
      console.log(precoQuantidadeId);
      db.execute(quantidadeQuery, [precoQuantidadeId], (error, results) => {
        const quantidadeAtualizada = results[0].quantidade - quantidade;
        console.log(quantidadeAtualizada);
        db.execute(updateQuery, [quantidadeAtualizada, precoQuantidadeId]);
      });
    });
  } catch (error) {
    res.status(500).send({
      message: 'Ocorreu um erro ao atualizar a quantidade do Produto.',
      erro: error,
    });
  }
};
