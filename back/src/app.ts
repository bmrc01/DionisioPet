import express from 'express';
import cors from 'cors';
import { Application } from 'express';
import conn from './db/conn';
import routes from './routes/router';

const app: Application = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// DB Connection
conn();

app.use('/api', routes);

app.listen(port, () => {
  console.log('Servidor online, rodando na porta ' + port);
});
