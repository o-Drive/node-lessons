const usuariosControlador = require('./usuarios-controlador');
const middlewaresAutenticacao = require('./middlewares-autenticacao')

module.exports = app => {
  // criando a rota de login
  app
    .route('/usuario/login')
    .post(
      middlewaresAutenticacao.local, 
      usuariosControlador.login
    );

  app
    .route('/usuario')
    .post(usuariosControlador.adiciona)
    .get(usuariosControlador.lista);

  app
    .route('/usuario/:id')
    .delete(
      middlewaresAutenticacao.bearer, 
      usuariosControlador.deleta
    );
};
