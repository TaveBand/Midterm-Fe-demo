import React from 'react';
import { useLocation } from 'react-router-dom';
import './styles/RecordResult.css';

const RecordResult = () => {
  const location = useLocation();
  const { data } = location.state;

  return (
    <div className="results-page">
      <h2>분석 결과</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <img src={item.image_url} alt={item.title} />
            <p>제목: {item.title}</p>
            <p>아티스트: {item.artist}</p>
            <p>앨범: {item.album}</p>
            {item.pitch && <p>음역대: {item.pitch}</p>}
          </li>
        ))}
      </ul>
      <button onClick={() => window.location.href = '/recommendations'}>음악 추천 페이지로 이동</button>
    </div>
  );
};

export default RecordResult;