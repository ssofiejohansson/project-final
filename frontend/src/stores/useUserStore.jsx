import { create } from 'zustand';

const storedUser = JSON.parse(localStorage.getItem('user') || 'null');

const useUserStore = create((set) => ({
  //user: null,
  user: storedUser && storedUser.token ? storedUser : null,

  //setUser: (userData) => set({ user: userData }),
  setUser: (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    set({ user: userData });
  },

  //clearUser: () => set({ user: null }),
  clearUser: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken'); // if stored separately
    set({ user: null });
  },
}));

// Make sure your login function saves the token
const login = async (username, password) => {
  try {
    const response = await fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
      // Save token to localStorage
      localStorage.setItem('token', data.response.accessToken);
      localStorage.setItem('accessToken', data.response.accessToken);
      // Update user state
      setUser(data.response.user);
      return true;
    }
  } catch (error) {
    console.error('Login error:', error);
  }
  return false;
};

export default useUserStore;
