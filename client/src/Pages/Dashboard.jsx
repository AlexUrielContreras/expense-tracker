import Auth from '../utills/auth';

import AddPayment from '../components/AddPayment';
import DonutChart from '../components/DonutChart';

import { useState, useEffect } from 'react';
import getUser from '../axios/getUser';

function Dashboard() {
   const [ payments, setPayments ] = useState([]);
   const [ username, setUsername ] = useState('');
   const [ budget, setBudget ] = useState();

   useEffect(() => {
      const token = Auth.getToken();

      async function getData() {
         try {
            const response = await getUser(token);
            const { firstName, budgetAmount, payments } = response.data;

            setUsername(firstName);
            setBudget(budgetAmount);
            setPayments([...payments])
         } catch (err) {
            console.log(err)
         }
      }

      getData();
   }, []);

   return (
      <div className='dash-container'>
         <header className='dash-header'>
            <h1>{username}'s Dashboard</h1>
            <input type='button' value='Logout' onClick={() => Auth.logout()}/>
         </header>

         <section className='dash-main-section'>
            <div className='dash-google-chart'>
               <DonutChart />
            </div>

            <div className='dash-add-payment'>
               <div className='dash-pay-header'>
                  <h2>Add Payment</h2>
               </div>
               <AddPayment />
            </div>
         </section>

         <section className='dash-past-payment'>

         </section>
      </div>
   )
};

export default Dashboard;