const express = require('express');
const mongoDB = require('./config/connection');
const app = express();

const PORT = process.env.PORT || 3001;

mongoDB.once('open', () => {
   app.listen(PORT , () => {
      console.log(`Now listening on port: ${PORT}`)
   });
});
