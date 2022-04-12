const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

exports.authenticate = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const selectQuery = 'SELECT id, nome, email, admin, cliente_id as clienteId FROM users WHERE email = ? AND senha = ?';
    const queryData = [email, sha1(senha)];

    db.execute(selectQuery, queryData, (err, results) => {
      if (err) {
        res.status(500).send({
          developMessage: err.message,
          userMessage: 'Falha ao localizar o Usuário.',
        });
        return false;
      }

      if (results.length === 0) {
        res.status(404).send({
          message: 'Não foi possível localizar o usuário.',
        });
      } else {
        const {
          userEmail, id,
        } = results[0];
        const userToken = jwt.sign(
          { userEmail, id },
          process.env.JWT_SECRET,
          { expiresIn: 60 * 60 * 24 },
        );
        res.status(200).send({
          user: results[0],
          token: userToken,
        });
      }

      return true;
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
