import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../shared/Header';
import './styles/UnionPerformanceDetail.css';

const samplePerformances = [
  {
    performance_id: 1,
    title: '스튜디오에이 5월 단독 공연',
    content: '🦋🫧 스튜디오에이 5월 단독공연 🫧🦋 홍익대학교 건축학과의 유일무이한 밴드 소모임 스튜디오에이(Studio.A)의 5월 단독공연에 여러분을 초대합니다:) 음악을 좋아하시는 분이라면 누구든 즐길 수 있도록 준비했으니 많은 성원 부탁드립니다! | 공연 안내 | 장소: 홍대 001 클럽 (마포구 와우산로 18길 20) 일시: 2024년 5월 24일 금요일 19시 00분 티켓구매: 대일밴드 온라인 사전 예매 / 현장 예매 가격: 5000원 / 6000원 | Setlist | (여자)아이들 - 나는 아픈건 딱 질색이니까 LUCY - Flare DAY6 - Man in a Movie The Volunteers - PINKTOP 혁오 - Burning Youth 너드커넥션 - Hollywood Movie Star 자우림 - 매직 카펫 라이드 2NE1 - You And I 나상현씨밴드 - 덩그러니 유다빈밴드 - 백일몽 태연 - Time Lapse 문의: 김00 (010-1234-5678) | 공연 관련 문의 | 스튜디오 에이 Instagram @studioa_hsa 스튜디오 에이 기장 김서영 010-4061-8140 티켓 사전예매 티켓5000원 ∙ 두둥티켓 ∙ 인당 4매 제한 22매 남음 예매하기',
    date: '2024-12-20',
    time: '18:00:00',
    venue: 'City Park',
    total_seats: 200,
    current_seats: 0,
    image_path: '/img/image4.png'
  },
  {
    performance_id: 2,
    title: '메이데이 : 2024 밴드 연합공연',
    content: 'Summer Jam',
    date: '2024-04-15',
    time: '19:00:00',
    venue: 'Downtown Hall',
    total_seats: 500,
    current_seats: 50,
    image_path: '/img/image5.png'
  },
  {
    performance_id: 3,
    title: '연합공연 STRIVE',
    content: 'dolor sit amet',
    date: '2024-08-05',
    time: '20:00:00',
    venue: 'Beachside Stage',
    total_seats: 400,
    current_seats: 10,
    image_path: '/img/image6.png'
  },
  {
    performance_id: 4,
    title: 'SETTLER 정기 공연',
    content: 'consectetur adipiscing',
    date: '2024-10-10',
    time: '17:30:00',
    venue: 'Mountain Arena',
    total_seats: 200,
    current_seats: 0,
    image_path: '/img/image7.png'
  }
];

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

  useEffect(() => {
    const performanceData = samplePerformances.find(p => p.performance_id.toString() === performance_id);
    if (performanceData) {
      setPerformance(performanceData);
      setFormData(performanceData);
    }
  }, [performance_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPerformances = samplePerformances.map(p =>
      p.performance_id.toString() === performance_id ? { ...p, ...formData } : p
    );
    console.log('Updated Performances:', updatedPerformances);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const updatedPerformances = samplePerformances.filter(p => p.performance_id.toString() !== performance_id);
    console.log('Remaining Performances:', updatedPerformances);
    navigate('/dailband/boards/performances');
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