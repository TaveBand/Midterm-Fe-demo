import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ userId, nickname }) => {
  return (
    <div className="sidebar">
      <div className="profile-picture">
        <img
          src="/path/to/profile-image"
          alt="Profile"
          className="profile-image"
        />
      </div>
      <h2>{nickname}</h2>
      <ul>
        <li>
          <button className="sidebarBtn">
            <Link to={`/profile/edit/${userId}`} className="profile-link">
              프로필 수정
            </Link>
          </button>
        </li>
        <li>
          <button className="sidebarBtn">
            <Link to={`/scrap/${userId}`} className="scrap-link">
              스크랩
            </Link>
          </button>
        </li>
        <li>
          <button className="sidebarBtn">
            <Link to={`/myposts/${userId}`} className="myposts-link">
              내가 쓴 글
            </Link>
          </button>
        </li>
        <li>
          <button className="sidebarBtn">
            <Link to={`/reservations/${userId}`} className="reservations-link">
              공연 예약
            </Link>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
