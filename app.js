const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dataStoreRouter = require('./routes/datastore');

const cors = require("cors");

const app = express();

app.use(cors())


app.set("port",process.env.PORT || 3001);


app.listen(3001, function () {
    console.log('CORS-enabled web server listening on port 3001')
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Routers definitions
app.use('/data/exoplanet', dataStoreRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;