// AuthContext.js
import React, { useContext, useState, createContext } from 'react';
import instance from 'axios';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  async function login(username, password) {
    try {
      const response = await instance.post("/dailband/login", {
        username,
        password,
      });
      
      const token = response.headers['authorization'].split(' ')[1]; // 'Bearer TOKEN' 형식에서 토큰 추출
      localStorage.setItem("token", token);
      setCurrentUser({ username }); // 예시로 username을 currentUser로 설정

      return response.data; // 필요하다면 응답 데이터를 반환
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setCurrentUser(null);
  }

  const value = {
    currentUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
