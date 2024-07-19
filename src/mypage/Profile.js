// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import "./styles/Profile.css";

const sessionMap = {
  '드럼': 1,
  '기타': 2,
  '보컬': 3,
  '베이스': 4,
  '키보드': 5
};

const sessionMapReverse = {
  1: '드럼',
  2: '기타',
  3: '보컬',
  4: '베이스',
  5: '키보드'
};

const translateSessions = (sessions) => {
  return sessions.map(session => sessionMap[session] || session);
};

const translateSessionsFromIds = (sessionIds) => {
  return sessionIds.map(id => sessionMapReverse[id.session_id] || id.session_info);
};

function Profile() {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
    sessions: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/dailband/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data;
        setFormData({
          nickname: data.nickname,
          email: data.email,
          password: "",
          passwordConfirm: "",
          sessions: translateSessionsFromIds(data.sessions || [])
        });
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
    if (formData.password !== formData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const updatedProfile = {
      nickname: formData.nickname,
      password: formData.password,
      email: formData.email,
      sessions: formData.sessions.map(session => ({
        session_id: sessionMap[session],
        session_info: session
      }))
    };

    try {
      const token = localStorage.getItem('token');
      await axios.put('/dailband/user/profile', updatedProfile, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("프로필이 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert("프로필 업데이트에 실패했습니다.");
    }
  };

  return (
    <div className="Profile">
      <Header />
      <div className="Profile-container">
        <Sidebar userId={1} nickname="사용자 이름" />
        <div className="Profile-content">
          <h2 className="Profile-title">마이페이지</h2>
          <div className="Profile-picture-large">
            <img src="/img/basicprofile.png" alt="Profile" />
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
