const Usuario = require('./usuarios-modelo');
const { InvalidArgumentError, InternalServerError } = require('../erros');
// importando module jwt
const jwt = require('jsonwebtoken');


//funcao para criar JWT
function criaTokenJWT(usuario) {
  const payload = {
    id: usuario.id
  };

  // criando assinatura com variavel de ambiente + expiração
  const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '15m' });
  return token

}

module.exports = {
  adiciona: async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
      const usuario = new Usuario({
        nome,
        email
      });

      await usuario.adicionaSenha(senha);

      await usuario.adiciona();

      res.status(201).json();
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        res.status(422).json({ erro: erro.message });
      } else if (erro instanceof InternalServerError) {
        res.status(500).json({ erro: erro.message });
      } else {
        res.status(500).json({ erro: erro.message });
      }
    }
  },

  // criando controlador login
  login:  (req, res) => {
    //criar token para usuario
    const token = criaTokenJWT(req.user);

    //resposta
    res.set('Authorization', token)
    res.status(204).send();
  },

  lista: async (req, res) => {
    const usuarios = await Usuario.lista();
    res.json(usuarios);
  },

  deleta: async (req, res) => {
    const usuario = await Usuario.buscaPorId(req.params.id);
    try {
      await usuario.deleta();
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  }
};
