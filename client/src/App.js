import UserCreation from './Pages/UserCreation';
import Dashboard from './Pages/Dashboard';
import PastPaymentFull from './components/PastPaymentFull';
import Unauthorized from './components/Unauthorized';
import NotFound from './components/NotFound';

import Auth from './utills/auth';
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements([
      !Auth.loggedIn() ? 
        <Route path='/' element={<UserCreation />} errorElement={<Unauthorized />} /> 
      :
      <Route errorElement={<NotFound />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/u/payments' element={<PastPaymentFull />} /> 
      </Route>
    ])
  )
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
