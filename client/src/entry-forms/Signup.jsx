import axios from 'axios';
import { useState } from 'react';

function Signup() {
   const [ formData, setFormData ] = useState({ firstName: '', budget:'', email: '', password: ''});

   function handleFormData(e) {
      const { name, value } = e.target;

      console.log(formData)
      setFormData({...formData, [name]: value});
   }

   async function handleFormSubmit(e) {
      e.preventDefault();

      if (formData.password) {
         const response = await axios({
            method: 'post',
            url: 'api/user/',
            data: JSON.stringify(formData),
            headers: {
               'Content-Type' : 'application/json'
            }
         });

         console.log(response)
      }
   }

   return (
      <form className='form-container' onSubmit={handleFormSubmit}>
         <div className='form-inputs-container'>
            <label htmlFor='firstName'>First Name</label>
            <input type='text' name='firstName' id='firstName' onChange={handleFormData} required/>
         </div>

         <div className='form-inputs-container'>
            <label htmlFor='budget'>Monthly Budget</label>
            <input type='number' name='budget' id='budget' onChange={handleFormData} />
         </div>

         <div className='form-inputs-container'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' onChange={handleFormData} required/>
         </div>

         <div className='form-inputs-container'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' id='password' onChange={handleFormData} required/>
         </div>

         <button type='submit'>Sign up</button>
      </form>
   )
};

export default Signup;