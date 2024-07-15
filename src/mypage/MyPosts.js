import React, { useState, useEffect } from "react";
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import "./styles/MyPosts.css";
import { useNavigate } from 'react-router-dom';

// 게시판 ID와 이름을 매핑하는 객체
const boardMap = {
  1: 'pr',
  2: 'matching',
  3: 'performances',
  4: 'clubs',
  5: '5',
  6: 'guitar',
  7: 'vocal',
  8: 'bass',
  9: 'keyboard'
};

// 정적 데이터
const samplePosts = [
  {
    post_id: 4,
    title: "드럼페이지 게시글 4",
    content: "드럼 글의 내용",
    nickname: "yys",
    board_id: 5,
    created_at: "2024.06.16",
    file_url: "",
  },
  {
    post_id: 2,
    title: "깔루아 밴드 : 우리는 깔깔 깔루아!~ 홍익대 전통밴드 깔루아",
    content: "홍대 제일 밴드 깔루아에서 신입 부원을 모집합니다~!! 저희는 총 00명으로 구성되어있는 밴드이며 현재 ~~ 세션을 모집하고 있습니다!",
    nickname: "yys",
    board_id: 4,
    created_at: "2024.06.01",
    file_url: "",
  },
  {
    post_id: 3,
    title: "영선이네 밴드부의 영선입니다",
    content: "보컬을 담당하고 있습니다!",
    nickname: "yys",
    board_id: 1,
    created_at: "2024.06.04",
    file_url: "",
  },
  {
    post_id: 2,
    title: "홍익대 밴드 깔루아에서 연합 공연 팀을 모집합니다!!",
    content: "네 번째홍익대 밴드 깔루아에서 연합 공연 팀을 모집합니다!!",
    nickname: "yys",
    board_id: 2,
    created_at: "2024.06.02",
    file_url: "",
  },
];

function MyPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(samplePosts);
  }, []);

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
  const handleDelete = (post_id) => {
    setPosts(posts.filter(post => post.post_id !== post_id));
  };

  return (
    <div className="MyPosts">
      <Header />
      <div className="MyPosts-container">
        <Sidebar userId={1} nickname={"윤영선"} />
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
