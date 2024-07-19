import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await axios.post("/dailband/login", { username, password });
      const token = response.data.token;
      localStorage.setItem("token", token);


      const user = response.data.user;
      setUser(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post("/dailband/logout", {}, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        localStorage.removeItem("token");
        setUser(null);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}



//user_id를 가져오는 코드 추가하거나 모든 경로에 라우팅 경로에 user_id 삭제하는게 방법!!! 
