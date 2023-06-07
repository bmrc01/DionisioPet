const express = require('express');
const cors = require('cors');
const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());

// DB Connection
const conn = require('./db/conn');

conn();

const routes = require('./routes/router');

app.use('/api', routes);

app.listen(port, function() {
  console.log('Servidor online, rodando na porta ' + port);
});
