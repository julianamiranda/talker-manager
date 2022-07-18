const express = require('express');
const bodyParser = require('body-parser');

const msg = require('./utils/messages');
const generateToken = require('./utils/generateToken');
const loginValidation = require('./middlewares/login');
const { getTalker, setTalker } = require('./utils/fs-talker');
const { authToken, authName, authAge,
  authTalk, authWt, authRate } = require('./middlewares/talk-auth');

const app = express();
const PORT = '3000';
const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// 1 - Crie o endpoint GET /talker
app.get('/talker', async (_req, res) => {
  const tk = await getTalker();
  
  if (!tk) return res.status(HTTP_OK_STATUS).json([]);
  
  return res.status(HTTP_OK_STATUS).json(tk);
});

// 2 - Crie o endpoint GET /talker/:id
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const tk = await getTalker();

  const talkerById = tk.find((talker) => talker.id === Number(id));
  
  if (!talkerById) return res.status(HTTP_NOT_FOUND).json(msg.TALKER_NOT_FOUND);
  
  return res.status(HTTP_OK_STATUS).json(talkerById);
});

// 3 - Crie o endpoint POST /login
app.post('/login', loginValidation, (_req, res) => {
  const token = generateToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});

// 5 - Crie o endpoint POST /talker
app.post('/talker', authToken, authName, authAge, authTalk, authWt, authRate, async (req, res) => {
  const { name, age, talk } = req.body;
  
  const tk = await getTalker();
  const AddedTalker = { id: tk.length + 1, name, age, talk };
  tk.push(AddedTalker);
  
  await setTalker(tk);
  
  return res.status(201).json(AddedTalker);
});

// 7 - Crie o endpoint DELETE /talker/:id
app.delete('/talker/:id', authToken, async (req, res) => {
  const id = Number(req.params.id);

  const tk = await getTalker();
  const filterTk = tk.filter((talker) => talker.id !== id);
  await setTalker(filterTk);

  return res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
