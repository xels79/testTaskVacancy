# testTaskVacancy
 Тестовое задания для работодателя

### Стэк
- Клиент - *React + bootstrap 5*
- Сервер - *Nestjs + Sequelize + MySqlite*
- Node - v24.16.0

bootstrap - выбрал по тому, что нравится он мне. Прочие библиотеки тяжелее. И унас, в тех задание, никаких наворотов нет...

NestJs - Удобен, в не большом приложение. Да и знаком с ним хорошо. Sequelize - проба пера. Решил использовать MySqlite, раньше его не использовал. Стал пробывать обёртки рекомендуемые на сайте NestJs. По порядку предложения Sequelize за работала без бубнов.

### Запуск

```
docker compose build
docker compose up -d
```
Флаг `-d` обязателен для post_start hook!
Ну, и: [http://localhost:8888](http://localhost:8888/)




