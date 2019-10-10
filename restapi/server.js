const config = require('./common/config/env.config.js');
const express= require('express');
const app=express();
const AuthorizationRouter = require('./auth/routes.config');
const bodyparser=require('body-parser');
const UsersRouter = require('./users/routes.config');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});
 
var jwt = require("jsonwebtoken");

AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);

app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});
