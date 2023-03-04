function Login() {

   function handleLogin(e) {
      e.preventDefault();
      console.log('hi')
   };

   return (
      <form onSubmit={handleLogin} className='form-container'>
         <div className='form-inputs-container'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' />
         </div>

         <div className='form-inputs-container'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' id='password' />
         </div>

         <button type='submit'>Login</button>
      </form>
   )
};

export default Login;