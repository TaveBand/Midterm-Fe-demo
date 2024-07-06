import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./MyReservations.css";

function MyReservations() {
  const user_id = sessionStorage.getItem("userId"); // 세션에서 user_id 가져오기
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`/dailband/user/${user_id}/myreservations`, {
          withCredentials: true
        });
        setReservations(response.data.reservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, [user_id]);

  return (
    <div className="MyReservations">
      <Header />
      <div className="MyReservations-container">
        <Sidebar nickname="윤영선" /> {/* 예시로 윤영선 사용 */}
        <div className="MyReservations-content">
          <h2 className="MyReservations-title">내 예약 조회</h2>
          <div className="MyReservations-list">
            {reservations.length > 0 ? (
              reservations.map(reservation => (
                <div key={reservation.reservation_id} className="MyReservations-item">
                  <h3>{reservation.performance.title}</h3>
                  <p>{reservation.performance.content}</p>
                  <p>날짜: {reservation.performance.date}</p>
                  <p>시간: {reservation.performance.time}</p>
                  <p>장소: {reservation.performance.venue}</p>
                  <img src={reservation.performance.image_path} alt={reservation.performance.title} />
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
