import axios from 'axios';

export default async function getPaymentData(token, limit = 0) {

   try {
      const response = await axios({
         method: 'get',
         url: `/api/payments/dashboard?limit=${limit}`,
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