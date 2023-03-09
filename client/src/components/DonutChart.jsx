import { Chart } from 'react-google-charts';
import { useState } from 'react';

function DonutChart({ payments }) { 
   const [ payArr, setPayArr ] = useState([['Rent', 1000]]);

   for (let index in payments) {
      const category = payments[index].category;
      const amount = parseFloat(payments[index].paymentAmount.$numberDecimal);

      let dupIndex;

      const dup = payArr?.some((ele, i) => {
         const valid = ele[0] === category
         
         if ( valid ) {
            dupIndex = i;
            return true
         }

         return false
      });

      if ( !dup ) {
         setPayArr([...payArr, [category, amount]]);

      } else {
         const updatedAmount = payArr[dupIndex][1] + amount;

      };

   }

   let data = [
      ['Category', 'Amount']
   ]

   payArr.map(keys => {
      return data = [...data, keys]
   })

   const options = {
      pieHole: 0.3,
      height: '350',
      width: '350',
      chartArea: {width:'100%', height: '100%'},
      legend: 'none', 
      backgroundColor: 'lightgrey'
   }

   return (
      <Chart 
         chartType='PieChart'
         data={data}
         options={options}
      />
   )
};

export default DonutChart;