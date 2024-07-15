import React, { useState, useEffect } from "react";
import instance from "axios"; // axios instance 사용
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import "./styles/MyPosts.css";
import { useAuth } from '../authentication/AuthContext';
import { useNavigate } from 'react-router-dom';

// 게시판 ID와 이름을 매핑하는 객체
const boardMap = {
  1: 'pr',
  2: 'union-performances',
  3: 'performances',
  4: 'clubs',
  5: 'drum',
  6: 'guitar',
  7: 'vocal',
  8: 'bass',
  9: 'keyboard'
};


function MyPosts() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const token = localStorage.getItem("token");
      const userId = currentUser.user_id; // currentUser에서 user_id 가져오기

      if (!token) {
        console.error("Invalid or missing token");
        return;
      }

      const fetchPosts = async () => {
        try {
          const response = await instance.get(`/dailband/user/${userId}/posts`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          setPosts(response.data.posts);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };

      fetchPosts();
    }
  }, [currentUser]);

  // 게시글 상세보기 페이지로 이동하는 함수
  const handleViewDetail = (board_id, post_id) => {
    const board = boardMap[board_id];
    if (board) {
      navigate(`/boards/${board}/${post_id}`);
    } else {
      console.error(`Invalid board_id: ${board_id}`);
    }
  };

  // 게시글 삭제 함수
  const handleDelete = async (post_id) => {
    if (currentUser) {
      const token = localStorage.getItem("token");
      const userId = currentUser.user_id; // currentUser에서 user_id 가져오기

      if (!token) {
        console.error("Invalid or missing token");
        return;
      }

      try {
        await instance.delete(`/dailband/user/${userId}/posts/${post_id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        // 성공적으로 삭제된 후, 해당 게시글을 상태에서 제거합니다.
        setPosts(posts.filter(post => post.post_id !== post_id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <div className="MyPosts">
      <Header />
      <div className="MyPosts-container">
        <Sidebar nickname={currentUser?.username} /> {/* currentUser에서 nickname 가져오기 */}
        <div className="MyPosts-content">
          <h2 className="MyPosts-title">내가 쓴 글</h2>
          <div className="MyPosts-list">
            {posts.length > 0 ? (
              posts.map(post => (
                <div key={post.post_id} className="MyPosts-item">
                  <div className="MyPosts-header">
                    <h3>{post.title}</h3>
                    <button onClick={() => handleViewDetail(post.board_id, post.post_id)}>상세보기</button>
                    <button onClick={() => handleDelete(post.post_id)}>삭제</button>
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
