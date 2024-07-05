import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import axios from 'axios';
=======
//import axios from 'axios';
import instance from "./axios";
>>>>>>> yys
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function ToSignup() {
    navigate("/register");
  }

<<<<<<< HEAD
  async function handleLogin() {
    try {
      const response = await axios.post("/dailband/login", {
        username: username,
        password: password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data.message);

        // 세션에 user id를 저장합니다.
        sessionStorage.setItem("userId", data.userId);

        // 로그인 성공 시 다음 페이지로 이동
        navigate("/");
      }
    } catch (error) {
=======
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
>>>>>>> yys
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
<<<<<<< HEAD
        <div className="InputLogin">
=======
        <form className="InputLogin" onSubmit={handleLogin}>
>>>>>>> yys
          <input
            placeholder="아이디를 입력해주세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
<<<<<<< HEAD
=======
            autocomplete="new-username"
>>>>>>> yys
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
          />
        </div>
=======
            autocomplete="new-password"
          />
>>>>>>> yys
        <div className="SubmitBtns">
          <button className="SignupBtn" onClick={ToSignup}>
            회원가입
          </button>
          <button className="LoginSubmit" onClick={handleLogin}>
            로그인
          </button>
        </div>
<<<<<<< HEAD
      </div>
      <div className="Background">
      <img alt="background" src="img/배경사진.jpg" />
=======
      </form>
      </div>
      <div className="Background">
        <img alt="background" src="img/배경사진.jpg" />
>>>>>>> yys
      </div>
    </div>
  );
}

export default Login; 