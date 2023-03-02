const jwt = require('jsonwebtoken');

require('dotenv').config();

function signToken(content) {
   const token = jwt.sign(content, process.env.TOKEN_SECRET, { expiresIn: '2h' });

   return token
};

function authenticateToken(req, res, next) {
   const authHeader = req.header['authorization'];

   // remove Bearer from token 
   const token = authHeader && authHeader.spit(' ').pop().trim();

   if (token === null) {
      return res.status(401);
   };

   jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
         return res.status(403)
      }

      req.user = user;

      next()
   })
};


module.exports = { signToken, authenticateToken }