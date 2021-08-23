const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

exports.authenticate = async (req, res) => {
  const { email, senha } = req.body;
  const selectQuery = 'SELECT id, email FROM users WHERE email = ? AND senha = ?';
  const queryData = [email, sha1(senha)];

  db.execute(selectQuery, queryData, (err, results) => {
    if (err) {
      res.status(500).send({
        developMessage: err.sqlMessage,
        userMessage: 'Falha ao localizar o Usuário.',
      });
      return false;
    }

    const { userEmail, id } = results[0];

    const token = jwt.sign({ userEmail, id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

    res.status(200).send(token);
  });
};
