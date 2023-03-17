import UserCreation from './Pages/UserCreation';
import Dashboard from './Pages/Dashboard';
import PastPaymentFull from './components/PastPaymentFull';

import Auth from './utills/auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {!Auth.loggedIn() ? 
            <Route path='/' element={<UserCreation /> } />
            :
            <Route path='/dashboard' element={<Dashboard /> } />  
          }
          <Route path='/dashboard/payments' element={<PastPaymentFull />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
