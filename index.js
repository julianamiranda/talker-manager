const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const { getTalker } = require('./utils/fs-talker');
const msg = require('./utils/messages');

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

// Crie o endpoint GET /talker/:id
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const tk = await getTalker();

  const talkerById = tk.find((talker) => talker.id === Number(id));
  
  if (!talkerById) return res.status(404).json(msg.TALKER_NOT_FOUND);
  
  return res.status(200).json(talkerById);
});

app.listen(PORT, () => {
  console.log('Online');
});
