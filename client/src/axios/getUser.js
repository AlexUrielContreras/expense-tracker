import axios from 'axios';

async function getUser(token) {
   return await axios({
      method: 'get',
      url: 'api/users/dashboard',
      headers: {
         'Content-Type' : 'application/json',
         'Authorization' : token
      }
   })
};

export default getUser;