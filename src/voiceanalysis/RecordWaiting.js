import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../shared/Header";
import './styles/RecordWaiting.css';

const RecordWaiting = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/record_result', { state: { data: [] } });
    }, 2000); // 5초 후에 결과 페이지로 이동

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="record-waiting-page">
        <h2 className="record-waiting-text">...분석 중...</h2>
        <div className="record-waiting-icon">
          <img src="/img/recording.png" alt="Recording" />
        </div>
      </div>
    </>
  );
};

export default RecordWaiting;
