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
            console.log(response)

            setPayments([...response.data])

         } catch(err) {
            console.log(err)
         }
      }

      paymentData();
   }, []);

   return (
      <div className='full-payment-container'>
         <PaymentListHeader />
         {payments.map(element => {
            const { category, paymentAmount, paymentDate, _id} = element;

            return <div className='past-payments-cell' key={_id}>
               <span>{paymentDate}</span>
               <span>{category}</span>
               <span>{paymentAmount.$numberDecimal}</span>
               <span>Delete Icon</span>
            </div>
         })}
     </div>
   )
};

export default PastPaymentFull;
