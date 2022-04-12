const app = require('./src/index');

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('Aplicação sendo executada na porta:', port);
});
