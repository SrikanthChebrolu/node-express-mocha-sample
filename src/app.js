var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

var app = express();
const port = 5000;

var router = express.Router();

app.use('/', router);

router.use(compression());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


//Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Node Sample Project',
      version: '1.0.0',
      description:
        'This Project gives a Basic Idea of the Node Backed with Express and Test with Mocha',
      contact: { email: 'srikanthchebrolu3333@gmail.com' },
      servers: ['http://localhost:' + port]
    }
  },
  swagger: '2.0',
  openapi: '3.0.0',
  basePath: '/v1/api',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  apis: ['app.js']
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
router.use('/api-docs', swaggerUI.serve);
router.get('/api-docs', swaggerUI.setup(swaggerDocs, { explorer: true }));

router.get('/v1/api/us', (req, res) => {
  res.send('Hello World!');
});

router.get('/v1/api/users', (req, res, next) => {
  res.send(['Tony', 'Lisa', 'Michael', 'Ginger', 'Food']);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;