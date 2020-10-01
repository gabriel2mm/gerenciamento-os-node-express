const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();
router.post('/login', async (req, res, next) =>{
  const { login, password } = req.body;
  const user = await User.findOne({ login: login }).select('+password');

  if (!user)
  {
    const error = new Error("Usuário não encontrado")
    error.httpStatusCode = 401
    next(error)
  } 

  if (!await bcrypt.compare(password, user.password)){
    const error = new Error("Usuário inválido")
    error.httpStatusCode = 401
    next(error)
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: 3000
  });

  req.userId = user._id;
  return res.json({ auth: true, token: token });
});

router.post('/register', async (req, res, next) => {
  const { first_name, last_name, email, login, password } = req.body;
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(password, salt);

  User.create({ first_name, last_name, email, login, password: hash })
    .then(u => {
      return res.status(201).send()
    })
    .catch(err => {
      const error = new Error("Não foi possível registrar usuário")
      error.httpStatusCode = 400
      next(error)
    });
})

module.exports = app => app.use('/auth', router);