import React, { useState, useEffect } from "react";
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import "./styles/Scrap.css";

// 정적 데이터
const sampleScrapPerformances = [
  {
    performance_id: 1,
    title: "블랙테트라",
    image_path: "/img/groupphoto1.jpg",
  },
  {
    performance_id: 2,
    title: "[서울과기대/개망나니] 개그 공연",
    image_path: "/img/groupphoto2.jpg",
  },
];

const sampleScrapPosts = [
  {
    post: {
      post_id: 1,
      title: "세션 게시판",
      content: "키보드 악보 연주하려고 하는데 중급자를 위한 곡을 추천해주세요",
      nickname: "kse",
      created_at: "2024.05.17",
    },
  },
  {
    post: {
      post_id: 2,
      title: "세션 게시판",
      content: "보컬 노래 연습 영상입니다",
      nickname: "kse",
      created_at: "2024.05.18",
    },
  },
];

function Scrap() {
  const [scrapPerformances, setScrapPerformances] = useState([]);
  const [scrapPosts, setScrapPosts] = useState([]);

  useEffect(() => {
    setScrapPerformances(sampleScrapPerformances);
    setScrapPosts(sampleScrapPosts);
  }, []);

  const handleDeletePerformance = (performance_id) => {
    setScrapPerformances(
      scrapPerformances.filter((performance) => performance.performance_id !== performance_id)
    );
  };

  const handleDeletePost = (post_id) => {
    setScrapPosts(scrapPosts.filter((post) => post.post.post_id !== post_id));
  };

  return (
    <div className="Scrap">
      <Header />
      <div className="Scrap-container">
        <Sidebar userId={1} nickname={"윤영선"} />
        <div className="Scrap-content">
          <h2 className="Scrap-title">스크랩</h2>

          <div className="Scrap-section">
            <h3>공연 홍보 게시글</h3>
            <div className="Scrap-performances">
              {scrapPerformances.length > 0 ? (
                scrapPerformances.map((performance) => (
                  <div key={performance.performance_id} className="Scrap-performance">
                    <img src={performance.image_path} alt={performance.title} />
                    <div>{performance.title}</div>
                    <button onClick={() => handleDeletePerformance(performance.performance_id)}>
                      삭제
                    </button>
                  </div>
                ))
              ) : (
                <p>스크랩한 공연이 없습니다.</p>
              )}
            </div>
          </div>

          <div className="Scrap-section">
            <h3>게시글</h3>
            <div className="Scrap-posts">
              {scrapPosts.length > 0 ? (
                scrapPosts.map((post) => (
                  <div key={post.post.post_id} className="Scrap-post">
                    <div className="Scrap-post-header">
                      <div className="Scrap-post-title">{post.post.title}</div>
                      <button onClick={() => handleDeletePost(post.post.post_id)}>삭제</button>
                    </div>
                    <div className="Scrap-post-content">
                      <p>{post.post.content}</p>
                      <p>작성자: {post.post.nickname}</p>
                      <p>작성 날짜: {post.post.created_at}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>스크랩한 게시글이 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scrap;
