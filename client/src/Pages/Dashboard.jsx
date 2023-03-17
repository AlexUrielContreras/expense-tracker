import Auth from '../utills/auth';
import axios from 'axios';
import formatMoney from '../utills/moneyFormat'

import AddPayment from '../components/AddPayment';
import DonutChart from '../components/DonutChart';
import PastPaymentsLimited from '../components/PastPaymentsLimited';

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
            getMontlySpending(payments);
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
      <div className='dashboard-container'>
         <header className='dashboard-header'>
            <h1 className='dashboard-title'>{username}'s Dashboard</h1>
            <input className='logout-btn' type='button' value='Logout' onClick={() => Auth.logout()}/>
         </header>

         <section className='dashboard-content'>
            <div className='dashboard-user-stats'>
               <div>
                  {!budgetEdit ?  
                     <h3>Monthly Budget:
                        {budget ? <span onClick={() => setBudgetEdit(true)} className={`pointer ${budget < monthlySpending ? 'over-budget' : 'under-budget'}`}> {formatMoney(budget)}</span> 
                        : 
                        <span onClick={() => setBudgetEdit(true)} className='pointer'> Click here to set your budget</span>}
                     </h3> 
                  :
                     <form onSubmit={handleBudgetSubmit} className='budget-form'>
                        <label htmlFor='budgetAmount'></label>
                        <input type='text' name='budgetAmount' placeholder='E.g 1000' id='budgetAmount' required/>
                        <button type='submit'>Submit</button>
                        <button tpye='button' onClick={() => setBudgetEdit(false)}>Cancel</button>
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
                  <h2 className='dash-pay-title'>Add Payment</h2>
                  <AddPayment setMadePayment={setMadePayment} />
               </div>
            </div>
         </section>

         <section className='dash-past-payments'>
               <div className='past-payment-titles'>
                  <h3>Date</h3>
                  <h3>Category</h3>
                  <h3>Amount</h3>
                  <h3>Delete</h3>
               </div>

               <div className='payment-list'>
                  <PastPaymentsLimited madePayment={madePayment}/>
               </div>
         </section>
         <div className='cta-past-payments'>
            <span onClick={() => {
               window.location.assign('/dashboard/payments')
            }}>View all payments</span>
         </div>
      </div>
   )
};

export default Dashboard;