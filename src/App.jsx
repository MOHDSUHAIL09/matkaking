// App.jsx
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import Header from './components/dashboard/common/Header';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import PlayGame from './pages/dashboard/playgame/PlayGame';
import NumberGrid from './pages/dashboard/playgame/NumberGrid';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/dashboard/Profile/Profile';
import Deposit from './pages/dashboard/Profile/Deposit';

const App = () => {
  return (
    <>
      <div className='game-container'>   {/* ✅ SAME CLASS */}
        <Header />
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="PlayGame" element={<PlayGame />} />
            <Route path="NumberGrid" element={<NumberGrid />} />
            <Route path="Profile" element={<Profile/>} />
            {/* History Route */}
            <Route path="Deposit" element={<Deposit/>} />
          </Route>
          <Route path="/Register" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
};

export default App;