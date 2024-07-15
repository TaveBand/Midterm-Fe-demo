import React from 'react';
import Header from "../shared/Header";
import './styles/Recommendation.css';

const recommendations = [
  {
    image: '/img/buzz1.png',
    title: 'Buzz - 남자를 몰라',
    description: '매번 늦어버렸어 누구를 만났나고 고칠 수 없던 너의 맑은 번영의 눈빛'
  },
  {
    image: '/img/FT1.png',
    title: 'FT Island - 바래',
    description: '하늘이 빛나는 내가 잠시 길을 잃었을 때 다시 태어나도 널 사랑할게'
  },
  {
    image: '/img/lucy.png',
    title: 'Lucy - 조깅',
    description: '내 마음 속에 너를 담아 매일 조깅을 해 너와 함께 하는 이 순간들이 소중해'
  },
  {
    image: '/img/day6.png',
    title: 'Day6 - 예뻤어',
    description: '넌 내게 가장 예뻤어 우리의 시간 속에 머물러줘'
  }
];

const Recommendation = () => {
  return (
    <>
      <Header />
      <div className="recommendation-page">
        <h2 className="recommendation-title">
          <span className="highlight">2옥시♪</span>에 어울리는 음역대 <span className="highlight">윤영선님을</span> 위한 노래 추천♪
        </h2>
        <div className="recommendation-list">
          {recommendations.map((item, index) => (
            <div className="recommendation-item" key={index}>
              <div className="recommendation-image-container">
                <img src={item.image} alt={item.title} className="recommendation-image" />
              </div>
              <div className="recommendation-details">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
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
