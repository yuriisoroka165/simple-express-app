const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// підключення маршрутів
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

// екземпляр програми
const app = express();

// підключення шаблонів
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// підключення проміжного ПЗ
// логер
app.use(logger("dev"));
// обробка JSON і даних з форм
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// модуль для роботи з cookie
app.use(cookieParser());
// обробник статичних ресурсів
app.use(express.static(path.join(__dirname, "public")));

// підлючення роутерів до програми
app.use("/", indexRouter);
app.use("/users", usersRouter);

// порядок проміжного ПЗ має значення
// в кінці прграми йде обробник помилок
// спочатку обробляється неіснуючий роут або помилка 404
app.use(function (request, response, next) {
    next(createError(404));
});

// тут відбувається обробка помилки
// прокидаються змінні message та error у шаблон error.ejs і виконуємо його рендер
app.use(function (error, request, response, next) {
    // set locals, only providing error in development
    response.locals.message = error.message;
    response.locals.error =
        request.app.get("env") === "development" ? error : {};

    // render the error page
    response.status(error.status || 500);
    response.render("error");
});

module.exports = app;
