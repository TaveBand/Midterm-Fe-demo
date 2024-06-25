import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function ToSignup() {
    navigate("/register");
  }

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
        <div className="InputLogin">
          <input
            placeholder="아이디를 입력해주세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="SubmitBtns">
          <button className="SignupBtn" onClick={ToSignup}>
            회원가입
          </button>
          <button className="LoginSubmit" onClick={handleLogin}>
            로그인
          </button>
        </div>
      </div>
      <div className="Background">
      <img alt="background" src="img/배경사진.jpg" />
      </div>
    </div>
  );
}

export default Login; 