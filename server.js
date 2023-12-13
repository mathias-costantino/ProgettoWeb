"use strict";

const express = require('express');
const {check, oneOf, validationResult} = require('express-validator');
const morgan = require('morgan');
const cors = require('cors');


const appDataRouter = require('./router/datarouter');

const app = express();
app.use(morgan('tiny'));

app.use(cors());
app.use(express.json());
app.use('/api', appDataRouter);     
 

app.use(express.static(__dirname + '/public'));

const PORT = 3000;



app.get('/', (req, res) => {
    res.redirect('index.html');
});

app.get('*', (req, res) => {
    res.redirect('index.html');
})

app.listen(PORT, () => console.log(`Porta: ${PORT}`));