const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('../config/database');
const account = require('../routes/account');

const app = express();

const port = 3000;

app.use(bodyParser.json());

//add static folder
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.bd, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log('Database connected successfully');
});
mongoose.connection.on('error', (err) => {
    console.log('Database NOT connected: ' + err);
});

app.get('/', (req, res) => {
    res.send('Main page');
});
app.use('/account', account);

app.listen(port, () => {
    console.log("Server started on port: " + port)
});