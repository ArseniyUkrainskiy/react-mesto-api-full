## react-mesto-api-full 

Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. :panda_face:
Бэкенд в директории `backend/`, а фронтенд - в `frontend/`.

* Логирование запросов и ошибок express-winston, winston. Все запросы и ответы записываются в файл request.log. Все ошибки записываются в файл error.log.
* Платформа Яндекс.Облако. ВМ на Ubuntu 20.04. Деплой.
* SSH-ключ. Добавлен ключ команды Практикума для проверки. :eyes:
* Установлено: Node.js, MongoDB, git. Тестирование через Postman.
* Менеджер процессов pm2. В случае перезагрузки сервера, приложение запустится автоматически.
* Порты проброшены. HTTP-сервер nginx (Он умеет раздавать статические файлы, перенаправлять запросы, кешировать результат, и делает всё это очень быстро). Настроен файрвол.
* Создан .env-файл.
* CORS.
* Зарегистрирован домен :point_right: https://mesto.app.nomoredomains.club/ указывающий на публичный IP 84.201.176.11. Бэкенд на поддомене https://api.mesto.app.nomoredomains.club/.
* Шифрование данных. Протокол HTTPS. Сертификаты. К серверу можно обратиться по http и по https.
* Приложение в случае падения автоматически восстанавливается (для теста /crash-test).

[https://rb.ru/media/upload_tmp/2018/d5.gif]
