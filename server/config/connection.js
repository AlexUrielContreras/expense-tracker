const mongooes = require('mongoose');

mongooes.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/expense-tracker', {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).catch(
   error => handleError(error)
);

module.exports = mongooes.connection