const msg = require('../utils/messages');

// Adicione as validações para o endpoint /login
const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  const HTTP_BAD_REQUEST = 400;
  const re = /\S+@\S+\.\S+/;
  const isEmailValid = re.test(email);

  if (!email) return res.status(HTTP_BAD_REQUEST).json(msg.EMPTY_EMAIL);
  if (!password) return res.status(HTTP_BAD_REQUEST).json(msg.EMPTY_PASSWORD);
  
  if (!isEmailValid) return res.status(HTTP_BAD_REQUEST).json(msg.NOT_VALID_EMAIL);
  if (password.length < 6) return res.status(HTTP_BAD_REQUEST).json(msg.NOT_VALID_PASSWORD);
  
  next();
};

module.exports = loginValidation;

// Validação do email: https://stackoverflow.com/a/9204568
