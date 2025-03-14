const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes');

class App {

  constructor() {
    this.express = express();

    // Headers must be the first called
    this.headers();
    this.middlewares();
    this.routes();
    this.static();
    this.database();
    this.errors();
  }

  routes() {
    this.express.use('/api', routes);
  }

  static() {
    this.express.use('/', express.static('src/static'));
  }

  database() {
    mongoose.connect(
      'mongodb+srv://root:' + 
      process.env.MONGO_PW + 
      '@mongo-db-cekcg.mongodb.net/speech-api?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
  }

  middlewares() {
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(bodyParser.json());
  } 

  headers() {
    this.express.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      );
      if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
        return res.status(200).send();
      };
      next();
    });
  }

  errors() {
   //
  }
}

module.exports = new App().express;