import axios from 'axios';
import auth from '../utills/auth';

export default async function handleDeleteItem(paymentId) {
   console.log(paymentId)
   const token = auth.getToken();

   try {
      await axios({
         method: 'delete',
         url: `/api/payments/${paymentId}`,
         headers: {
            'Content-Type' : 'application/json',
            'Authorization' : token
         }
      })
   } catch (error) {
      throw new Error(error)
   }
}