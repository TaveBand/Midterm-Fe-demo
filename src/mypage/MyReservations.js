import React, { useState, useEffect } from "react";
import instance from "axios"; 
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import "./styles/MyReservations.css";

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [nickname, setNickname] = useState("");

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

    const fetchReservations = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Invalid or missing token");
        return;
      }

      try {
        const response = await instance.get(`/dailband/user/myreservations`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setReservations(response.data.reservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchUserInfos();
    fetchReservations();
  }, []);

  const handleCancel = async (reservation_id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Invalid or missing token");
      return;
    }

    try {
      await instance.delete(`/dailband/user/myreservations/${reservation_id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setReservations(prevReservations => prevReservations.filter(r => r.reservation_id !== reservation_id));
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };

  return (
    <div className="MyReservations">
      <Header />
      <div className="MyReservations-container">
        <Sidebar nickname={nickname} /> 
        <div className="MyReservations-content">
          <h2 className="MyReservations-title">공연 예약 확인</h2>
          <div className="MyReservations-list">
            {reservations.length > 0 ? (
              reservations.map(reservation => (
                <div key={reservation.reservation_id} className="MyReservations-item">
                  <h3>{reservation.performance.title}</h3>
                  <p>{reservation.performance.date} {reservation.performance.time}</p>
                  <p>{reservation.performance.venue}</p>
                  <p>예약 일자: {reservation.reservation_date}</p>
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
