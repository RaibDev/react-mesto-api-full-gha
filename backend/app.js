const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { errorLogger, requestLogger } = require('./middlewares/logger');
// const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {

});

app.use(express.json());

app.use(requestLogger); // Логируем запросы
app.use(cors()); // Разрешаем кросс-доменные запросы

app.get('/crash-test', () => { // Для ревьюеров
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);

app.use(errorLogger); // Логируем ошибки
app.use(errors());

app.use(errorHandler); // Обработчик ошибок

app.listen(PORT, () => {
  console.log(`Attention! App listening ${PORT} PORT`);
});
