const express = require('express');
const mongoDB = require('./config/connection');
const routes = require('./routes/index');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client", "build")));

app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, './client/build', 'index.html'))
});

app.use(routes);

mongoDB.once('open', () => {
   app.listen(PORT , () => {
      console.log(`Now listening on port: ${PORT}`)
   });
});
