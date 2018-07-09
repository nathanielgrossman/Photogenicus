const express = require("express");
const fileUpload = require("express-fileupload");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();
const routes = require('./routes/ImageRoutes');

// needed to allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// this is to be able to serve static images from express
app.use(express.static(__dirname + "/public/true"));
app.use(express.static(__dirname + "/public/false"));
app.use(express.static(__dirname + "/public/fresh"));
app.use(express.static(__dirname + "/public"));

// for the file upload
app.use(fileUpload());

app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});