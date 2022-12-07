const express = require('express');
const db = require('./config/connection.js');

const app = express();

const PORT = process.env.PORT || 3001;

// Express MiddleWare 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

db.once('open', () => {
   app.listen(PORT, () => {
      console.log(`Now lisening on Port: ${PORT}`)
   })
});

