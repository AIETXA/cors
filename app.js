const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const router = require('./routes')

app.use(cors())
app.use('/', router);

app.listen(3000, () => {
    console.log('Express esta escuchando en el puerto http://localhost:3000');
   })