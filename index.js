const PORT = 3001
const express = require('express')
const server = express();
const apiRouter = require('./api');
const morgan = require('morgan');
const { client } = require('./db');
client.connect();

server.use(morgan('dev'));

server.use(express.json())


server.use('/api', apiRouter);

server.use((req, res, next) => {
    console.log("<--Body Logger Start-->");
    console.log(req.body);
    console.log("<--Body Logger End-->");

    next();
});

server.listen(PORT, () => {
    console.log('Server Up on Port:', PORT)
});