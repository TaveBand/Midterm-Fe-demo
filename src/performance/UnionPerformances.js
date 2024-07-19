import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../shared/Header';
import Pagenumber from '../shared/Pagenumber';
import './styles/UnionPerformances.css';

function UnionPerformances() {
  const [performances, setPerformances] = useState([]);
  const [page, setPage] = useState(1);
  const [isWriting, setIsWriting] = useState(false);
  const [newPerformance, setNewPerformance] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    total_seats: 0,
    image_path: '',
    content: ''
  });

  const postPerPage = 4;
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('/dailband/boards/performances', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => setPerformances(response.data))
      .catch(error => console.error('Error fetching performances:', error));
  }, [token]);

  const handleCardClick = (performance_id) => {
    navigate(`/boards/performances/${performance_id}`);
  };

  const handleDelete = (performance_id) => {
    axios.delete(`/dailband/boards/performances/${performance_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        setPerformances(performances.filter(performance => performance.performance_id !== performance_id));
      })
      .catch(error => console.error('Error deleting performance:', error));
  };

  const handleWriteClick = () => {
    setIsWriting(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewPerformance({ ...newPerformance, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post('/dailband/boards/performances', newPerformance, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setPerformances([...performances, response.data]);
        setIsWriting(false);
      })
      .catch(error => console.error('Error adding performance:', error));
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = performances.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      <Header />
      <div className="union-performances">
        <h1>공연 홍보 게시판</h1>
        <input type="text" placeholder="공연 제목을 검색하세요" className="union-performances-search-bar" />
        {isWriting ? (
          <div className="performance-form">
            <h2>새 공연 작성</h2>
            <form onSubmit={handleFormSubmit}>
              <label>제목</label>
              <input type="text" name="title" value={newPerformance.title} onChange={handleFormChange} required />
              <label>날짜</label>
              <input type="date" name="date" value={newPerformance.date} onChange={handleFormChange} required />
              <label>시간</label>
              <input type="time" name="time" value={newPerformance.time} onChange={handleFormChange} required />
              <label>장소</label>
              <input type="text" name="venue" value={newPerformance.venue} onChange={handleFormChange} required />
              <label>총 좌석 수</label>
              <input type="number" name="total_seats" value={newPerformance.total_seats} onChange={handleFormChange} required />
              <label>이미지 경로</label>
              <input type="text" name="image_path" value={newPerformance.image_path} onChange={handleFormChange} />
              <label>내용</label>
              <textarea name="content" value={newPerformance.content} onChange={handleFormChange} required></textarea>
              <button type="submit">작성 완료</button>
              <button type="button" onClick={() => setIsWriting(false)}>취소</button>
            </form>
          </div>
        ) : (
          <div>
            <div className="union-performances-cards">
              {currentPosts.map(performance => (
                <div key={performance.performance_id} className="union-performances-card">
                  <img src={performance.image_path || '/img/default.png'} alt={performance.title} className="union-performances-card-image" onClick={() => handleCardClick(performance.performance_id)} />
                  <div className="union-performances-card-content">
                    <h3 onClick={() => handleCardClick(performance.performance_id)}>{performance.title}</h3>
                    <p>{performance.date} {performance.time}</p>
                    <p>{performance.venue}</p>
                    <p>{performance.content}</p>
                    <button className="union-performances-delete-button" onClick={() => handleDelete(performance.performance_id)}>삭제</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="union-performances-pagination">
              <div className="pagination-wrapper">
                <Pagenumber
                  totalCount={performances.length}
                  page={page}
                  postPerPage={postPerPage}
                  pageRangeDisplayed={10}
                  handlePageChange={handlePageChange}
                />
                <button className="union-performances-write-button" onClick={handleWriteClick}>글쓰기</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UnionPerformances;
