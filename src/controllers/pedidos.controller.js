/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const db = require('../config/database');

// ==> Método que adicionará um pedido ao banco de dados
exports.createPedido = async (req, res) => {
  const { clienteId } = req.body;
  const dataCriacao = new Date();
  try {
    const insertQuery = 'INSERT INTO pedidos (data_criacao, status, cliente_id) VALUES (?, ?, ?)';
    db.execute(insertQuery, [dataCriacao, 'CRIADO', clienteId],
      (err, results) => {
        db.execute('SELECT MAX (id) as id FROM pedidos', (erros, resultados) => {
          if (err || erros) {
            res.status(500).send({
              developMessage: err.message,
              userMessage: 'Falha ao criar o Pedido.',
            });
            return false;
          }
          res.status(201).send({
            message: 'Pedido criado com sucesso!',
            pedido: {
              pedidoId: resultados[0].id, status: 'CRIADO', dataCriacao, clienteId,
            },
            affectedRows: results.affectedRows,
          });
        });
      });
  } catch (error) {
    console.error('createPedido', error);
    res.status(500).send({ message: 'Ocorreu um erro ao criar o Pedido.' });
  }
};

// ==> Método que atualizará a data de confirmação e o status
exports.confirmaPedido = async (req, res) => {
  const { pedidoId } = req.params;
  const dataConfirmacao = new Date();
  const status = 'CONFIRMADO';
  try {
    const updateQuery = 'UPDATE pedidos SET data_confirmacao = ?, status = ? WHERE id = ?';
    db.execute(updateQuery,
      [dataConfirmacao, status, pedidoId],
      (err, results) => {
        if (err) {
          res.status(500).send({
            developMessage: err.message,
            userMessage: 'Falha ao confirmar o Pedido.',
          });
          return false;
        }
        res.status(201).send({
          message: 'Pedido confirmado com sucesso!',
          pedido: {
            pedidoId, dataConfirmacao, status,
          },
          affectedRows: results.affectedRows,
        });
      });
  } catch (error) {
    console.error('confirmaPedido', error);
    res.status(500).send({ message: 'Ocorreu um erro ao confirmar o Pedido.' });
  }
};

// ==> Método que atualizará a data de entrega e o status
exports.entregaPedido = async (req, res) => {
  const { pedidoId } = req.params;
  const dataEntrega = new Date();
  const status = 'ENTREGUE';
  try {
    const updateQuery = 'UPDATE pedidos SET data_entrega = ?, status = ? WHERE id = ?';
    db.execute(updateQuery,
      [dataEntrega, status, pedidoId],
      (err, results) => {
        if (err) {
          res.status(500).send({
            developMessage: err.message,
            userMessage: 'Falha ao alterar o status do Pedido para ENTREGUE.',
          });
          return false;
        }
        res.status(201).send({
          message: 'Pedido entregue com sucesso!',
          pedido: {
            pedidoId, dataEntrega, status,
          },
          affectedRows: results.affectedRows,
        });
      });
  } catch (error) {
    console.error('entregaPedido', error);
    res.status(500).send({ message: 'Ocorreu um erro ao confirmar o Pedido.' });
  }
};

// ==> Método que adicionará uma data de cancelamento e o status para CANCELADO
exports.cancelaPedido = async (req, res) => {
  const { pedidoId } = req.params;
  const dataCancelamento = new Date();
  const statusPedido = 'CANCELADO';
  const updateQuery = 'UPDATE pedidos SET data_cancelamento = ?, status = ? WHERE id = ?';
  try {
    const selectPedido = 'SELECT * FROM pedidos WHERE id = ?';
    db.execute(selectPedido, [pedidoId], (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.message,
          userMessage: 'Falha ao recuperar o Pedido.',
        });
        return false;
      }

      const { status } = results[0];
      if (status === 'ENTREGUE' || status === 'CANCELADO') {
        res.status(500).send({
          userMessage: 'Não é possível cancelar um pedido que já foi entregue ou cancelado.',
        });
        return false;
      }

      db.execute(updateQuery,
        [dataCancelamento, statusPedido, pedidoId],
        (erro, result) => {
          if (erro) {
            res.status(500).send({
              developMessage: erro.sqlMessage,
              userMessage: 'Falha ao alterar o status do Pedido para CANCELADO.',
            });
            return false;
          }
          res.status(200).send({
            message: 'Pedido cancelado com sucesso!',
            pedido: {
              pedidoId, dataCancelamento, statusPedido,
            },
            affectedRows: result.affectedRows,
          });
        });
    });
  } catch (error) {
    console.error('cancelaPedido', error);
    res.status(500).send({ message: 'Ocorreu um erro ao cancelar o Pedido.' });
  }
};

// ==> Método que deletará os itens do Pedido além do Pedido em si.
exports.deletePedido = async (req, res) => {
  const { pedidoId } = req.params;
  try {
    db.execute('DELETE FROM item_pedido WHERE pedido_id = ?',
      [pedidoId], (err, results) => {
        if (err || results.affectedRows === 0) {
          res.status(500).send({
            developMessage: err,
            userMessage: 'Falha ao deletar o itens do Pedido.',
          });
          return false;
        }
        db.execute('DELETE FROM pedidos WHERE id = ?', [pedidoId], (erro, result) => {
          if (erro || result.affectedRows === 0) {
            res.status(500).send({
              developMessage: erro.sqlMessage,
              userMessage: 'Falha ao deletar o Pedido.',
            });
            return false;
          }
          res.status(200).send({
            message: 'Pedido excluído com sucesso!',
            affectedRows: result.affectedRows,
          });
        });
      });
  } catch (error) {
    console.error('deleteCliente', error);
    res.status(500).send({ message: 'Ocorreu um erro ao excluir o Cliente.' });
  }
};

// ==> Método que listará todos os pedidos
exports.listAllPedidos = async (req, res) => {
  const selectQuery = 'SELECT pedidos.id AS id, pedidos.data_criacao AS dataCriacao, pedidos.valor_total AS valorTotal, clientes.nome AS nome, clientes.cidade AS cidade, clientes.estado AS estado FROM pedidos INNER JOIN clientes ON clientes.id = pedidos.cliente_id';
  try {
    db.execute(selectQuery, (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.message,
          userMessage: 'Falha ao listar os pedidos.',
        });
        return false;
      }
      res.status(200).send({ pedidos: results });
    });
  } catch (error) {
    console.error('listAllPedidos', error);
    res.status(500).send({ message: 'Ocorreu um erro ao listar os pedidos.' });
  }
};

// ==> Método que listará todos os pedidos para entregar amanhã
exports.listAllTomorrowPedidos = async (req, res) => {
  const dataEntrega = new Date().setDate(new Date() + 1);
  const selectQuery = 'SELECT pedidos.id AS id, pedidos.data_criacao AS dataCriacao, pedidos.valor_total AS valorTotal, clientes.nome AS nome, clientes.cidade AS cidade, clientes.estado AS estado FROM pedidos INNER JOIN clientes ON clientes.id = pedidos.cliente_id where pedidos.data_entrega = ?';
  try {
    db.execute(selectQuery, [dataEntrega], (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.message,
          userMessage: 'Falha ao listar os pedidos.',
        });
        return false;
      }
      res.status(200).send({ pedidos: results });
    });
  } catch (error) {
    console.error('listAllTomorrowPedidos', error);
    res.status(500).send({ message: 'Ocorreu um erro ao listar os pedidos.' });
  }
};

// ==> Método que listará um pedido específico
exports.listOnePedido = async (req, res) => {
  const { pedidoId } = req.params;
  try {
    db.execute('SELECT * FROM pedidos WHERE id = ?', [pedidoId], (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.message,
          userMessage: 'Falha ao listar o Pedido.',
        });
        return false;
      }
      res.status(200).send({ pedido: results });
    });
  } catch (error) {
    console.error('listOnePedido', error);
    res.status(500).send({ message: 'Ocorreu um erro ao listar o Pedido.' });
  }
};

// ==> Método que listará todos os pedidos
exports.listAllPedidosByCliente = async (req, res) => {
  const { clienteId } = req.body;
  try {
    db.execute('SELECT * FROM pedidos where clienteId = ?', [clienteId], (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.message,
          userMessage: 'Falha ao listar os pedidos.',
        });
        return false;
      }
      res.status(200).send({ pedidos: results });
    });
  } catch (error) {
    console.error('listAllPedidos', error);
    res.status(500).send({ message: 'Ocorreu um erro ao listar os pedidos.' });
  }
};

// ==> Método que listará um pedido específico
exports.listOnePedidoByCliente = async (req, res) => {
  const { pedidoId, clienteId } = req.body;
  try {
    db.execute('SELECT * FROM pedidos WHERE clienteId = ? AND pedidoId = ?', [clienteId, pedidoId], (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.message,
          userMessage: 'Falha ao listar o Pedido.',
        });
        return false;
      }
      res.status(200).send({ pedido: results });
    });
  } catch (error) {
    console.error('listOnePedido', error);
    res.status(500).send({ message: 'Ocorreu um erro ao listar o Pedido.' });
  }
};

exports.calculaValorTotal = async (req, res) => {
  const { pedidoId } = req.params;
  const selectQuery = 'SELECT SUM(preco_total) as totalPedido FROM item_pedido WHERE pedido_id = ?;';
  try {
    db.execute(selectQuery, [pedidoId], (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.message,
          userMessage: 'Falha ao calcular o valor total do Pedido.',
        });
        return false;
      }

      res.status(200).send(results[0]);
    });
  } catch (error) {
    console.error('calculaValorTotal', error);
    res.status(500).send({ message: 'Ocorreu um erro ao calcular o valor total do Pedido.' });
  }
};

exports.recuperarProdutosNoPedido = async (req, res) => {
  const { pedidoId, estanteId } = req.params;
  const selectQuery = `select item_pedido.id as itemPedidoId, produtos.id as produtoId, produtos.nome as nome, produtos.unidade_medida as unidade, preco_quantidade.preco_venda as precoVenda, item_pedido.quantidade as quantidade, item_pedido.preco_total as total from estante_produto
  inner join produtos on produtos.id = estante_produto.produto_id
  inner join preco_quantidade on preco_quantidade.id = estante_produto.preco_quantidade_id
  inner join item_pedido on item_pedido.produto_id = estante_produto.produto_id
  where item_pedido.pedido_id = ? and estante_produto.estante_id = ?`;
  try {
    db.execute(selectQuery, [pedidoId, estanteId], (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.message,
          userMessage: 'Falha ao calcular o valor total do Pedido.',
        });
        return false;
      }

      res.status(200).send({ produtos: results });
    });
  } catch (error) {
    res.status(500).send({ message: 'Ocorreu um erro ao calcular o valor total do Pedido.' });
  }
};

exports.recuperarUltimoPedidoByCliente = async (req, res) => {
  const { clienteId } = req.params;
  const selectQuery = 'SELECT id, data_criacao as dataCriacao, valor_total as total, status FROM pedidos WHERE id=(SELECT MAX(id) FROM pedidos WHERE cliente_id = ?)';
  try {
    db.execute(selectQuery, [clienteId], (error, results) => {
      if (error) {
        res.status(500).send({
          developMessage: error.message,
          userMessage: 'Falha ao ao recuperar o último pedido desse Cliente.',
        });
        return false;
      }

      res.status(200).send({ pedido: results[0] });
    });
  } catch (error) {
    res.status(500).send({ message: 'Ocorreu um erro ao recuperar o último pedido desse Cliente.' });
  }
};
