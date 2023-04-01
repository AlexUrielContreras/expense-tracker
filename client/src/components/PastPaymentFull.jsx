import getPaymentData from '../axios/getUserPayments';
import Auth from '../utills/auth';

import PaymentListHeader from '../components/PaymentListHeader';

import { useState, useEffect } from 'react';

function PastPaymentFull() {
   const [ payments, setPayments ] = useState([]);


   useEffect(() => {
      async function paymentData() {
         const token = Auth.getToken();
         
         try {
            const response = await getPaymentData(token);
            setPayments([...response.data]);
   
         } catch(err) {
            throw err
         }
      }

      paymentData();
   }, []);

   function getDate(date) {
      if (typeof date !== 'string') {
         throw new Error('Invalid date format. Expected a string.');
      }
      
      const dataParts = date.split('T');
      if (dataParts.length !== 2 ) {
         throw new Error('Invalid date format. Expected a string in the format of "YYYY-MM-DD:HH:MM:SS".')
      }

      return dataParts[0];
   }

   return (
      <div className='full-payment-container'>
         <PaymentListHeader />
         {payments.map(element => {
            const { category, paymentAmount, paymentDate, _id} = element;

            return <div className='past-payments-cell' key={_id}>
               <span>{getDate(paymentDate)}</span>
               <span>{category}</span>
               <span>{paymentAmount.$numberDecimal}</span>
               <span>Delete Icon</span>
            </div>
         })}
     </div>
   )
};

export default PastPaymentFull;
