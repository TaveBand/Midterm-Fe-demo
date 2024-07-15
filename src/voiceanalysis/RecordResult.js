import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from "../shared/Header";
import './styles/RecordResult.css';

const RecordResult = () => {
  const location = useLocation();
  const { data } = location.state;

  return (
    <>
      <Header />
      <div className="record-result-page">
        <div className="record-result-header">
          <div className="record-result-text">
            <h2 className="record-result-title">당신의 음역대는??<br />적정 음역대는<span className="highlight">2옥시♪</span> 입니다!</h2>
            <div className="record-result-info">
              <p>최고음 : <span className="highlight">2옥시♪</span> </p>
              <p>최저음 : 1옥도♪</p>
              <p>평균 및 퍼펙트 음정 음 : 2옥솔♪</p>
            </div>
            <div className="record-result-buttons">
              <button onClick={() => window.location.href = '/record'}>다시 녹음하러 가기 ♪</button>
              <button onClick={() => window.location.href = '/recommendations'}>추천 받으러 가기 ♪</button>
            </div>
          </div>
          <img src="/img/voice.png" alt="Voice Analysis" className="voice-image" />
        </div>
        <h3>음성분석 결과</h3>
        <div className="record-result-graph">
          <img src="/img/wave.png" alt="Voice Analysis Graph" />
        </div>
      </div>
    </>
  );
};

export default RecordResult;
