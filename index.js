const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.json({init : 'olá mundo'})
})

app.listen(8080, () => { console.log("server on") })