// App.jsx
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import Header from './components/dashboard/common/Header';

const App = () => {
  return (
    <div className='game-container'>
      <Header />  {/* Sirf ek baar Header */}
      <Routes>
        <Route path="/dashboard/*" element={<DashboardLayout />} />
        <Route path="/" element={<DashboardLayout />} />  {/* Home page bhi dashboard dikhaye */}
      </Routes>
    </div>
  );
};

export default App;