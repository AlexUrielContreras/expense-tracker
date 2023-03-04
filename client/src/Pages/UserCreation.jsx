import Login from '../entry-forms/Login';

function UserCreation() {
   return (
      <div className='user-creation-container'>
         <div className='title-container'>
            <h1>My Expense Tracker</h1>
         </div>
         
         <section className='login-container'>
            <div className='login-header'>
               <h2>Welcome Back</h2>
               <p>Enter your credentials to start tracking your spending</p>
            </div>
            <Login />
         </section>
         
         <section className='signup-container'>
            {/* Sign up */}
         </section>
      </div>
   )
};

export default UserCreation;