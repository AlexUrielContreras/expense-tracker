import getPaymentData from '../axios/getUserPayments';
import Auth from '../utills/auth';
import trashIcon from '../assets/trash-icon.png';
import deleteItem from '../axios/deleteItem';

import PaymentListHeader from '../components/PaymentListHeader';

import { useState, useEffect } from 'react';

function PastPaymentFull({ madePayment, setMadePayment }) {
   const [ payments, setPayments ] = useState([]);

   useEffect(() => {
      async function paymentData() {
         const token = Auth.getToken();
         
         try {
            const response = await getPaymentData(token);
            setPayments([...response.data]);
            
            setMadePayment(false)
         } catch(err) {
            throw err
         }
      }

      paymentData();
   }, [madePayment]);

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
               <img src={trashIcon} alt='delete payment' onClick={() => {
                     deleteItem(_id)
                     setMadePayment(true)
                  }} className='pointer'/>
            </div>
         })}
     </div>
   )
};

export default PastPaymentFull;
