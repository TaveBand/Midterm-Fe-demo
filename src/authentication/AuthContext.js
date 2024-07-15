import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (username, password) => {
    const users = [
      {
        id: 1,
        username: "윤영선",
        password: "0000",
        nickname: "yys",
        email: "yys@example.com",
        sessions: [{ session_info: "드럼" }],
      },
      {
        id: 2,
        username: "김시은",
        password: "1111",
        nickname: "kse",
        email: "kse@example.com",
        sessions: [{ session_info: "기타" }],
      },
    ];

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setCurrentUser(user);
      return Promise.resolve();
    } else {
      return Promise.reject(new Error("Invalid username or password"));
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
