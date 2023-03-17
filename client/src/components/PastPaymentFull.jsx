import getUser from '../axios/getUser';
import Auth from '../utills/auth';

import { useState, useEffect } from 'react';

function PastPaymentFull() {

   useEffect(() => {
      async function paymentData() {
         const token = Auth.getToken();
         
         try {
            const response = await getUser(token);
            console.log(response)

         } catch(err) {
            console.log(err)
         }
      }

      paymentData();
   }, []);

   return (
      <div style={{ color: 'white'}}>
         dsmkfjnds klfjdskfhdjk
      </div>
   )
};

export default PastPaymentFull;