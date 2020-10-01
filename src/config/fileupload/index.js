const upload = require('express-fileupload');
module.exports = app => app.use(upload());