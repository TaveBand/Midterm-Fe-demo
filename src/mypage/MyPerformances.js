import React, { useState, useEffect } from "react";
import instance from "axios";
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import "./styles/MyPerformances.css";

function MyPerformances() {
  const user_id = sessionStorage.getItem("userId"); // 세션에서 user_id 가져오기
  const [performances, setPerformances] = useState([]);

  useEffect(() => {
    const fetchPerformances = async () => {
      try {
        const response = await instance.get(`/dailband/user/${user_id}/myperformances`);
        setPerformances(response.data.performances);
      } catch (error) {
        console.error("Error fetching performances:", error);
      }
    };

    fetchPerformances();
  }, [user_id]);

  return (
    <div className="MyPerformances">
      <Header />
      <div className="MyPerformances-container">
        <Sidebar nickname="윤영선" /> {/* 예시로 윤영선 사용 */}
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
                  <button className="DeleteButton">삭제</button>
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
