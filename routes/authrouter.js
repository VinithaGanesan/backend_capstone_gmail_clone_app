const AuthorizationShield = require('../Middlewares/AuthorizationShield');
const TokenShield = require('../Middlewares/TokenShield');
const { SIGNUP_NEW_USER, LOGIN_USER, GET_ALL_USERS } = require('../controller/authcontroller');



const AuthRouter = require('express').Router();

AuthRouter.post('/create', SIGNUP_NEW_USER);

AuthRouter.post('/signin', LOGIN_USER);

AuthRouter.get('/list', TokenShield, AuthorizationShield, GET_ALL_USERS);

module.exports = AuthRouter;