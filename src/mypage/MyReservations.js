import React, { useState, useEffect } from "react";
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import "./styles/MyReservations.css";

// 정적 데이터
const sampleReservations = [
  {
    reservation_id: 1,
    title: "스튜디오에이 5월 단독 공연",
    date: "2024.05.24",
    venue: "001 클럽 서울 마포구 와우산로 18길 20",
    tickets: 5,
  },
  {
    reservation_id: 2,
    title: "홍대밴드 5월 단독 공연",
    date: "2024.05.24",
    venue: "001 클럽 서울 마포구 와우산로 18길 20",
    tickets: 2,
  },
  {
    reservation_id: 3,
    title: "과기대밴드 5월 단독 공연",
    date: "2024.05.24",
    venue: "001 클럽 서울 마포구 와우산로 18길 20",
    tickets: 1,
  },
];

function MyReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    setReservations(sampleReservations);
  }, []);

  const handleCancel = (reservation_id) => {
    setReservations(prevReservations => prevReservations.filter(r => r.reservation_id !== reservation_id));
  };

  return (
    <div className="MyReservations">
      <Header />
      <div className="MyReservations-container">
        <Sidebar userId={1} nickname={"윤영선"} /> {/* 정적 데이터 사용 */}
        <div className="MyReservations-content">
          <h2 className="MyReservations-title">공연 예약 확인</h2>
          <div className="MyReservations-list">
            {reservations.length > 0 ? (
              reservations.map(reservation => (
                <div key={reservation.reservation_id} className="MyReservations-item">
                  <h3>{reservation.title}</h3>
                  <p>{reservation.date}</p>
                  <p>{reservation.venue}</p>
                  <p>예약 매수: {reservation.tickets}매</p>
                  <button onClick={() => handleCancel(reservation.reservation_id)} className="CancelButton">예약 취소</button>
                </div>
              ))
            ) : (
              <p>예약한 공연이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyReservations;
