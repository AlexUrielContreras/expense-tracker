import axios from 'axios';
import Auth from '../utills/auth';

import { useState, useEffect } from 'react';

function PastPaymentsLimited({ madePayment }) {
   const [ pastPayments, setPastPayments ] = useState([]);

   useEffect(() => {
      const token = Auth.getToken();

      async function getPaymentData() {

         try {
            const response = await axios({
               method: 'get',
               url: 'api/payments/dashboard?limit=5',
               headers: {
                  'Content-Type' : 'application/json',
                  'Authorization' : token
               }
            })

            console.log(response)
            setPastPayments([...response.data])
         } catch (err) {
            console.log(err)
         }
      }

      getPaymentData()
   }, [madePayment])

   function dateFormat(date) {
      return date.split('T')[0]
   }

   return (
     pastPayments.map(data => {
      return <div className='past-payments-cell'>
         <span>{dateFormat(data.paymentDate)}</span>
         <span>{data.category}</span>
         <span>{data.paymentAmount.$numberDecimal}</span>
         <span>trash icon</span>
      </div>

     })
   )
};

export default PastPaymentsLimited