const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

exports.authenticate = async (req, res) => {
  const { email, senha } = req.body;
  const selectQuery = 'SELECT id, nome, email, admin FROM users WHERE email = ? AND senha = ?';
  const queryData = [email, sha1(senha)];

  db.execute(selectQuery, queryData, (err, results) => {
    if (err) {
      res.status(500).send({
        developMessage: err.sqlMessage,
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
        userEmail, id, nome, admin,
      } = results[0];
      const userToken = jwt.sign(
        { userEmail, id },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 * 24 },
      );
      res.status(200).send({
        user: {
          id,
          nome,
          email,
          admin,
        },
        token: userToken,
      });
    }

    return true;
  });
};
