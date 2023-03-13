import axios from 'axios';
import { useState } from 'react';

import Auth from '../utills/auth';

function Signup() {
   const [ formData, setFormData ] = useState({ firstName: '', budgetAmount:'', email: '', password: ''});

   function handleFormData(e) {
      const { name, value } = e.target;

      console.log(formData)
      setFormData({...formData, [name]: value});
   }

   async function handleFormSubmit(e) {
      e.preventDefault();

      if (formData.password) {
         try {
            const response = await axios({
               method: 'post',
               url: 'api/users/',
               data: JSON.stringify(formData),
               headers: {
                  'Content-Type' : 'application/json'
               }
            });

            const token = response.data.token

            Auth.login(token);
            
         } catch (err) {
            console.log(err)
         }

      
      }
   }

   return (
      <form className='form-container' onSubmit={handleFormSubmit}>
         <div className='form-inputs-container'>
            <label htmlFor='firstName'>First Name</label>
            <input type='text' name='firstName' id='firstName' onChange={handleFormData} required/>
         </div>

         <div className='form-inputs-container'>
            <label htmlFor='budgetAmount'>Monthly Budget</label>
            <input type='number' name='budgetAmount' id='budgetAmount' onChange={handleFormData} />
         </div>

         <div className='form-inputs-container'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' onChange={handleFormData} required/>
         </div>

         <div className='form-inputs-container'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' id='password' onChange={handleFormData} minLength='6' required/>
         </div>

         <button type='submit'>Sign up</button>
      </form>
   )
};

export default Signup;