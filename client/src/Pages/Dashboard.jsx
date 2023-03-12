import Auth from '../utills/auth';
import axios from 'axios';

import AddPayment from '../components/AddPayment';
import DonutChart from '../components/DonutChart';

import { useState, useEffect } from 'react';
import getUser from '../axios/getUser';

function Dashboard() {
   const [ username, setUsername ] = useState('');
   const [ budget, setBudget ] = useState();
   const [ madePayment, setMadePayment ] = useState(false);
   const [ spanEl, setSpanEl ] = useState('span');
   const [ monthlySpending, setMontlySpending ] = useState(0);

   useEffect(() => {
      const token = Auth.getToken();

      async function getData() {
         try {
            const response = await getUser(token);
            const { firstName, budgetAmount } = response.data;

            setUsername(firstName);
            setBudget(budgetAmount);
            setMadePayment(false)
         } catch (err) {
            console.log(err)
         }
      }

      getData();
   }, [madePayment]);

   async function handleBudgetSubmit(e) {
      e.preventDefault();

      const budgetAmount = parseFloat(e.target[0].value);
      const token = Auth.getToken();

      try {
         await axios({
            method: 'put',
            url: 'api/user/dashboard',
            data: {
               budgetAmount: budgetAmount
            },
            headers: {
               'Content-Type' : 'application/json',
               'Authorization' : token
            }
         });

         setMadePayment(true);
         setSpanEl('span');
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <div className='dash-container'>
         <header className='dash-header'>
            <h1>{username}'s Dashboard</h1>
            <input type='button' value='Logout' onClick={() => Auth.logout()}/>
         </header>

         <section className='dash-main-section'>
            <div className='dash-stats'>
               <div className='budget'>
                  {budget ? 
                     <h3>Budget: ${budget}</h3>
                  :
                     (spanEl === 'span' ? <span onClick={() => setSpanEl('form')} className='pointer'>Click here to set your monthly budget</span> :  
                        <form onSubmit={handleBudgetSubmit}>
                           <label htmlFor='budgetAmount'></label>
                           <input type='text' name='budgetAmount' id='budgetAmount'/>
                           <button type='submit'>Submit</button>
                        </form>
                     )
                  }           
               </div>

               <div className='amount-spent'>
                  <h3>Monthly Spending: {monthlySpending}</h3>
               </div>
            </div>

            <div className='id'>
               <div className='dash-google-chart'>
                  <DonutChart madePayment={madePayment}/>
               </div>

               <div className='dash-add-payment'>
                  <div>
                     <h2 className='dash-pay-title'>Add Payment</h2>
                  </div>
                  <AddPayment setMadePayment={setMadePayment} />
               </div>
            </div>
         </section>

         <section className='dash-past-payment'>

         </section>
      </div>
   )
};

export default Dashboard;