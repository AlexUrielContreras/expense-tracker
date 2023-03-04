function Login() {

   function handleLogin(e) {
      e.preventDefault();
      console.log('hi')
   };

   return (
      <form onSubmit={handleLogin}>
         <div>
            <label htmlfor='email'>Email</label>
            <input type='email' name='email' id='email' />
         </div>

         <div>
            <label htmlfor='password'>Password</label>
            <input type='password' name='password' id='password' />
         </div>

         <button type='submit'>Login</button>
      </form>
   )
};

export default Login;