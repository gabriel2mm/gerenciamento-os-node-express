const Configuration = require('../config/readYaml/index');
const mongoose = require('mongoose');

if(Configuration.DATA.MONGO_HOST !== undefined && Configuration.DATA.MONGO_HOST !== null && Configuration.DATA.MONGO_HOST.trim().length > 0){
  mongoose.connect(Configuration.DATA.MONGO_HOST || "", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, });
  mongoose.Promise = global.Promise;
}

module.exports = mongoose;