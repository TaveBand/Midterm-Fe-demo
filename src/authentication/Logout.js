import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // AuthContext에서 useAuth 가져오기
import instance from 'axios';

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await instance.post("/dailband/logout", {}, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      logout();
      navigate('/login'); // 로그아웃 후 로그인 페이지로 이동
    } catch (error) {
      console.error("Error during logout:", error);
      alert("로그아웃 실패: " + error.message);
    }
  };

  return (
    <button onClick={handleLogout}>
      로그아웃
    </button>
  );
}

export default Logout;