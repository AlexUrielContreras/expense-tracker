import axios from 'axios';
import { useState } from 'react';

import Auth from '../utills/auth';
 
function Login() {
   const [ loginData, setLoginData ] = useState({ email: '', password: ''});
   const [ errorMessage, setErrorMessage ] = useState('')

   function handleFormChange(e) {
      const { name, value} = e.target;

      setErrorMessage('');
      setLoginData({ ...loginData, [name]: value});
   }

   async function handleLogin(e) {
      e.preventDefault();
      
      if (loginData.password) {
         try {
            const response = await axios({
               method: 'post',
               url: 'api/users/login',
               data: JSON.stringify(loginData),
               headers: {
                  'Content-Type' : 'application/json'
               }
            });

            const token = response.data.token
            Auth.login(token);
            
         } catch (err) {
            console.log(err)
            setErrorMessage(`${err.response.data.message}`)
         }
      }
   };

   return (
      <form onSubmit={handleLogin} className='form-container'>
         <div className='form-inputs-container'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' onChange={handleFormChange} id='email' required/>
         </div>

         <div className='form-inputs-container'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' onChange={handleFormChange} id='password' required/>
         </div>

         {errorMessage && 
            <div className='login-error-container'>
               <p className='error-message'>{errorMessage}</p>
            </div>
         }

         <button type='submit' className='pointer'>Login</button>
      </form>
   )
};

export default Login;