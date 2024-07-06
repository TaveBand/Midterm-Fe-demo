import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./MyPerformances.css";

function MyPerformances() {
  const user_id = sessionStorage.getItem("userId"); // 세션에서 user_id 가져오기
  const [performances, setPerformances] = useState([]);

  useEffect(() => {
    const fetchPerformances = async () => {
      try {
        const response = await axios.get(`/dailband/user/${user_id}/myperformances`, {
          withCredentials: true
        });
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
                  <h3>{performance.title}</h3>
                  <p>{performance.content}</p>
                  <p>날짜: {performance.date}</p>
                  <p>시간: {performance.time}</p>
                  <p>장소: {performance.venue}</p>
                  <p>총 좌석: {performance.total_seats}</p>
                  <p>현재 좌석: {performance.current_seats}</p>
                  <img src={performance.image_path} alt={performance.title} />
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
