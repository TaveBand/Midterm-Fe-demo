import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../shared/Header';
import './styles/Reservation.css';

const Reservation = () => {
  const { performance_id } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [totalSeats, setTotalSeats] = useState(0);

  // Token 가져오기
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const response = await axios.get(`/dailband/performances/reservation/${performance_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setReservedSeats(response.data.reservedSeats);
        setTotalSeats(response.data.totalSeats);
      } catch (error) {
        console.error('Failed to fetch reservation data:', error);
      }
    };

    fetchReservationData();
  }, [performance_id, token]);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else if (selectedSeats.length < 5) {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleReservationConfirm = async () => {
    try {
      const reservations = selectedSeats.map(seat_id => ({ seat_id }));

      for (const reservation of reservations) {
        await axios.post(`/dailband/performances/reservation/${performance_id}`, reservation, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }

      navigate('/reservation_completed');
    } catch (error) {
      console.error('Failed to reserve seats:', error);
    }
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
};

export default Reservation;
