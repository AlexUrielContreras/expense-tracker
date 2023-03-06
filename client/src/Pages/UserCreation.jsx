import Login from '../entry-forms/Login';
import { useState } from 'react';

function UserCreation() {
   const [ isLogin, setIsLogin ] = useState(true) 
   return (
      <div className='user-creation-container'>
         <div className='title-container'>
            <h1>My Expense Tracker</h1>
         </div>
         {isLogin ? 
            <section>
               <div className='login-container'>
                  <div className='login-header'>
                     <h2>Welcome Back</h2>
                     <p>Enter your credentials to start tracking your spending</p>
                  </div>
                  <Login />
               </div>
               <p className='signup-cta' onClick={() => setIsLogin(false)}> Dont have an account yet --- Sign up here </p>
            </section>
         :
            <section className='signup-container'>
               {/* Sign up */}
            </section>
         }
      </div>
   )
};

export default UserCreation;