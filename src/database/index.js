const Configuration = require('../config/readYaml/index');
const mongoose = require('mongoose');

mongoose.connect(Configuration.DATA.MONGO_HOST || "", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, });
mongoose.Promise = global.Promise;

module.exports = mongoose;