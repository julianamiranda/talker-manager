const TALKER_NOT_FOUND = { message: 'Pessoa palestrante não encontrada' };
const EMPTY_EMAIL = { message: 'O campo "email" é obrigatório' };
const EMPTY_PASSWORD = { message: 'O campo "password" é obrigatório' };
const NOT_VALID_EMAIL = { message: 'O "email" deve ter o formato "email@email.com"' };
const NOT_VALID_PASSWORD = { message: 'O "password" deve ter pelo menos 6 caracteres' }; 

module.exports = {
  TALKER_NOT_FOUND,
  EMPTY_EMAIL,
  EMPTY_PASSWORD,
  NOT_VALID_EMAIL,
  NOT_VALID_PASSWORD,
};
