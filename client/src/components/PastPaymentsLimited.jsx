import axios from 'axios';
import Auth from '../utills/auth';
import trashIcon from '../assets/trash-icon.png'

import formatMoney from '../utills/moneyFormat';
import handleDelete from '../axios/deleteItem';

import { useState, useEffect } from 'react';

function PastPaymentsLimited({ setMadePayment, madePayment }) {
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

            setPastPayments([...response.data]);
         } catch (err) {
            console.log(err)
         }
      }

      getPaymentData()
   }, [madePayment]);

   function dateFormat(date) {
      return date.split('T')[0]
   }

   return (
     pastPayments.map(data => {
      return <div className='past-payments-cell' >
         <span>{dateFormat(data.paymentDate)}</span>
         <span>{data.category}</span>
         <span>{formatMoney(data.paymentAmount.$numberDecimal)}</span>
         <img onClick={() => {
               handleDelete(data._id)
               setMadePayment(true)
            }} 
            className='pointer'
            src={trashIcon} 
            alt='trash icon to delete payment'/>
      </div>

     })
   )
};

export default PastPaymentsLimited