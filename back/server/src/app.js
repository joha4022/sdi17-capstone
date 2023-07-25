// app.js
//require('dotenv').config();
const express = require('express');

const app = express();
const cors =require('cors');
const PORT = process.env.PORT || 3001;
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV||'development']);


app.use(express.json());
app.use(cors());

app.get('/', function(req, res) {
    knex('users')
        .select('*')
        .then(data => res.status(200).json(data))
        .catch(err =>
        res.status(404).json({
            message:
            'The data you are looking for could not be found. Please try again'
        })
        );
    });


app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
    });