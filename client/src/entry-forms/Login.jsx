import axios from 'axios';
import { useState } from 'react';
 
function Login() {
   const [ loginData, setLoginData ] = useState({ email: '', password: ''});
   const [ errorMessage, setErrorMessage ] = useState('')

   function handleFormChange(e) {
      const { name, value} = e.target;

      setLoginData({ ...loginData, [name]: value});
   }

   async function handleLogin(e) {
      e.preventDefault();
      
      if (loginData.password) {
         try {
            await axios({
               method: 'post',
               url: 'api/user/login',
               data: JSON.stringify(loginData),
               headers: {
                  'Content-Type' : 'application/json'
               }
            }) 
         } catch (err) {
            console.log(err)
            setErrorMessage('Incorrect Credentials')
         }
      }
   };

   return (
      <form onSubmit={handleLogin} className='form-container'>
         <div className='form-inputs-container'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' onChange={handleFormChange} id='email' />
         </div>

         <div className='form-inputs-container'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' onChange={handleFormChange} id='password' />
         </div>

         {errorMessage && 
            <div>
               <p className='error-message'>{errorMessage}</p>
            </div>
         }

         <button type='submit'>Login</button>
      </form>
   )
};

export default Login;