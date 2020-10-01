const Configuration = require('../config/readYaml/index');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://gabriel2mm:gabriel2mm@cluster0.u67ah.gcp.mongodb.net/GerenciamentoOS", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, });
mongoose.Promise = global.Promise;

module.exports = mongoose;