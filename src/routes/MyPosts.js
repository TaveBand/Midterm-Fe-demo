import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./MyPosts.css";

function MyPosts() {
  const user_id = sessionStorage.getItem("userId"); // 세션에서 user_id 가져오기
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/dailband/user/${user_id}/posts`, {
          withCredentials: true
        });
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [user_id]);

  return (
    <div className="MyPosts">
      <Header />
      <div className="MyPosts-container">
        <Sidebar nickname="윤영선" /> {/* 예시로 윤영선 사용 */}
        <div className="MyPosts-content">
          <h2 className="MyPosts-title">내가 쓴 글</h2>
          <div className="MyPosts-list">
            {posts.length > 0 ? (
              posts.map(post => (
                <div key={post.post_id} className="MyPosts-item">
                  <div className="MyPosts-header">
                    <h3>{post.title}</h3>
                    <button>삭제</button>
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