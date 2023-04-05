import Auth from '../utills/auth';
import trashIcon from '../assets/trash-icon.png'

import formatMoney from '../utills/moneyFormat';
import handleDelete from '../axios/deleteItem';
import getUserPayments from '../axios/getUserPayments'

import { useState, useEffect } from 'react';

function PastPaymentsLimited({ setMadePayment, madePayment }) {
   const [ pastPayments, setPastPayments ] = useState([]);

   useEffect(() => {
      const token = Auth.getToken();

      async function getPaymentData() {

         try {
            const response = await getUserPayments(token, 5)

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
      pastPayments.length === 0 ? <div style={{ color: 'white'}}>Any new payments will be shown here</div> : 
      
      pastPayments.map(data => {
       return <div className='past-payments-cell' key={data._id} >
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