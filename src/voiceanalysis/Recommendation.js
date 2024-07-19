import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from "../shared/Header";
import './styles/Recommendation.css';

const defaultData = {
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

const Recommendation = () => {
  const location = useLocation();
  const data = location.state?.data || defaultData;

  return (
    <>
      <Header />
      <div className="recommendation-page">
        <h2 className="recommendation-title">
          <span className="highlight">2옥라♪</span>에 어울리는 음역대 <span className="highlight">당신을</span> 위한 노래 추천♪
        </h2>
        <div className="recommendation-list">
          {data.recommendations.map((item, index) => (
            <div className="recommendation-item" key={index}>
              <div className="recommendation-image-container">
                <img src={item.image_url} alt={item.title} className="recommendation-image" />
              </div>
              <div className="recommendation-details">
                <h3>{item.title}</h3>
                <p>{item.artist}</p>
                <p>{item.album}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="more-button">자세히 보기</button>
      </div>
    </>
  );
};

export default Recommendation;
