import axios from 'axios';

export default async function getPaymentData(token) {

   try {
      const response = await axios({
         method: 'get',
         url: '/api/payments/dashboard',
         headers: {
            'Content-Type' : 'application/json',
            'Authorization' : token
         }
      })

      return response;
   } catch (err) {
      throw new Error(`Failed to fetch payment data ${err.response.status}`)
   }
}