const express = require('express')
const Profile = require('../models/profile');
const AuthMiddleware = require('../middlewares/auth');

const router = express.Router();
router.use(AuthMiddleware.authMiddleware);

router.get('/', async (req, res) => {
  const profiles = await Profile.find({})
  return res.status(200).json(profiles)
})

router.post('/', async (req, res, next) => {
  Profile.create(req.body)
    .then(p => {
      return res.status(201).send();
    }).catch(err => {
      const error = new Error("Não foi possível registrar usuário")
      error.httpStatusCode = 400
      next(error)
    });
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const profile = await Profile.findOne({ _id: id }).catch(err => [])
  return res.status(200).json(profile)
})

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  Profile.updateOne({ _id: id }, req.body)
    .then(u => {
      return res.status(200).send()
    }).catch(err => {
      console.error("Não foi possível atualizar perfil : ", err)
      const error = new Error("Não foi possível atualizar perfil")
      error.httpStatusCode = 204
      next(error)
    })
})

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Profile.deleteOne({ _id: id })
    .then(r => res.status(200).send())
    .catch(err => {
      console.error("Não foi possível excluir perfil : ", err)
      const error = new Error("Não foi possível deletar perfil")
      error.httpStatusCode = 204
      next(error)
    })
})

module.exports = app => app.use('/profiles', router);
