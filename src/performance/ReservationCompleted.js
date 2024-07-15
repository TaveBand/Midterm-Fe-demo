import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../shared/Header';
import './styles/ReservationCompleted.css';

function ReservationCompleted() {
  const navigate = useNavigate();
  const { user_id } = useParams(); // useParams를 사용하여 user_id를 가져옵니다.

  const handleConfirmClick = () => {
    navigate(`/myreservations/${user_id}`);
  };

  return (
    <div>
      <Header />
      <div className="reservation-completed">
        <div className="reservation-message">
          <div className="check-icon">✔️</div>
          <h1>예약이 확정되었습니다.</h1>
          <div className="reservation-details">
            <p> 스튜디오에이 5월 단독공연</p>
            <p> 날짜: 2024년 05월 24일(금)</p>
            <p> 시간: 19:00 (150분)</p>
          </div>
          <button className="confirm-button" onClick={handleConfirmClick}>확인하기!</button>
        </div>
      </div>
    </div>
  );
}

export default ReservationCompleted;
