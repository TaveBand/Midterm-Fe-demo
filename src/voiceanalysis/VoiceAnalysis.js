import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../shared/Header";
import './styles/VoiceAnalysis.css';

const VoiceAnalysis = () => {
  const navigate = useNavigate();

  const handleAnalysisClick = () => {
    // 분석하러 가기 버튼 클릭 시 동작
    console.log('분석하러 가기 버튼 클릭됨');
  };

  const handleRecordClick = () => {
    // 녹음하러 가기 버튼 클릭 시 동작
    navigate('/record');
  };

  return (
    <>
      <Header />
      <section className="analysis">
        <div className="content-wrapper">
          <div className="analysis-content">
            <h2>나의 적정 음역대는??</h2>
            <h3>음역대에 맞는 노래 추천 서비스 제공</h3>
            <p>
              보컬 음성 분석 기능을 통해 사용자의 음역대를 분석하고, 그에 맞는 노래를 추천해주는 서비스도 포함되어 있습니다.
              이를 통해 사용자는 자신의 음역대에 맞는 곡을 찾아 연습할 수 있으며, AI 편곡 서비스를 통해 음역대에 맞게 노래를
              새롭게 편곡할 수 있습니다.
            </p>
            <div className="buttons">
              <button onClick={handleRecordClick}>녹음하러 가기♪</button>
              <button onClick={handleAnalysisClick}>분석하러 가기♪</button>
            </div>
          </div>
          <div className="images">
            <img src="/img/voice.png" alt="Voice Analysis" />
          </div>
        </div>
      </section>
    </>
  );
};

export default VoiceAnalysis;