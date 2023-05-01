const account = require('../routes/account');
const bodyParser = require('body-parser');
const config = require('../config/database');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');

const app = express();

const port = 3000;

app.use(passport.initialize());
app.use(passport.session());

require('../config/passport');

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