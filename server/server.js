const express = require('express');
const db = require('./config/connection.js');
const session = require('express-session');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3001;

// Express MiddleWare 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MongoStore = require('connect-mongo');

const sess = { 
   secret: process.env.COOKIE_PW,
   resave: false,
   saveUninitialized: true,
   cookie: {
      maxAge: new Date(Date.now() + 7200000), // 2 hours
      secure: true
   },
   store: MongoStore.create({
      client: db.getClient()
   })
};

app.use(session(sess));
app.use(require('./routes'));

db.once('open', () => {
   app.listen(PORT, () => {
      console.log(`Now lisening on Port: ${PORT}`)
   })
});

