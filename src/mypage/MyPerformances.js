import React, { useState, useEffect } from "react";
import instance from "axios"; // axios instance 사용
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import "./styles/MyPerformances.css";
import { useNavigate } from "react-router-dom";

function MyPerformances() {
  const [performances, setPerformances] = useState([]);
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfos = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Invalid or missing token");
        return;
      }

      try {
        const response = await instance.get(`/dailband/user/profile`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setNickname(response.data.nickname);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const fetchPerformances = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Invalid or missing token");
        return;
      }

      try {
        const response = await instance.get(`/dailband/user/myperformances`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setPerformances(response.data.performances);
      } catch (error) {
        console.error("Error fetching performances:", error);
      }
    };

    fetchUserInfos();
    fetchPerformances();
  }, []);

  const handleDelete = async (performance_id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Invalid or missing token");
      return;
    }

    try {
      await instance.delete(`/dailband/user/myperformances/${performance_id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setPerformances(performances.filter(p => p.performance_id !== performance_id));
    } catch (error) {
      console.error("Error deleting performance:", error);
    }
  };

  const handleEdit = (performance_id) => {
    navigate(`/boards/performances/${performance_id}`);
  };

  return (
    <div className="MyPerformances">
      <Header />
      <div className="MyPerformances-container">
        <Sidebar nickname={nickname} /> 
        <div className="MyPerformances-content">
          <h2 className="MyPerformances-title">내가 작성한 공연 조회</h2>
          <div className="MyPerformances-list">
            {performances.length > 0 ? (
              performances.map(performance => (
                <div key={performance.performance_id} className="MyPerformances-item">
                  <img src={performance.image_path} alt={performance.title} />
                  <h3>{performance.title}</h3>
                  <p>{performance.date} {performance.time}</p>
                  <p>장소: {performance.venue}</p>
                  <div className="MyPerformances-buttons">
                    <button onClick={() => handleEdit(performance.performance_id)} className="EditButton">수정</button>
                    <button onClick={() => handleDelete(performance.performance_id)} className="DeleteButton">삭제</button>
                  </div>
                </div>
              ))
            ) : (
              <p>작성한 공연이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPerformances;
