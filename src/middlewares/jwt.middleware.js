const jwt = require('jsonwebtoken');

const jwtMiddleware = (deps) => async (req, res, next) => {
  if (!deps.exclusions.includes(req.url)) {
    const token = req.headers.authorization.replace('Bearer ', '');
    if (!token) {
      res.status(403).send({ error: 'Token não fornecido' });
      return false;
    }

    try {
      req.decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      res.status(403).send({ error: 'Falha ao autenticar o token' });
      return false;
    }
  }
  next();
};

module.exports = jwtMiddleware;
