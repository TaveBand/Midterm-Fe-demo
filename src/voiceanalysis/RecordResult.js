import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "../shared/Header";
import './styles/RecordResult.css';

const RecordResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {
    max_pitch: "2옥시",
    min_pitch: "1옥도",
    recommendations: [
      {
        title: "Buzz - 남자를 몰라",
        artist: "Buzz",
        album: "Red",
        image_url: "/img/buzz1.png",
      },
      {
        title: "FT Island - 바래",
        artist: "FT Island",
        album: "Cross & Change",
        image_url: "/img/FT1.png",
      },
      {
        title: "Lucy - 조깅",
        artist: "Lucy",
        album: "Lucy",
        image_url: "/img/lucy.png",
      },
      {
        title: "Day6 - 예뻤어",
        artist: "Day6",
        album: "Daydream",
        image_url: "/img/day6.png",
      }
    ]
  };

  const maxPitch = data?.max_pitch || "2옥 라";
  const minPitch = data?.min_pitch || "1옥 도";
  const recommendations = data?.filter(item => item.title) || [];  // 제목이 있는 항목만 추천 리스트로 사용

  return (
    <>
      <Header />
      <div className="record-result-page">
        <div className="record-result-header">
          <div className="record-result-text">
            <h2 className="record-result-title">당신의 음역대는??<br />적정 음역대는<span className="highlight">{maxPitch}♪</span> 입니다!</h2>
            <div className="record-result-info">
              <p>최고음 : <span className="highlight">{maxPitch}♪</span> </p>
              <p>최저음 : {minPitch}♪</p>
            </div>
            <div className="record-result-buttons">
              <button onClick={() => navigate('/record')}>다시 녹음하러 가기 ♪</button>
              <button onClick={() => navigate('/recommendations', { state: { data } })}>추천 받으러 가기 ♪</button>
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


