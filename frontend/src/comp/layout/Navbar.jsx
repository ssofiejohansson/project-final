import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav>
      {!isHome && <Link to="/">Home</Link>}
      <Link to="/about">About</Link>
      <Link to="/login">Login</Link>
      <Link to="#">Contact</Link>
    </nav>
  );
};