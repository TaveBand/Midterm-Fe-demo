import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./Profile.css";
import { useParams } from "react-router-dom";

function Profile() {
  const { user_id } = useParams(); // URL에서 user_id 가져오기
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
        const response = await axios.get(`/dailband/user/${user_id}/profile`, {
          withCredentials: true // 세션 쿠키를 전달
        });
        setFormData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user_id]);

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
      if (checked) {
        return { ...prevData, sessions: [...prevData.sessions, { session_info: value }] };
      } else {
        return {
          ...prevData,
          sessions: prevData.sessions.filter((session) => session.session_info !== value),
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      await axios.put(`/dailband/user/${user_id}/profile`, formData, {
        withCredentials: true // 세션 쿠키를 전달
      });
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
        <Sidebar nickname={formData.nickname} />
        <div className="Profile-content">
          <h2 className="Profile-title">마이페이지</h2>
          <div className="Profile-picture-large">
            <img src="/path/to/profile-image" alt="Profile" />
          </div>
          <form onSubmit={handleSubmit}>
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
                      checked={formData.sessions.some(session => session.session_info === role)}
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
