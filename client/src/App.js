import UserCreation from './Pages/UserCreation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<UserCreation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
