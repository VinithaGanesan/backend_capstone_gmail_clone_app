const TokenShield = require('../Middlewares/TokenShield');
const { GET_ALL_EMAILS, COMPOSE_NEW_EMAIL } = require('../controller/emailcontroller');


const EmailRouter = require('express').Router();

//get all mails by its type using get method
EmailRouter.get('/emails/:type', TokenShield, GET_ALL_EMAILS);
//sent and save email and generate random reply mail using post method
EmailRouter.post('/save', COMPOSE_NEW_EMAIL);

module.exports = EmailRouter;