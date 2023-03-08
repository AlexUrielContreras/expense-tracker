import axios from 'axios';
import Auth from '../utills/auth';

function AddPayment() {
   async function handlePaySubmit(e) {
      e.preventDefault();

      const categoryIndex = e.target[0].options.selectedIndex;

      const category = e.target[0][categoryIndex].value
      const paymentAmount = e.target[1].value;
      const token = Auth.getToken();

      try {
         await axios({
            method: 'post',
            url: 'api/payment/dashboard',
            data: JSON.stringify({
               category, 
               paymentAmount
            }),
            headers: {
               'Content-Type' : 'application/json',
               'Authorization' : token
            }
         })
      } catch (err) {
         console.log(err)
      }
   }

   return (
         <div>  
            <form onSubmit={handlePaySubmit}>
               <div>
                  <label htmlFor='category'></label>
                  <select name='category' id='category' required>
                     <option value='' >Please select one</option>
                     <option value='Rent'>Rent</option>
                     <option value='Utility Bills'>Utility Bills</option>
                     <option value='Food'>Food</option>
                     <option value='Shopping'>Shopping</option>
                     <option value='Subscription'>Subscription</option>
                     <option value='Travel'>Travel</option>
                     <option value='Entertanment'>Entertainment</option>
                  </select>
               </div>

               <div>
                  <label htmlFor='pay-amount'></label>
                  <input type='text'placeholder='Payment Amount' name='pay-amount' autoComplete='off' id='pay-amount' required/>
               </div>

               <button type='submit'>Add Payment</button>
            </form>  
         </div>
   )
};

export default AddPayment;