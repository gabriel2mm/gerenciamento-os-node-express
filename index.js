const express = require('express')
const app = express()

require('./src/controllers/index')(app)
require('./src/middlewares/error')(app)

app.listen(8080, () => { Configuration.ENVIRONMENT === "stage" ? console.log("Server is running!!!") : null })