const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const { getTalker } = require('./utils/fs-talker');

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Crie o endpoint GET /talker
app.get('/talker', async (_req, res) => {
  const tk = await getTalker();
  
  if (!tk) return res.status(200).json([]);
  
  return res.status(200).json(tk);
});

app.listen(PORT, () => {
  console.log('Online');
});
