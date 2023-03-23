import axios from 'axios';

export default async function getPaymentData(token) {
   return await axios({
      method: 'get',
      url: '/api/payments/dashboard',
      headers: {
         'Content-Type' : 'application/json',
         'Authorization' : token
      }
   })
}