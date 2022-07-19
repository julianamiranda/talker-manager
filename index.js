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
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;
const HTTP_NOT_FOUND = 404;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// 8 - Crie o endpoint GET /talker/search?q=searchTerm
app.get('/talker/search', authToken, async (req, res) => {
  const q = (req.query.q).toLowerCase();

  const tk = await getTalker();
  const search = tk.filter(({ name }) => name.toLowerCase().includes(q));
  
  if (!q) return res.status(HTTP_OK_STATUS).json(tk);
  if (!search) return res.status(HTTP_OK_STATUS).json([]);

  return res.status(HTTP_OK_STATUS).json(search);
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

// 7 - Crie o endpoint DELETE /talker/:id
app.delete('/talker/:id', authToken, async (req, res) => {
  const id = Number(req.params.id);

  const tk = await getTalker();
  const filterTk = tk.filter((talker) => talker.id !== id);
  await setTalker(filterTk);

  return res.status(HTTP_NO_CONTENT).end();
});

app.use(authToken, authName, authAge, authTalk, authWt, authRate);

// 5 - Crie o endpoint POST /talker
app.post('/talker', async (req, res) => {
  const { name, age, talk } = req.body;
  
  const tk = await getTalker();
  const AddedTalker = { id: tk.length + 1, name, age, talk };
  tk.push(AddedTalker);
  
  await setTalker(tk);
  
  return res.status(HTTP_CREATED).json(AddedTalker);
});

// 6 - Crie o endpoint PUT /talker/:id
app.put('/talker/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { name, age, talk } = req.body;
  
  const tk = await getTalker();
  const editedTalker = { id, name, age, talk };
  const idx = tk.findIndex((talker) => talker.id === id);
  tk[idx] = editedTalker;

  await setTalker(tk);
    
  return res.status(HTTP_OK_STATUS).json(editedTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
