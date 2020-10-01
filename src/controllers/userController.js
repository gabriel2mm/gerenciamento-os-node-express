const express = require('express')
const User = require('../models/user');
const AuthMiddleware = require('../middlewares/auth');

const router = express.Router();
router.use(AuthMiddleware.authMiddleware);
router.get('/', async (req, res) => {
  const users = await User.find({}).populate('profile')
  return res.status(200).json(users)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id }).populated('profile').catch(err => [])
  return res.status(200).json(user)
})

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  User.updateOne({ _id: id }, req.body)
    .then(u => {
      return res.status(200).send()
    }).catch(err => {
      const error = new Error("Não foi possível atualizar usuário")
      error.httpStatusCode = 400
      next(error)
    })
})

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  User.deleteOne({ _id: id })
    .then(r => res.status(200).send())
    .catch(err => {
      const error = new Error("Não foi possível deletar usuário")
      error.httpStatusCode = 400
      next(error)
    })
})

router.get('/find/profile/:id', async (req, res) => {
  const {id} = req.params;
  const user = await User.find({profile: {"_id" : id}}).populate("profile")

  res.status(200).json(user);
})


module.exports = app => app.use('/users', router);