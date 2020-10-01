const blackList = require('./blackList.json');

const verifyIP = (req, res, next) => {
  let ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).replace(/^:{1,2}(ffff)?:{1,2}/, "");
  if(!blackList.includes(ip))
      return next();

  return res.status(403).send({error : "requisição não autorizada"});
}

module.exports = app => app.use(verifyIP);