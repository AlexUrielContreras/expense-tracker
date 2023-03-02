const express = require('express');
const mongoDB = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extented: true }))

app.use(routes)

mongoDB.once('open', () => {
   app.listen(PORT , () => {
      console.log(`Now listening on port: ${PORT}`)
   });
});
