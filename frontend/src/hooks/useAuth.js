import { useState, createContext, useContext } from 'react';
import * as userService from '../NewProducts/userService';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userService.getUser());

  const login = async (email, password) => {
    try {
      const user = await userService.login(email, password);
      setUser(user);
      toast.success('Login Successful');
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const register = async (data) => {
    try {
      const user = await userService.register(data);
      setUser(user);
      toast.success('Register Successful');
      return user; // Return the user data from the registration service
    } catch (err) {
      toast.error(err.response.data);
      return null; 
    }
  };

  const logout = () => {
    userService.logout();
    setUser(null);
    toast.success('Logout Successful');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
