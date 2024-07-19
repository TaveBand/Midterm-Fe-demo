import React, { useState, useEffect } from "react";
import instance from "axios"; 
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import "./styles/MyPosts.css";
import { useNavigate } from 'react-router-dom';

function MyPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const fetchUserInfos = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Invalid or missing token");
        return;
      }

      try {
        const response = await instance.get(`/dailband/user/profile`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setNickname(response.data.nickname);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Invalid or missing token");
        return;
      }

      try {
        const response = await instance.get(`/dailband/user/posts`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchUserInfos();
    fetchPosts();
  }, []);

  const handleViewDetail = (board_id, post_id) => {
    const boardPaths = {
      1: 'pr',
      2: 'matching',
      3: 'performances',
      4: 'clubs',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9'
    };

    const path = boardPaths[board_id];
    if (path) {
      navigate(`/boards/${path}/${post_id}`);
    } else {
      console.error(`Invalid board_id: ${board_id}`);
    }
  };

  const handleDelete = async (post_id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Invalid or missing token");
      return;
    }

    try {
      await instance.delete(`/dailband/user/posts/${post_id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setPosts(posts.filter(post => post.post_id !== post_id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="MyPosts">
      <Header />
      <div className="MyPosts-container">
        <Sidebar nickname={nickname} /> 
        <div className="MyPosts-content">
          <h2 className="MyPosts-title">내가 쓴 글</h2>
          <div className="MyPosts-list">
            {posts.length > 0 ? (
              posts.map(post => (
                <div key={post.post_id} className="MyPosts-item">
                  <div className="MyPosts-header">
                    <h3>{post.title}</h3>
                    <div className="MyPosts-buttons">
                      <button onClick={() => handleViewDetail(post.board_id, post.post_id)}>상세보기</button>
                      <button onClick={() => handleDelete(post.post_id)}>삭제</button>
                    </div>
                  </div>
                  <div className="MyPosts-body">
                    <p>{post.content}</p>
                    <p>작성자: {post.nickname}</p>
                    <p>작성 날짜: {post.created_at}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>작성한 글이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPosts;
