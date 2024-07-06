import { useState } from "react";
import Header from "../shared/Header";
import { useNavigate } from "react-router-dom";
//import axios from 'axios';
import instance from "axios";
import "./styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function ToSignup() {
    navigate("/register");
  }

  async function handleLogin(event) {
    event.preventDefault(); //로그인 폼 비동기 처리
    try {
      const response = await instance.post("/dailband/login", {
        username,
        password,
      });
      console.log("Response :", response); //응답 로그

      // 응답 데이터에서 토큰을 추출합니다.
      const token = response.data.token;
      console.log("Token:", token);

      // 추출한 토큰을 localStorage에 저장합니다.
      localStorage.setItem("token", token);

      // localStorage에 저장된 토큰을 확인합니다.
      const storedToken = localStorage.getItem("token");
      console.log("Stored Token:", storedToken);
      
      // 로그인이 성공하면 홈 페이지로 이동합니다.
      navigate("/");
    } 
    catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Unauthorized: 아이디 또는 비밀번호가 잘못되었습니다.");
      } else {
        console.error("Error:", error);
        alert("로그인 실패: " + error.message);
      }
    }
  }

  return (
    <div>
      <Header />
      <div className="Loginpage">
        <div className="TitleLogin">로그인</div>
        <form className="InputLogin" onSubmit={handleLogin}>
          <input
            placeholder="아이디를 입력해주세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autocomplete="new-username"
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autocomplete="new-password"
          />
        <div className="SubmitBtns">
          <button className="SignupBtn" onClick={ToSignup}>
            회원가입
          </button>
          <button className="LoginSubmit" onClick={handleLogin}>
            로그인
          </button>
        </div>
      </form>
      </div>
      <div className="Background">
        <img alt="background" src="img/backphoto.jpg" />
      </div>
    </div>
  );
}

export default Login; 