import axios from 'axios';
import auth from '../utills/auth';

export default async function handleDeleteItem(paymentId) {
   let token = auth.getToken();

   if (!token) {
      throw new Error('Authentication token is missing. Please login again.');
   }

   try {
      return await axios({
         method: 'delete',
         url: `/api/payments/${paymentId}`,
         headers: {
            'Content-Type' : 'application/json',
            'Authorization' : token
         }
      })
   } catch (error) {
      console.error(`Failed to delete payment with ID ${paymentId}: ${error.message}`);
      throw new Error('Failed to delete payment. Please try again later.');
   }
}