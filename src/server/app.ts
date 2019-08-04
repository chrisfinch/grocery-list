import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ListsModel from './models/lists.model';
import ClientApp from './../client/app';

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Express',
        reactContent: ReactDOMServer.renderToString(
            React.createElement(ClientApp, {}, null)
        )
    });
});

// List CRUD
app.get('/lists', (req, res) => {
    res.json(ListsModel.getLists());
});

app.post('/lists', (req, res) => {
    ListsModel.addList(req.body).then(createdList => res.json(createdList));
});

app.get('/lists/:id', (req, res) => {
    res.json(ListsModel.getList(req.params.id));
});

app.put('/lists/:id', (req, res) => {
    res.json(ListsModel.updateList(req.body));
});

app.delete('/lists/:id', (req, res) => {
    res.json(ListsModel.deleteList(req.params.id));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;
