import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../shared/Header';
import './styles/Reservation.css';

const totalSeats = 200;
const reservedSeats = Array.from({ length: 24 }, (_, i) => i + 1); // 예시로 24개의 좌석이 예약됨

function Reservation() {
  const { performance_id } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else if (selectedSeats.length < 5) {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleReservationConfirm = () => {
    console.log('Selected seats:', selectedSeats);
    navigate('/reservation_completed');
  };

  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= totalSeats; i++) {
      const isReserved = reservedSeats.includes(i);
      const isSelected = selectedSeats.includes(i);
      seats.push(
        <div
          key={i}
          className={`seat ${isReserved ? 'reserved' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => !isReserved && handleSeatClick(i)}
        />
      );
    }
    return seats;
  };

  return (
    <div>
      <Header />
      <div className="reservation-page">
        <div className="seat-map">
          <div className="stage">무대</div>
          <div className="seats">{renderSeats()}</div>
        </div>
        <div className="reservation-info">
          <p>잔여 좌석: {totalSeats - reservedSeats.length}/{totalSeats}</p>
          <p>선택한 좌석 수: {selectedSeats.length}</p>
          <button className="reservation-button" onClick={handleReservationConfirm} disabled={selectedSeats.length === 0}>
            예매하기!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
