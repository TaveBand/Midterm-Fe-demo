import React, { useState, useEffect } from "react";
import instance from "axios";
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import "./styles/MyReservations.css";
import { useAuth } from '../authentication/AuthContext';

function MyReservations() {
  const { currentUser } = useAuth();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const token = localStorage.getItem("token");
      const userId = currentUser.user_id; // currentUser에서 user_id 가져오기

      if (!token) {
        console.error("Invalid or missing token");
        return;
      }

      const fetchReservations = async () => {
        try {
          const response = await instance.get(`/dailband/user/${userId}/myreservations`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          setReservations(response.data.reservations);
        } catch (error) {
          console.error("Error fetching reservations:", error);
        }
      };

      fetchReservations();
    }
  }, [currentUser]);

  const handleCancel = async (reservation_id) => {
    if (currentUser) {
      const token = localStorage.getItem("token");
      const userId = currentUser.user_id; // currentUser에서 user_id 가져오기

      if (!token) {
        console.error("Invalid or missing token");
        return;
      }

      try {
        await instance.delete(`/dailband/user/${userId}/myreservations/${reservation_id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setReservations(prevReservations => prevReservations.filter(r => r.reservation_id !== reservation_id));
      } catch (error) {
        console.error("Error cancelling reservation:", error);
      }
    }
  };

  return (
    <div className="MyReservations">
      <Header />
      <div className="MyReservations-container">
        <Sidebar nickname={currentUser?.username} /> {/* currentUser에서 username 가져오기 */}
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
