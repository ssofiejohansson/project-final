import { useNavigate } from 'react-router-dom';

import useUserStore from '../../stores/useUserStore';

export const Logout = () => {
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();                            // Clear user data in store   
    localStorage.removeItem('user');        // Remove stored user object    
    navigate('/login');                     // Redirect to login page
  };

  return (
    <button onClick={handleLogout}>
      Log out
    </button>
  );
};