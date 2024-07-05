import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import instance from "./axios";
<<<<<<< HEAD

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
=======
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
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
>>>>>>> yys
  };

  // 이메일 인증 페이지로 이동하는 함수
  const goToEmailVerification = () => {
<<<<<<< HEAD
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
=======
    if (password !== checkPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log("Navigating to verify page with:", { username, nickname, password });

    navigate("/register/verify", { state: { username, nickname, password } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userinfo = {
      username,
      nickname,
      password,
>>>>>>> yys
    };

    try {
      await instance.post("/Register", userinfo);
<<<<<<< HEAD
      console.log(userinfo)
=======
      console.log(userinfo);
      navigate("/register/verify", { state: userinfo });
>>>>>>> yys
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
<<<<<<< HEAD
              value={id}
              onChange={handleIDChange}
=======
              value={username}
              onChange={handleUsernameChange}
>>>>>>> yys
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
<<<<<<< HEAD
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
=======
            value={checkPassword}
            onChange={handleCheckChange}
          ></input>
          <div>
            {/* 다음 버튼을 클릭하면 이메일 인증 페이지로 이동 */}
            <button className="NextBtn" onClick={goToEmailVerification}>
              다음
            </button>
          </div>
        </form>
      </div>
      <div className="Background">
        <img alt="background" src="img/backphoto.jpg" />
>>>>>>> yys
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default Register;
=======
export default Register;
>>>>>>> yys
