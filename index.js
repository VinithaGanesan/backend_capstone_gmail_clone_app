const express = require('express');

const cors = require('cors');
const { connectToDatabase } = require('./database/dbconfig');

const HTTP_SERVER = express();

//enabling cors
HTTP_SERVER.use(cors());

HTTP_SERVER.use(express.urlencoded({ extended: true }));
HTTP_SERVER.use(express.json({ extended: true }));

// configuring dotenv package
require('dotenv').config();

// Defining a PORT and listening to port with express server
const PORT = process.env.DEV_SERVER_PORT;

HTTP_SERVER.listen(PORT, process.env.NODE_HOSTNAME, () => {
    console.log(`Server started successfully ${PORT}`)
});

//connecting with mongodb database
connectToDatabase();

// enabling routes
HTTP_SERVER.use('/', require('./routes/emailrouter'));
HTTP_SERVER.use('/auth', require('./routes/authrouter'));

