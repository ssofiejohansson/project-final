import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Navbar } from './comp/layout/Navbar';
import { About } from './pages/About';
import { AboutAPI } from './pages/AboutAPI';
import { Admin } from './pages/Admin';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

export const App = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/aboutapi" element={<AboutAPI/>}/>
          <Route path="/admin" element={<Admin />} />          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};