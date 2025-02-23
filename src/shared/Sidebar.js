import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../authentication/AuthContext';
import './styles/Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();

  const displayName = user?.nickname || "사용자";
  const userId = user?.id || "default";

  return (
    <div className="sidebar">
      <div className="profile-picture">
        <img src="/img/basicprofile.png" alt="Profile" className="profile-image" />
      </div>
      <h2>{displayName}</h2>
      <ul>
        <li>
          <Link to={`/profile/edit/${userId}`} className="profile-link">프로필 수정</Link>
        </li>
        <li>
          <Link to={`/scrap/${userId}`} className="scrap-link">스크랩</Link>
        </li>
        <li>
          <Link to={`/myposts/${userId}`} className="myposts-link">내가 쓴 글</Link>
        </li>
        <li>
          <Link to={`/myperformances/${userId}`} className="myperformances-link">내가 작성한 공연 글</Link>
        </li>
        <li>
          <Link to={`/myreservations/${userId}`} className="myreservations-link">공연 예약</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;




//user_id 들어간 링크 다 수정해야함!!!