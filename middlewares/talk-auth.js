const authToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  
  next();
};

const authName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' }); 
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
  }

  next();
};

const authAge = (req, res, next) => {
  const { age } = req.body;
  const result = age < 18;

  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (result) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const authTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });

  next();
};

const authWt = (req, res, next) => {
  const { watchedAt } = req.body.talk;

  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const isDateValid = dateRegex.test(watchedAt);

  if (!watchedAt) return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  if (isDateValid === false) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const authRate = (req, res, next) => {
  const { rate } = req.body.talk;
  
  if (rate === undefined) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  if (rate < 1 || rate > 5) { 
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = {
  authToken,
  authName,
  authAge,
  authTalk,
  authWt,
  authRate,
};
