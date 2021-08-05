const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 300, // limit each IP to 300 requests per windowMs
});
const helmet = require('helmet'); // защитить приложение от некоторых широко известных веб-уязвимостей
const { errors } = require('celebrate');
const corsHandler = require('./middlewares/corsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFound404 = require('./errors/notFound404');
const errorHandler = require('./middlewares/errorHandler');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { PORT = 3001 } = process.env;

app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger); // подключаем логгер запросов
app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());

app.use(corsHandler);

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('*', (req, res, next) => { next(new NotFound404('Запрашиваемый ресурс не найден')); });

app.use(errorLogger); // подключаем логгер ошибок
// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // Централизованная обработка ошибок

app.listen(PORT, () => {
  console.log(`Приложение запущено на ${PORT} порту`);
});
