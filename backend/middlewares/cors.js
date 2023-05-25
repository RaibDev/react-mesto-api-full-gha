const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'localhost:3000',
  'https://project.dubowitskiy.nomoredomains.monster',
  'http://project.dubowitskiy.nomoredomains.monster',
  'http://api.project.dubowitskiy.nomoredomains.rocks',
  'https://api.project.dubowitskiy.nomoredomains.rocks',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers; // Сохранем источник запроса
  const { method } = req; // Сохраняем метод запроса

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE'; // Задаем методы запросов по умолчанию
  const requestHeaders = req.headers['access-control-request-headers']; // Сохраняем список заголовков исходного запроса

  if (allowedCors.includes(origin)) { // проверяем, разрешен ли источник
    res.headers('Access-Control-Allow-Origin', origin); // Установили заголовок, разрешающий запросы
  }

  if (method === 'OPTIONS') { // Проверяем предзапрос ли это
    res.headers('Access-Control-Allow-Origin', DEFAULT_ALLOWED_METHODS); // Разрешаем кросдоменные запросы с методами по умолчанию
    res.headers('Access-Control-Allow-Origin', requestHeaders); // Разрешаем кросдоменные запросы с указанными заголовками
    return res.end();
  }

  return next();
};
