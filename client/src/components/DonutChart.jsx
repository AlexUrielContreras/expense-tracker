import { Chart } from 'react-google-charts';
import { useState, useEffect } from 'react';

import Auth from '../utills/auth';
import getUser from '../axios/getUser';

function DonutChart({ madePayment }) { 
   const [ payArr, setPayArr ] = useState([]);

   useEffect(() => {
      async function getPayment() {
         const token = Auth.getToken()
         try {
            const response = await getUser(token);

            setPayArr(response.data.payments);
         } catch (err) {
            console.log(err)

         }
      }

      getPayment()
   }, [madePayment]);

   function paymentData() {
      let data = [
         ['Category', 'Amount']
      ];

      const paymentSet = [];
   
      payArr?.forEach(el => {
         const category = el.category;
         const amount = parseFloat(el.paymentAmount.$numberDecimal);
   
         let dupIndex = 0
   
         const dups = paymentSet?.some((element2, i) => {
           if (element2[0] === category) {
               dupIndex = i;
               return true
           } else {
               return false
           }
         })
   
         if ( !dups ) {
            paymentSet.push([category, amount])
         } else {
            const newAmount = paymentSet[dupIndex][1] + amount
   
            paymentSet[dupIndex][1] = newAmount
         }
      });

      paymentSet.forEach(keys => {
         data = [...data, keys]
      });

      return data
   }

   const options = {
      pieHole: 0.3,
      height: '400',
      width: '370',
      chartArea: {width:'98%', height: '100%'},
      legend: 'none', 
      backgroundColor: 'lightgrey',
      fontSize: 15,
      pieSliceText: 'label'
   }

   return (

      <Chart 
         chartType='PieChart'
         data={paymentData()}
         options={options}
      /> 
   )
};

export default DonutChart;