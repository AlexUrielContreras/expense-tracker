import Auth from '../utills/auth';
import axios from 'axios';
import formatMoney from '../utills/moneyFormat'

import AddPayment from '../components/AddPayment';
import DonutChart from '../components/DonutChart';

import { useState, useEffect } from 'react';
import getUser from '../axios/getUser';

function Dashboard() {
   const [ username, setUsername ] = useState('');
   const [ budget, setBudget ] = useState();
   const [ madePayment, setMadePayment ] = useState(false);
   const [ budgetEdit, setBudgetEdit ] = useState(false);
   const [ monthlySpending, setMontlySpending ] = useState(0);

   useEffect(() => {
      const token = Auth.getToken();

      async function getData() {
         try {
            const response = await getUser(token);
            const { firstName, budgetAmount, payments } = response.data;

            setUsername(firstName);
            setBudget(budgetAmount);
            setMadePayment(false);
            setBudgetEdit(false);
            getMontlySpending(payments)
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

      if (!budgetAmount && budgetAmount !== 0) {
         return setBudgetEdit(false)
      };

      try {
         await axios({
            method: 'put',
            url: 'api/users/dashboard',
            data: {
               budgetAmount: budgetAmount
            },
            headers: {
               'Content-Type' : 'application/json',
               'Authorization' : token
            }
         });

         setMadePayment(true);
      } catch (err) {
         console.log(err)
      }
   }

   function getMontlySpending(total) {
      let monthlyAmount = 0

      for (let index in total) {
         monthlyAmount += parseFloat(total[index].paymentAmount.$numberDecimal)
      };

      setMontlySpending(monthlyAmount)
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
                  {!budgetEdit ?  
                     <h3>Budget:
                        {budget ? <span onClick={() => setBudgetEdit(true)} className={`pointer ${budget < monthlySpending ? 'over-budget' : 'under-budget'}`}> {formatMoney(budget)}</span> 
                        : 
                        <span onClick={() => setBudgetEdit(true)} className='pointer'> Click here to set your budget</span>}
                     </h3> 
                  :
                     <form onSubmit={handleBudgetSubmit} className='budget-form'>
                        <label htmlFor='budgetAmount'></label>
                        <input type='number' name='budgetAmount' placeholder='Enter your Monthly Budget' id='budgetAmount'/>
                        <button type='submit'>Submit</button>
                     </form>                      
                  }
               </div>

               <div className='dash-monthly-spending'>
                  <h3>Monthly Spending: {formatMoney(monthlySpending)}</h3>
               </div>
            </div>

            <div className='dash-pay-chart'>
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