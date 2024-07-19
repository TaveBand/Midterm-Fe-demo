import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../shared/Header';
import './styles/UnionPerformanceDetail.css';

function UnionPerformanceDetail() {
  const { performance_id } = useParams();
  const navigate = useNavigate();
  const [performance, setPerformance] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    total_seats: 0,
    image_path: '',
    content: ''
  });

  const token = localStorage.getItem('token'); 

  useEffect(() => {
    axios.get(`/dailband/boards/performances/${performance_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setPerformance(response.data);
        setFormData(response.data);
      })
      .catch(error => console.error('Error fetching performance:', error));
  }, [performance_id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/dailband/boards/performances/${performance_id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setPerformance(response.data);
        setIsEditing(false);
      })
      .catch(error => console.error('Error updating performance:', error));
  };

  const handleDelete = () => {
    axios.delete(`/dailband/boards/performances/${performance_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        navigate('/dailband/boards/performances');
      })
      .catch(error => console.error('Error deleting performance:', error));
  };

  const handleReservation = () => {
    navigate(`/reservations/${performance_id}`);
  };

  return (
    <div>
      <Header />
      <div className="performance-detail">
        {isEditing ? (
          <div className="performance-form">
            <h1>공연 홍보 게시글 수정</h1>
            <form onSubmit={handleSubmit}>
              <label>제목</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required />
              <label>날짜</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
              <label>시간</label>
              <input type="time" name="time" value={formData.time} onChange={handleChange} required />
              <label>장소</label>
              <input type="text" name="venue" value={formData.venue} onChange={handleChange} required />
              <label>총 좌석 수</label>
              <input type="number" name="total_seats" value={formData.total_seats} onChange={handleChange} required />
              <label>이미지 경로</label>
              <input type="text" name="image_path" value={formData.image_path} onChange={handleChange} />
              <label>내용</label>
              <textarea name="content" value={formData.content} onChange={handleChange} required></textarea>
              <button type="submit">수정</button>
            </form>
          </div>
        ) : (
          performance && (
            <div className="performance-detail-content">
              <img src={performance.image_path || '/img/default.png'} alt={performance.title} />
              <h1>{performance.title}</h1>
              <p>날짜: {performance.date}</p>
              <p>시간: {performance.time}</p>
              <p>장소: {performance.venue}</p>
              <p>총 좌석 수: {performance.total_seats}</p>
              <button className="reserve-button" onClick={handleReservation}>예매하기</button>
              <div className="content">
                <p>{performance.content}</p>
              </div>
              <button onClick={() => setIsEditing(true)}>수정</button>
              <button onClick={handleDelete}>삭제</button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default UnionPerformanceDetail;