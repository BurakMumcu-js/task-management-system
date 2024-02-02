import React, { createContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get('token'));
  const [user,setUser] = useState(Cookies.get('user'));

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      const { token,user } = response.data;
      Cookies.set('token', token, { expires: 1 }); // Örnek olarak 1 gün süreyle saklanacak
      setToken(token);
      Cookies.set('user',JSON.stringify(user),{expires:1})
      setUser(user);
    } catch (error) {
      console.error('Giriş başarısız:', error);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
