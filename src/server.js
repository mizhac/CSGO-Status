import express from 'express';
import routes from './routes/main.routes';
const app = express();

app.use('/', routes);

const server = app.listen(3000, () => {
  const {address, port} = server.address();

  console.log(`Example app listening at http://${address}:${port}`);
});
