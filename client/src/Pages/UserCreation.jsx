import Login from '../entry-forms/Login';
import Signup from '../entry-forms/Signup';

import { useState } from 'react';

function UserCreation() {
   const [ isLogin, setIsLogin ] = useState(true) 
   return (
      <div className='user-creation-container'>
         <div className='title-container'>
            <h1>My Expense Tracker</h1>
         </div>
         {isLogin ? 
            <section className='form-section'>
               <div className='login-container'>
                  <div className='login-header'>
                     <h2>Welcome Back</h2>
                     <p>Enter your credentials to start tracking your spending</p>
                  </div>
                  <Login />
               </div>

               <p className='form-cta' onClick={() => setIsLogin(false)}> Dont have an account yet -- Sign up here </p>
            </section>
         :
            <section className='form-section'>
               <div className='signup-container'> 
                  <div className='signup-header'>
                     <h2>Create an Account</h2>
                  </div>
                  <Signup />
               </div>

               <p className='form-cta' onClick={() => setIsLogin(true)}>Already have an account -- Login here</p>
            </section>
         }
      </div>
   )
};

export default UserCreation;