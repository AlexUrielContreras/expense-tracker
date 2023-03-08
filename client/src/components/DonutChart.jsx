import { Chart } from 'react-google-charts';

function DonutChart() {
   
   let data = [ 
      ['Category', 'Amount'],
      ['Rent', 2000]
   ]

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