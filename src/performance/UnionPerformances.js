import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../shared/Header';
import Pagenumber from '../shared/Pagenumber';
import './styles/UnionPerformances.css';

function UnionPerformances() {
  const [performances, setPerformances] = useState([
    {
      performance_id: 1,
      title: '스튜디오에이 공연',
      content: '낭만으로~!',
      date: '2024_05_24',
      time: '19:00',
      venue: 'City Park',
      total_seats: 200,
      current_seats: 0,
      image_path: '/img/image4.png',
    },
    {
      performance_id: 2,
      title: '메이데이 : 2024',
      content: '메이데이!',
      date: '2024-04-15',
      time: '19:00:00',
      venue: 'Downtown Hall',
      total_seats: 500,
      current_seats: 50,
      image_path: '/img/image5.png',
    },
    {
      performance_id: 3,
      title: '연합공연 STRIVE',
      content: 'STRIVE',
      date: '2024-08-05',
      time: '20:00:00',
      venue: 'Beachside Stage',
      total_seats: 400,
      current_seats: 10,
      image_path: '/img/image6.png',
    },
    {
      performance_id: 4,
      title: 'SETTLER 정기 공연',
      content: 'SETTLER 최고에요!',
      date: '2024-10-10',
      time: '17:30:00',
      venue: 'Mountain Arena',
      total_seats: 200,
      current_seats: 0,
      image_path: '/img/image7.png',
    },
  ]);

  const [page, setPage] = useState(1);
  const postPerPage = 4;
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/boards/performances/${id}`);
  };
  const handleDelete = (id) => {
    setPerformances(performances.filter(performance => performance.performance_id !== id));
  };

  const handleWriteClick = () => {
    navigate('/performances/new');
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
    </div>
  );
}

export default UnionPerformances;
