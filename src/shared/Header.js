import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/AuthContext";
import "./styles/Header.css";

function Header() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  function ToLogin() {
    navigate("/login");
  }

  function ToHome() {
    navigate("/");
  }

  function ToBoards() {
    navigate("/boards/clubs");
  }

  function ToSession() {
    navigate("/boards/5");
  }

  function ToMypage() {
    navigate(`/profile/edit/${currentUser?.id}`);
  }

  function ToPerformance() {
    navigate("/boards/performances");
  }

  function ToVoiceAnalysis() {
    navigate("/voice_analysis");
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="Headerwidth">
      <div className="Container">
        <div className="Category_left">
          <button onClick={ToSession}>세션</button>
          <button onClick={ToBoards}>모집</button>
          <button onClick={ToPerformance}>연합공연</button>
          <button onClick={ToVoiceAnalysis}>음악분석</button>
        </div>
        <div className="Logo" onClick={ToHome}>대일밴드</div>
        <div className="Category_right">
          {currentUser ? (
            <>
              <button className="LogoutBtn" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <button className="LoginBtn" onClick={ToLogin}>
              로그인
            </button>
          )}
          <button className="MypageBtn" onClick={ToMypage}>마이페이지</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
