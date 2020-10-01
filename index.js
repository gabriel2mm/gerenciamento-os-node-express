const Configuration = require('./src/config/readYaml/index');
const express = require('express')
const app = express()

require('./src/config/fileupload/index')(app)
require('./src/config/blacklist/index')(app)
require('./src/config/bodyParser/index')(app)
require('./src/config/cors/index')(app)
require('./src/config/cors/AllowDomain')(app)
require('./src/config/log/index')(app)
require('./src/controllers/index')(app)
require('./src/middlewares/error')(app)


app.listen(80, () => { console.log(8080)})