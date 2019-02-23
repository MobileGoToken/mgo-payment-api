const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const routes = require('./api/routes');
const errorMiddleware = require('./api/middlewares/error');
require('./api/services/listener');


const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compress());
app.use(helmet());
app.use(cors());


app.use('/api/v1', routes);

app.use(errorMiddleware.normalizer);
app.use(errorMiddleware.notFound);
app.use(errorMiddleware.handler);

module.exports = app;
