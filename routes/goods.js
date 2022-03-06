var express = require('express');
var route = express.Router();
var mysql = require('mysql');

var genConnection = () => {
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'zaq1@WSX',
        database: 'my_db'
    });
    conn.connect();
    return conn;
}

route.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

route.use(function (req, res, next) {
    //if (!req.headers['cookie']) return next('router');
    next();
})


const goodsView = function (res, options) {
    res.render('goods', options);
}

route.get('/', function (req, res, next) {
    const connection = genConnection();
    connection.query('select name from goods', function (err, rows, fields) {
        if (err) {
            return next(err);
        }
        connection.end();
        res.json({
            fruits: rows
        });
    });
})

route.get('/:id', function (req, res, next) {
    if (req.params.id === '0') {
        next('route');
    } else {
        next();
    }
}, function (req, res, next) {
    goodsView(res, {
        goodsId: req.params.id
    })
});

route.get('/:id', function (req, res, next) {
    const connection = genConnection();
    connection.query('select name from goods where name = ?', ['apple'], function (err, rows, fields) {
        if (err) {
            return next(err);
        }
        connection.end();
        res.json(rows[0]);
    });
});

module.exports = route;
