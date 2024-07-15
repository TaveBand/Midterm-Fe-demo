import React, { useState, useEffect } from "react";
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import "./styles/MyPerformances.css";
import { useNavigate } from "react-router-dom";

// 정적 데이터
const samplePerformances = [
  {
    performance_id: 1,
    title: "스튜디오에이 5월 단독 공연",
    date: "2024.05.24",
    time: "19:00",
    venue: "Main Hall",
    total_seats: 200,
    current_seats: 150,
    image_path: "/img/image4.png",
  },
  {
    performance_id: 2,
    title: "메이데이 : 2024 밴드 연합공연",
    date: "2024.05.17",
    time: "18:00",
    venue: "Grand Theater",
    total_seats: 150,
    current_seats: 120,
    image_path: "/img/image5.png",
  },
  {
    performance_id: 3,
    title: "2024학년도 1학기 SETTLER 정기 공연",
    date: "2024.05.25",
    time: "17:30",
    venue: "Lecture Art Center",
    total_seats: 300,
    current_seats: 300,
    image_path: "/img/image6.png",
  },
];

function MyPerformances() {
  const [performances, setPerformances] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setPerformances(samplePerformances);
  }, []);

  const handleDelete = (performance_id) => {
    setPerformances(prevPerformances => prevPerformances.filter(p => p.performance_id !== performance_id));
  };

  const handleEdit = (performance_id) => {
    navigate(`/boards/performances/${performance_id}`);
  };

  return (
    <div className="MyPerformances">
      <Header />
      <div className="MyPerformances-container">
        <Sidebar userId={1} nickname={"윤영선"} /> {/* 정적 데이터 사용 */}
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
