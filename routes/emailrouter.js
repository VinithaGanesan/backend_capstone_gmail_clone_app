const TokenShield = require('../Middlewares/TokenShield');
const { GET_ALL_EMAILS, COMPOSE_NEW_EMAIL, TOGGLE_STARRED_EMAIL, MOVES_EMAILS_TO_BIN, DELETE_EMAILS, SAVE_DRAFT_EMAIL } = require('../controller/emailcontroller');


const EmailRouter = require('express').Router();

//get all mails by its type using get method
EmailRouter.get('/emails/:type', TokenShield, GET_ALL_EMAILS);
//sent and save email and generate random reply mail using post method
EmailRouter.post('/save', COMPOSE_NEW_EMAIL);
// save draft email
EmailRouter.post('/savedraft', SAVE_DRAFT_EMAIL)
//toggle starred email using post method
EmailRouter.post('/starred', TOGGLE_STARRED_EMAIL);
// select mails and moved to bin
EmailRouter.post('/bin', MOVES_EMAILS_TO_BIN);
// detele mails
EmailRouter.delete('/delete', DELETE_EMAILS);

module.exports = EmailRouter;