import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import instance from "./axios";

import "./Register.css";

function Register() {
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkpassword, setCheckpassword] = useState("");
  const navigate = useNavigate();

  const handleIDChange = (e) => {
    setId(e.target.value);
  };
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleCheckChange = (e) => {
    setCheckpassword(e.target.value);
  };

  // 이메일 인증 페이지로 이동하는 함수
  const goToEmailVerification = () => {
    navigate("/register/verify"); // "/email-verification"는 이메일 인증 페이지의 경로입니다. 실제 경로에 맞게 수정해주세요.
  };
  // 회원가입 페이지 아이디 닉네임 비번 get post 추가
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userinfo = {
      id : id,
      nickname: nickname,
      password:password,
      checkpassword:checkpassword,
    };

    try {
      await instance.post("/Register", userinfo);
      console.log(userinfo)
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="Signuppage">
        {/* 뒤로가기 버튼 */}
        <button className="BackBtn" onClick={() => navigate("/login")}>
          <img className="BackBtn" alt="BackBtn" src="img/arrow.png" />
        </button>
        <div className="TitleSignup">회원가입</div>
        <form className="InputSignup" onSubmit={handleSubmit}>
          <p>아이디</p>
          <div className="Idbox">
            <input
              placeholder="  아이디를 입력해주세요"
              value={id}
              onChange={handleIDChange}
            ></input>
            <button>중복확인</button>
          </div>
          <p>닉네임</p>
          <div className="Nicknamebox">
            <input
              placeholder="  닉네임을 입력해주세요"
              value={nickname}
              onChange={handleNicknameChange}
            ></input>
            <button>중복확인</button>
          </div>
          <p>비밀번호</p>
          <input
            placeholder="  비밀번호를 입력해주세요"
            value={password}
            onChange={handlePasswordChange}
          ></input>
          <p>비밀번호 확인</p>
          <input
            placeholder="  비밀번호 재입력"
            value={checkpassword}
            onChange={handleCheckChange}
          ></input>
        </form>
        <div>
          {/* 다음 버튼을 클릭하면 이메일 인증 페이지로 이동 */}
          <button className="NextBtn" onClick={goToEmailVerification} >
            다음
          </button>
        </div>
      </div>
      <div className="Background">
        <img alt="background"src="img/backphoto.jpg" />
      </div>
    </div>
  );
}

export default Register;