
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmailForm from './comp/EmailForm'; // This is the correct one with scheduling
import { Home } from './pages/Home';

import { Navbar } from './comp/layout/Navbar';
import { Loader } from "./comp/Loader";

import { About } from './pages/About';
import { Admin } from './pages/Admin';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import useLoadingStore from "./stores/useLoadingStore";

export const App = () => {
  const loading = useLoadingStore((state) => state.loading);

  return (
    <>  
      <Router>       
        <Navbar />     
         
        {loading && <Loader/>} 

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
              <Route path='/email' element={<EmailForm />} />{' '}
          </Routes>
        </div>
      </Router>
    </>

  );
};
