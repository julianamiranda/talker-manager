const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = generateToken;

// código reaproveitado do exercicio bônus do Bloco 22.4 Express - HTTP com Node.js