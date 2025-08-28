import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';

import EmailForm from './comp/EmailForm';
import { Footer } from './comp/layout/Footer';
import { Loader } from "./comp/layout/Loader";
import { Navbar } from './comp/layout/Navbar';
import { TopArrow } from "./comp/layout/TopArrow";
import { About } from './pages/About';
import { Admin } from './pages/Admin';
import { Error } from "./pages/Error";
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import useLoadingStore from "./stores/useLoadingStore";

const ScrollToTop = () => {
const location = useLocation();
useEffect(() => {
  window.scrollTo({ top: 0 });
}, [location.pathname]);

return null; // this component only handles scrolling
};

export const App = () => {
  const loading = useLoadingStore((state) => state.loading);

  return (
    <Router> 
      <ScrollToTop/>     
      <div className="flex flex-col min-h-screen ">
        <Navbar />
        <main className="flex-grow mt-20 py-10">
          {loading && <Loader />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/email" element={<EmailForm />} />
            <Route path="/error" element={<Error />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </main>

        <Footer />
        <TopArrow />
      </div>
    </Router>
  );
};