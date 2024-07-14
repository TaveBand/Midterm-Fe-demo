import React, { useState, useEffect } from "react";
import instance from "axios";
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import "./styles/Profile.css";
import { useAuth } from '../authentication/AuthContext';

function Profile() {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
    sessions: [],
  });

  useEffect(() => {
    if (currentUser) {
      const fetchData = async () => {
        const token = localStorage.getItem("token");
        try {
          const userId = currentUser.user_id; // currentUser에서 user_id 가져오기
          const response = await instance.get(`/dailband/user/${userId}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = response.data;
          setFormData({
            ...formData,
            nickname: data.nickname,
            email: data.email,
            sessions: translateSessionsFromIds(data.sessions || [])
          });
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };
      fetchData();
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sessionMap = {
    '드럼': 1,
    '기타': 2,
    '보컬': 3,
    '베이스': 4,
    '키보드': 5
  };

  const translateSessions = (sessions) => {
    return sessions.map(session => sessionMap[session] || session);
  };

  const sessionMapReverse = {
    1: '드럼',
    2: '기타',
    3: '보컬',
    4: '베이스',
    5: '키보드'
  };

  const translateSessionsFromIds = (sessionIds) => {
    return sessionIds.map(id => sessionMapReverse[id]);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const newSessions = checked
        ? [...prevData.sessions, value]
        : prevData.sessions.filter(session => session !== value);

      return {
        ...prevData,
        sessions: newSessions
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Invalid or missing token");
      return;
    }
    if (formData.password !== formData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const userId = currentUser.user_id; // currentUser에서 user_id 가져오기
      const { passwordConfirm, ...dataToSend } = {
        nickname: formData.nickname,
        email: formData.email,
        password: formData.password,
        sessions: translateSessions(formData.sessions)
      };

      console.log("Sending data to server: ", dataToSend);

      const response = await instance.put(`/dailband/user/${userId}/profile`, dataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("Server response: ", response.data);
      alert("프로필이 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error(error);
      alert("프로필 업데이트 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="Profile">
      <Header />
      <div className="Profile-container">
        <Sidebar nickname={currentUser?.username} /> {/* currentUser에서 nickname 가져오기 */}
        <div className="Profile-content">
          <h2 className="Profile-title">마이페이지</h2>
          <div className="Profile-picture-large">
            <img src="/path/to/profile-image" alt="Profile" />
          </div>
          <form onSubmit={handleSubmit} className="MypageForm">
            <div className="InputField">
              <label>닉네임</label>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
              />
            </div>
            <div className="InputField">
              <label>이메일</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="InputField">
              <label>비밀번호 변경</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="InputField">
              <label>비밀번호 확인</label>
              <input
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
              />
            </div>
            <div className="CheckboxGroup">
              <label>세션 정보</label>
              <div className="CheckboxOptions">
                {["드럼", "기타", "보컬", "베이스", "키보드"].map((role) => (
                  <label key={role}>
                    <input
                      type="checkbox"
                      name="sessions"
                      value={role}
                      checked={formData.sessions.includes(role)}
                      onChange={handleCheckboxChange}
                    />
                    {role}
                  </label>
                ))}
              </div>
            </div>
            <button type="submit" className="UpdateButton">
              수정
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
