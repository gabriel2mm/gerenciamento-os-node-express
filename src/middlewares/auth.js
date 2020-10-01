const Configuration = require('../config/readYaml/index');
const jwt = require('jsonwebtoken')

exports.authMiddleware = async (req, res, next) => {
  const {authorization} = req.headers;

  if (!authorization){
      const error = new Error("Não foi possível localizar o token")
      error.httpStatusCode = 401
      return next(error)
  }

  const composition = authorization.split(' ');
  if (composition.length !== 2) {
      const error = new Error("Erro no token")
      error.httpStatusCode = 401
      return next(error)
  }

  const [protocol, token] = composition;
  if (!/^Bearer$/i.test(protocol)){
      const error = new Error("formato de token não esperado")
      error.httpStatusCode = 401
      return next(error)
  }

  jwt.verify(token, Configuration.SECRET || "", (err, decoded) => {
    if (err){
      const error = new Error("token inválido ou expirado")
      error.httpStatusCode = 401
      return next(error)
    }

    if(decoded && decoded.id){
      req.userId = decoded.id;  
    }

    next();
  });
}