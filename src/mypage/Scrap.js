import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import "./styles/Scrap.css";

function Scrap() {
  const user_id = sessionStorage.getItem("userId"); // 세션에서 user_id 가져오기
  const [scrapPerformances, setScrapPerformances] = useState([]);
  const [scrapPosts, setScrapPosts] = useState([]);

  useEffect(() => {
    const fetchScrapPerformances = async () => {
      try {
        const response = await axios.get(`/dailband/user/${user_id}/scraps/myperformances`, {
          withCredentials: true
        });
        console.log("Scrap Performances:", response.data.scrap_performance);
        setScrapPerformances(response.data.scrap_performance);
      } catch (error) {
        console.error("Error fetching performances:", error);
      }
    };

    const fetchScrapPosts = async () => {
      try {
        const response = await axios.get(`/dailband/user/${user_id}/scraps/posts`, {
          withCredentials: true
        });
        console.log("Scrap Posts:", response.data.scrap_post);
        setScrapPosts(response.data.scrap_post);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchScrapPerformances();
    fetchScrapPosts();
  }, [user_id]);

  return (
    <div className="Scrap">
      <Header />
      <div className="Scrap-container">
        <Sidebar nickname="윤영선" /> {/* 예시로 윤영선 사용 */}
        <div className="Scrap-content">
          <h2 className="Scrap-title">스크랩</h2>

          <div className="Scrap-section">
            <h3>공연 홍보 게시글</h3>
            <div className="Scrap-performances">
              {scrapPerformances.length > 0 ? (
                scrapPerformances.map(performance => (
                  <div key={performance.performance_id} className="Scrap-performance">
                    <img src={performance.image_path} alt={performance.title} />
                    <div>{performance.title}</div>
                    <button>삭제</button>
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
                scrapPosts.map(post => (
                  <div key={post.post.post_id} className="Scrap-post">
                    <div className="Scrap-post-header">
                      <div className="Scrap-post-title">{post.post.title}</div>
                      <button>삭제</button>
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
