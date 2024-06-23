import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "./Verify.css";

function Verify() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 임의의 인증번호 생성 함수
  const generateVerificationCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000);
    setGeneratedCode(code.toString());
    console.log("인증번호 발송:", code);
    alert("인증번호가 발송되었습니다.\n인증번호: " + code);
  };

  // 이메일 인증 요청 함수
  const handleEmailVerification = () => {
    generateVerificationCode();
    console.log("이메일 인증 요청:", email);
  };

  // 코드 확인 함수
  const handleCodeVerification = () => {
    if (verificationCode === generatedCode) {
      setVerificationSuccess(true);
      setErrorMessage("성공했습니다");
      console.log("인증번호 확인: 성공");
    } else {
      setVerificationSuccess(false);
      setErrorMessage("인증번호가 일치하지 않습니다. 다시 시도해주세요.");
      console.log("인증번호 확인: 실패");
    }
  };

  // 다음 페이지로 이동 함수
  const handleNext = () => {
    if (verificationSuccess) {
      navigate("/register/complete");
    } else {
      setErrorMessage("인증을 완료해주세요.");
    }
  };

  return (
    <div>
      <Header />
      <div className="Verifypage">
        {/* 뒤로 가기 버튼 */}
        <button className="BackBtn" onClick={() => navigate("/register")}>
          <img className="BackBtn" alt="Back" src="/img/arrow.png" />
        </button>
        <div className="TitleSignup">회원가입</div>
        <div className="InputSignup">
          <p>학교 이메일 인증</p>
          <div className="Nicknamebox">
            <input
              placeholder=" 예: Daeil1234@band.ac.kr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleEmailVerification}>인증요청</button>
          </div>
          <p>인증번호</p>
          <div className="Nicknamebox">
            <input
              placeholder="  인증번호 4자리"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button onClick={handleCodeVerification}>확인</button>
          </div>
        </div>
        <div className="ErrorMessage">{errorMessage}</div>
        <div>
          {/* 다음 버튼을 클릭할 수 있도록 조건 추가 */}
          <button
            className="NextBtn"
            onClick={handleNext}
            disabled={!verificationSuccess} // 인증 성공 여부에 따라 버튼 활성화/비활성화
          >
            다음
          </button>
        </div>
      </div>
      <div className="Background">
        <img alt="background" src="/img/배경사진.jpg" />
      </div>
    </div>
  );
}

export default Verify;