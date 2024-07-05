import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import instance from "./axios";
import Header from "../components/Header";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const handleIconClick = (session) => {
    // 세션 페이지로 이동하는 함수 (URL은 필요에 맞게 수정)
    window.location.href = `/${session}`;
  };
  const [currentPosts, setCurrentPosts] = useState([]);
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
  };


  const IndexLastPost = page

  const [loading, setLoading] = useState(false);
  const { post_id } = useParams();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await instance.get("/posts");
      setPosts(res.data.posts);
     
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [IndexLastPost, page]);

  const [showRecruitment, setShowRecruitment] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleRecruitmentClick = () => {
    setShowRecruitment(true);
    setSelectedPost(null); // 기존에 선택된 게시글 초기화
  };

  const handleIntroductionClick = () => {
    setShowRecruitment(false);
    setSelectedPost(null); // 기존에 선택된 게시글 초기화
  };

  const handlePostClick = (postId) => {
    setSelectedPost(postId);
    window.location.href = `/boards/clubs/${postId}`;
  };

  const handleConcertClick = (concertId) => {
    // 클릭된 공연에 해당하는 페이지로 이동
    window.location.href = `/concerts/${concertId}`; // 예시 URL, 실제 경로에 맞게 수정해주세요.
  };
  
  const handleAnalysisClick = () => {
    // 분석 페이지로 이동하는 함수 (URL은 필요에 맞게 수정)
    window.location.href = '/analysis';
  };

  const posts1 = [
    {
      id: 1,
      type: 'recruitment',
      title: '밴드동아리 세션 모집글 1',
      details: '동아리 모집글 내용 1 : ㅇㅇ대학교 밴드부 ㅇㅇㅇㅇ에서 세션을 구합니다! 남녀노소 환영합니다'
    },
    {
      id: 2,
      type: 'recruitment',
      title: '동아리 모집글 2',
      details: '동아리 모집글 내용 2',
    },
    {
      id: 3,
      type: 'introduction',
      title: '개인 소개글 1',
      details: '개인 소개글 내용 1',
    },
    {
      id: 4,
      type: 'introduction',
      title: '개인 소개글 2',
      details: '개인 소개글 내용 2',
    },
  ];

  return (
    <div>
      <Header />
      <section className="banner">
        <div className="banner-image">
          <img alt="Band" src="/img/image1.png" />
        </div>
        <div className="banner-text">
          <div>밴드 동아리 커뮤니티와</div>
          <div>보컬 음성 분석 서비스를 한번에~!</div>
        </div>
      </section>

      <section className="features">
        <h2>세션끼리 소통하고 싶다면?</h2>
        <div className="icons">
          <div className="icon" onClick={() => handleIconClick('boards/5')}>
            <span role="img" aria-label="드럼">🥁</span> 
            <div className="icon-label">드럼</div>
          </div>
          <div className="icon" onClick={() => handleIconClick('boards/6')}>
            <span role="img" aria-label="기타">🎸</span> 
            <div className="icon-label">기타</div>
          </div>
          <div className="icon" onClick={() => handleIconClick('boards/7')}>
            <span role="img" aria-label="보컬">🎤</span> 
            <div className="icon-label">보컬</div>
          </div>
          <div className="icon" onClick={() => handleIconClick('boards/8')}>
            <span role="img" aria-label="베이스">🎸</span> 
            <div className="icon-label">베이스</div>
          </div>
          <div className="icon" onClick={() => handleIconClick('boards/9')}>
            <span role="img" aria-label="키보드">🎹</span> 
            <div className="icon-label">키보드</div>
          </div>
        </div>
      </section>

      <section className="home">
  <h2>동아리 멤버 모집은 여기서!</h2>
  <button onClick={handleRecruitmentClick} className={`recruitment-button ${showRecruitment ? 'active' : ''}`}>
    최근 동아리 모집글 보기
  </button>
  <button onClick={handleIntroductionClick} className={`introduction-button ${!showRecruitment ? 'active' : ''}`}>
    최근 개인 소개글 보기
  </button>

  <div className="post-list">
    {showRecruitment && posts
      .slice(-3, -1)
      .map((post) => (
        <div key={post.post_id} onClick={() => handlePostClick(post.post_id)} className="post-item">
          <div className="post-box">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        </div>
      ))}
    {!showRecruitment && posts1
      .filter((post) => post.type === 'introduction')
      .slice(0, 2)
      .map((post) => (
        <div key={post.id} onClick={() => handlePostClick(post.id)} className="post-item">
          <div className="post-box">
            <h3>{post.title}</h3>
            <p>{post.details}</p>
          </div>
        </div>
      ))}
  </div>
</section>

<section className="concerts">
  <h2>연합 공연 관련 소식</h2>
  <div className="concert-cards">
    <div className="concert-card" onClick={() => handleConcertClick('concert1')}>
      <img src="img/image4.png" alt="Concert 1" />
      <h3>Concert 1</h3>
      <p>Concert 1에 대한 설명이 여기에 들어갑니다.</p>
    </div>
    <div className="concert-card" onClick={() => handleConcertClick('concert2')}>
      <img src="img/image5.png" alt="Concert 2" />
      <h3>Concert 2</h3>
      <p>Concert 2에 대한 설명이 여기에 들어갑니다.</p>
    </div>
    <div className="concert-card" onClick={() => handleConcertClick('concert3')}>
      <img src="img/image6.png" alt="Concert 3" />
      <h3>Concert 3</h3>
      <p>Concert 3에 대한 설명이 여기에 들어갑니다.</p>
    </div>
  </div>
</section>
<section className="analysis">
  <div>
    <h2>보컬 음역대를 분석하여</h2>
    <h2>음악대에 맞는 노래 추천 서비스 제공</h2>
    <p>보컬 음성 분석 기능을 통해 사용자의 음역대를 분석하고, 그에 맞는 노래를 추천해주는 서비스도 포함되어</p>
    <p>있습니다. 이를 통해 사용자는 자신의 음역대에 맞는 곡을 찾아 연습할 수 있으며, AI 편곡 서비스를 통해</p> 
    <p>음역대에 맞게 노래를 새롭게 편곡할 수 있습니다</p>
    <button onClick={() => handleAnalysisClick()}>분석하러 가기♪</button>
  </div>
  <div className="images">
    <img src="/img/voice.png" alt="Image 1" />
  </div>
</section>
      <footer className="footer">
        <div className="social-links">
          <a href="#">영선이네 밴드부</a>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
        </div>
      </footer>
    </div>
  );
}


export default Home;