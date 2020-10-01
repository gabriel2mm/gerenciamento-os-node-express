const express = require('express')
const Order = require('../models/order')
const Configuration = require('../config/readYaml/index');
const AuthMiddleware = require('../middlewares/auth')

const router = express.Router();
router.use(AuthMiddleware.authMiddleware);
router.get('/', async (req, res) => {
  const orders = await Order.find({}).populate('user').populate('request')
  return res.status(200).json(orders)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({ _id: id }).populated('user').populate('request').catch(err => [])
  return res.status(200).json(order)
})

router.post('/', (req, res, next) => {
  const { body } = req;
  Order.create({ ...body, user: { _id: req.userId } }).then(response => {
    return res.status(200).send();
  }).catch(errr => {
    const error = new Error("Não foi possível criar order")
    error.httpStatusCode = 400
    next(error)
  })
})

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  Order.updateOne({ _id: id }, req.body)
    .then(u => {
      return res.status(200).send()
    }).catch(err => {
      console.error("Não foi possível atualizar ordem : ", err)
      const error = new Error("Não foi possível atualizar order")
      error.httpStatusCode = 400
      next(error)
    })
})

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Order.deleteOne({ _id: id })
    .then(r => res.status(200).send())
    .catch(err => {
      console.error("Não foi possível excluir ordem : ", err)
      const error = new Error("Não foi possível deletar order")
      error.httpStatusCode = 400
      next(error)
    })
})

router.get("/find/user/:id", (req, res) => {
  const { id } = req.params;
  const orders = Order.find({ user: { "_id": id } }).populate("user").populate("request")

  return res.status(200).json(orders);
})

router.get("/find/request/:id", (req, res) => {
  const { id } = req.params;
  const orders = Order.find({ request: { "_id": id } }).populate("user").populate("request")

  return res.status(200).json(orders);
})

router.get('/file/upload/:id', async (req, res, next) => {
  const { id } = req.params;
  const dir = Configuration.UPLOAD_DIR;

  const order = await Order.findOne({ _id: id }).populated('user').populate('request');
  if (order) {
    return res.download(`./${dir}/${order.attachment}`);
  }

  const error = new Error("Não foi realizar download do arquivo")
  error.httpStatusCode = 400
  next(error)
});

router.post("/file/upload/:id", (req, res, next) => {
  const { id } = req.params;
  const { attachment } = req.files;
  const dir = Configuration.UPLOAD_DIR;

  let name = attachment.name.split(".");
  name[0] = `${name[0]}-${Date.now()}`;
  name = name.join(".");

  attachment.mv(`./${dir}/${name}`, function (err, result) {
    if (err)
      return res.status(400).send(err);

    Order.updateOne({ _id: id }, { attachment: name })
      .then(u => {
        res.status(200).send()
      }).catch(err => {
        console.error("Não foi possível atualizar ordem : ", err)
        const error = new Error("Não foi possível realizar upload de arquivo")
        error.httpStatusCode = 400
        next(error)
      })
  });
});

module.exports = app => app.use('/orders', router);