import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmailForm from './comp/EmailForm'; // This is the correct one with scheduling
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Navbar } from './comp/layout/Navbar';

export const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/email' element={<EmailForm />} />{' '}
          {/* This is correct */}
        </Routes>
      </div>
    </Router>
  );
};
