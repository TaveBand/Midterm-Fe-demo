import React, { useState } from "react";
import Header from "../shared/Header";
import { useNavigate } from "react-router-dom";
import instance from "axios";
import "./styles/Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCheckChange = (e) => {
    setCheckPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  // 이메일 인증 요청 함수
  const handleEmailVerification = async () => {
    try {
      const response = await instance.post("/dailband/register/verify", { email });
      console.log("Verification code sent:", response.data);
      alert("인증번호가 발송되었습니다.");
    } catch (error) {
      console.error("Error sending verification code:", error);
      alert("인증번호 발송 중 오류가 발생했습니다.");
    }
  };

  // 코드 확인 함수
  const handleCodeVerification = async () => {
    try {
      const response = await instance.post("/dailband/register/verify", { email, code: verificationCode });
      if (response.status === 200) {
        setIsVerified(true);
        setErrorMessage("성공했습니다");
        console.log("인증번호 확인: 성공");
      } else {
        setIsVerified(false);
        setErrorMessage("인증번호가 일치하지 않습니다. 다시 시도해주세요.");
        console.log("인증번호 확인: 실패");
      }
    } catch (error) {
      setIsVerified(false);
      setErrorMessage("인증번호가 일치하지 않습니다. 다시 시도해주세요.");
      console.error("Error verifying code:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== checkPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!isVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    const userinfo = {
      username,
      nickname,
      password,
      email
    };

    try {
      const response = await instance.post("/dailband/register", userinfo);
      console.log("User info submitted:", response.data);
      alert("회원가입이 완료되었습니다.");
      navigate("/register/complete"); // 회원가입 완료 후 완료 페이지로 이동
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <Header />
      <div className="Signuppage">
        <button className="BackBtn" onClick={() => navigate("/login")}>
          <img className="BackBtn" alt="BackBtn" src="img/arrow.png" />
        </button>
        <div className="TitleSignup">회원가입</div>
        <form className="InputSignup" onSubmit={handleSubmit}>
          <p>아이디</p>
          <div className="Idbox">
            <input
              placeholder="아이디를 입력해주세요"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <p>닉네임</p>
          <div className="Nicknamebox">
            <input
              placeholder="닉네임을 입력해주세요"
              value={nickname}
              onChange={handleNicknameChange}
            />
          </div>
          <p>비밀번호</p>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={handlePasswordChange}
          />
          <p>비밀번호 확인</p>
          <input
            type="password"
            placeholder="비밀번호 재입력"
            value={checkPassword}
            onChange={handleCheckChange}
          />
          <p>학교 이메일 인증</p>
          <div className="Nicknamebox">
            <input
              placeholder="예: Daeil1234@band.ac.kr"
              value={email}
              onChange={handleEmailChange}
            />
            <button type="button" onClick={handleEmailVerification}>인증요청</button>
          </div>
          <p>인증번호</p>
          <div className="Nicknamebox">
            <input
              placeholder="인증번호 6자리"
              value={verificationCode}
              onChange={handleVerificationCodeChange}
            />
            <button type="button" onClick={handleCodeVerification}>확인</button>
          </div>
          <div className="ErrorMessage">{errorMessage}</div>
          <button type="submit" className="NextBtn">
            회원가입
          </button>
        </form>
      </div>
      <div className="Background">
        <img alt="background" src="img/backphoto.jpg" />
      </div>
    </div>
  );
}

export default Register;
