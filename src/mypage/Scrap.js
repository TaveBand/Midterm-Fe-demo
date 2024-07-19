import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import "./styles/Scrap.css";
import { useAuth } from '../authentication/AuthContext';

function Scrap() {
  const { user } = useAuth();
  const [scrapPerformances, setScrapPerformances] = useState([]);
  const [scrapPosts, setScrapPosts] = useState([]);

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Invalid or missing token");
        return;
      }

      const fetchScrapPerformances = async () => {
        try {
          const response = await axios.get(`/dailband/user/scraps/myperformances`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          setScrapPerformances(response.data.scrap_performance.map(item => item.performance));
        } catch (error) {
          console.error("Error fetching performances:", error);
        }
      };

      const fetchScrapPosts = async () => {
        try {
          const response = await axios.get(`/dailband/user/scraps/posts`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          setScrapPosts(response.data.scrap_post.map(item => item.post));
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };

      fetchScrapPerformances();
      fetchScrapPosts();
    }
  }, [user]);

  const handleDeletePerformance = async (performance_id) => {
    if (user) {
      const token = localStorage.getItem("token");

      try {
        await axios.delete(`/dailband/user/scraps/myperformances/${performance_id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setScrapPerformances(scrapPerformances.filter(performance => performance.performance_id !== performance_id));
      } catch (error) {
        console.error("Error deleting performance:", error);
      }
    }
  };

  const handleDeletePost = async (post_id) => {
    if (user) {
      const token = localStorage.getItem("token");

      try {
        await axios.delete(`/dailband/user/scraps/posts/${post_id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
        setScrapPosts(scrapPosts.filter(post => post.post_id !== post_id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <div className="Scrap">
      <Header />
      <div className="Scrap-container">
        <Sidebar />
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
                    <button onClick={() => handleDeletePerformance(performance.performance_id)}>삭제</button>
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
                  <div key={post.post_id} className="Scrap-post">
                    <div className="Scrap-post-header">
                      <div className="Scrap-post-title">{post.title}</div>
                      <button onClick={() => handleDeletePost(post.post_id)}>삭제</button>
                    </div>
                    <div className="Scrap-post-content">
                      <p>{post.content}</p>
                      <p>작성 날짜: {post.created_at}</p>
                      <p>파일: <a href={post.file_url} target="_blank" rel="noopener noreferrer">{post.file_url}</a></p>
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
