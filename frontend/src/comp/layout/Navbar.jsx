import { Link, useLocation } from 'react-router-dom';
import useUserStore from '../../stores/useUserStore';
import { Logout } from '../../comp/LogoutBtn';

export const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const user = useUserStore((state) => state.user);

  return (
    <nav>
      {!isHome && <Link to="/">Home</Link>}
      <Link to="/about">About</Link>
      <Link to="#">Contact</Link>

      {user ? (
        <Logout />
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
};
