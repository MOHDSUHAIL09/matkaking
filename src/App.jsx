// App.jsx
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import Header from './components/dashboard/common/Header';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import PlayGame from './pages/dashboard/playgame/PlayGame';
import NumberGrid from './pages/dashboard/playgame/NumberGrid';


const App = () => {
  return (
    <>
    <div className='game-container'>
      <Header />
      <Routes>
        <Route path="/*" element={<DashboardLayout />} />
        <Route path="/Register" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="PlayGame" element={<PlayGame/>} />
        <Route path="/NumberGrid" element={<NumberGrid/>} />
      </Routes>
    </div>
    </>
  );
};

export default App;