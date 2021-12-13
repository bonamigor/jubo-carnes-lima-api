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
        if (err || results.affectedRows === 0) {
          res.status(500).send({
            developMessage: err.message,
            userMessage: 'Falha ao criar o Pedido.',
          });
          return false;
        }
        res.status(201).send({
          message: 'Pedido criado com sucesso!',
          pedido: {
            dataCriacao, clienteId,
          },
          affectedRows: results.affectedRows,
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
            developMessage: err.message,
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

// ==> Método que listará todos os clientes
exports.listAllPedidos = async (req, res) => {
  try {
    db.execute('SELECT * FROM pedidos', (err, results) => {
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

// ==> Método que listará um cliente específico
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

exports.calculaValorTotal = async (req, res) => {
  const pedidoId = req.params.pedido_id;
  const selectQuery = 'SELECT SUM(preco_total) FROM item_pedido WHERE pedido_id = ?;';
  try {
    db.execute(selectQuery, [pedidoId], (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.message,
          userMessage: 'Falha ao calcular o valor total do Pedido.',
        });
        return false;
      }

      res.status(200).send({ valorTotal: results });
    });
  } catch (error) {
    console.error('calculaValorTotal', error);
    res.status(500).send({ message: 'Ocorreu um erro ao calcular o valor total do Pedido.' });
  }
};
