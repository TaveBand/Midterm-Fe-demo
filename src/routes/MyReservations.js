import React, { useState, useEffect } from "react";
import instance from "./axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./MyReservations.css";

function MyReservations() {
  const user_id = sessionStorage.getItem("userId"); // 세션에서 user_id 가져오기
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await instance.get(`/dailband/user/${user_id}/reservations`);
        setReservations(response.data.reservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, [user_id]);

  const handleCancel = async (reservation_id) => {
    try {
      await instance.delete(`/dailband/user/${user_id}/reservations/${reservation_id}`);
      setReservations(prevReservations => prevReservations.filter(r => r.reservation_id !== reservation_id));
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };

  return (
    <div className="MyReservations">
      <Header />
      <div className="MyReservations-container">
        <Sidebar nickname="윤영선" /> {/* 예시로 윤영선 사용 */}
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
