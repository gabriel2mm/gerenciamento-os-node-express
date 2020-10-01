const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream')

const accessLogStream = rfs.createStream('../../../../logs/systemOut.log', {
  interval: '1d',
  path: path.join(__dirname, 'log'),
})

morgan.token('id', (req, res) => req.userId ? req.userId : "anonymous");
module.exports = app => app.use(morgan('[:date[iso] #:id] :method :url :status :res[content-length] - :response-time ms', {stream: accessLogStream }))