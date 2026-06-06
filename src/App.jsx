// App.jsx
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import Header from './components/dashboard/common/Header';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';

const App = () => {
  return (
    <>
    <div className='game-container'>
      <Header />
      <Routes>
        <Route path="/*" element={<DashboardLayout />} />
        <Route path="/Register" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
    </>
  );
};

export default App;