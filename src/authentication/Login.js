// Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/AuthContext";
import Header from "../shared/Header";
import "./styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function ToSignup() {
    navigate("/register");
  }

  async function handleLogin(event) {
    event.preventDefault();
    try {
      await login(username, password);
      navigate("/");
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
        <form className="InputLogin" onSubmit={handleLogin}>
          <input
            placeholder="아이디를 입력해주세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="new-username"
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <div className="SubmitBtns">
            <button className="SignupBtn" onClick={ToSignup}>
              회원가입
            </button>
            <button className="LoginSubmit" type="submit">
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