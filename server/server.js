const express = require('express');
const db = require('./config/connection.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Express MiddleWare 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

db.once('open', () => {
   app.listen(PORT, () => {
      console.log(`Now lisening on Port: ${PORT}`)
   })
});

