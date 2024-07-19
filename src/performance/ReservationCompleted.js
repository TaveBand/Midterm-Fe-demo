import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../shared/Header';
import './styles/ReservationCompleted.css';

function ReservationCompleted() {
  const navigate = useNavigate();
  const { performance_id } = useParams(); // URL 파라미터에서 performance_id를 가져옵니다.
  const [reservation, setReservation] = useState(null);
  const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
  const user_id = localStorage.getItem('user_id'); // 로컬 스토리지에서 user_id 가져오기

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(`/dailband/performances/reservation/${performance_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // 서버에서 현재 예약 정보 가져오기
        setReservation(response.data); // 응답 데이터에서 예약 정보 저장
      } catch (error) {
        console.error('Failed to fetch reservation information:', error);
      }
    };

    fetchReservation();
  }, [performance_id, token]);

  const handleConfirmClick = () => {
    navigate(`/myreservations/${user_id}`); // user_id를 포함하여 예약 목록 페이지로 이동
  };

  if (!reservation) {
    return <div>로딩중...</div>; 
  }

  return (
    <div>
      <Header />
      <div className="reservation-completed">
        <div className="reservation-message">
          <div className="check-icon">✔️</div>
          <h1>예약이 확정되었습니다.</h1>
          <div className="reservation-details">
            <p>공연 제목: {reservation.title}</p>
            <p>날짜: {reservation.date}</p>
            <p>시간: {reservation.time}</p>
            <p>좌석: {reservation.seat}</p> 
          </div>
          <button className="confirm-button" onClick={handleConfirmClick}>확인하기!</button>
        </div>
      </div>
    </div>
  );
}

export default ReservationCompleted;
