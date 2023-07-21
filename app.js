require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000, BD_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const limiter = require('./middlewares/limiter');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect(BD_URL);

app.use(helmet());

app.use(express.json());

app.use(cors());

app.use(limiter);

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
