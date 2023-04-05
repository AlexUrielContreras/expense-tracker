import PaymentList from '../components/PaymentList'
import PaymentListTitles from  '../components/PaymentListTitles';


function PastPaymentFull({ madePayment, setMadePayment}) {
   return (
      <>
         <PaymentListTitles />
         <PaymentList limit={0} setMadePayment={setMadePayment} madePayment={madePayment}/>
      </>
   )
};

export default PastPaymentFull;
