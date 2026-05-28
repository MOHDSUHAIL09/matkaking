// App.jsx
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import Header from './components/dashboard/common/Header';

const App = () => {
  return (
    <>
    <div className='game-container'>
      <Header />
      <Routes>
        <Route path="/*" element={<DashboardLayout />} />
      </Routes>
    </div>
    </>
  );
};

export default App;