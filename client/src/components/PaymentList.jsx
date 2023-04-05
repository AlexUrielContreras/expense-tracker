import getUserPayment from '../axios/getUserPayments';
import  deleteItem from '../axios/deleteItem';
import formatMoney from '../utills/formatMoney'; 

import auth from '../utills/auth';

import trashIcon from '../assets/trash-icon.png'

import { useState, useEffect } from 'react';

function PaymentList({ limit, madePayment, setMadePayment }) {
   const [ paymentData, setPaymentData ] = useState([]);

   useEffect(() => {
      
      async function getPaymentData() {   
         const token = auth.getToken();

         try {
            const response = await getUserPayment(token, limit)

            setPaymentData([...response.data]);
            setMadePayment(false)
         } catch (error) {
            throw new Error(error);
         }
      }

      getPaymentData();
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
      paymentData.map(item => {
         const { category, paymentAmount, paymentDate, _id} = item;

         return <div className='past-payments-cell' key={_id}>
            <span>{getDate(paymentDate)}</span>
            <span>{category}</span>
            <span>{formatMoney(paymentAmount.$numberDecimal)}</span>
            <img src={trashIcon} alt='delete payment' onClick={() => {
                  deleteItem(_id)
                  setMadePayment(true)
               }} className='pointer'/>
         </div>
      })
   )
};

export default PaymentList;