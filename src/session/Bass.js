import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Header from "../shared/Header";
import Pagenumber from "../shared/Pagenumber";
import SessionBtns from "../shared/SessionBtns";
import "./styles/Drum.css";

function Bass() {
  const { post_id } = useParams();
  const [posts, setPosts] = useState([]);
  const [coverimages, setCoverImages] = useState();
  const [currentPosts, setCurrentPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isWriting, setIsWriting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [videoPosts, setVideoPosts] = useState([]);
  const [boardType, setBoardType] = useState("베이스 게시판 게시글");
  const [youtubeLink, setYoutubeLink] = useState("");
  const handlePageChange = (page) => {
    setPage(page);
  };
  const [postPerPage] = useState(2);

  const IndexLastPost = page * postPerPage;
  const IndexFirstPost = IndexLastPost - postPerPage;
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [nickname, setNickname] = useState("");
  const board_id = 8;

  const fetchUserInfos = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Invalid or missing token");
      return;
    }

    try {
      const response = await axios.get(`/dailband/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNickname(response.data.nickname);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
  const fetchPosts = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`/dailband/boards/$${board_id}`);
      setPosts(res.data.posts);
      setCurrentPosts(res.data.posts.slice(IndexFirstPost, IndexLastPost));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchUserInfos();
  }, [IndexFirstPost, IndexLastPost, page]);

  const fetchVideoPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/dailband/boards/$${board_id}`);
      setVideoPosts(res.data.posts);
      console.log(res.data.posts);
    } catch (error) {
      console.error("Error fetching video posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // fetchUserInfos();
  }, [IndexFirstPost, IndexLastPost, page]);

  useEffect(() => {
    fetchVideoPosts();
  }, []);
  const handleWriteClick = () => {
    setIsWriting(true); // 글 작성
    setIsEditing(false);
    setTitle("");
    setContent("");
    setImage(null);
    setImagePreview(null);
    setYoutubeLink("");
    setBoardType("베이스 게시판 게시글");
  };
  const handleBackClick = () => {
    setIsWriting(false); // 다시 게시판으로
    setIsEditing(false);
    setTitle("");
    setContent("");
    setImage(null);
    setImagePreview(null);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };
  const handleBoardTypeChange = (e) => {
    setBoardType(e.target.value);
  };

  const handleYoutubeLinkChange = (e) => {
    setYoutubeLink(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ title, content, imagePreview, youtubeLink });

    let newPost;
    if (boardType === String("베이스 게시판 연주영상")) {
      newPost = {
        title,
        link: youtubeLink,
        user_id: nickname,
      };
    } else {
      newPost = {
        title,
        content,
        file_url: imagePreview,
        nickname: nickname,
      };
    }

    try {
      if (isEditing) {
        await axios.put(`/dailband/boards/${board_id}/${editingPostId}`, newPost);
      } else {
        const endpoint =
          boardType === "베이스 게시판 연주영상" ? `/dailband/boards/${board_id}` : `/dailband/boards/${board_id}`;
        await axios.post(endpoint, newPost);
        
      }
      await fetchPosts();
      
    } catch (error) {
      console.error("Error submitting post:", error);
    }

    setIsWriting(false);
    setIsEditing(false);
  };
  // 검색어 입력 시 검색어 받아오기
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 돋보기 버튼 클릭 시 검색어에 따른 필터링
  const handleSearchClick = () => {
    if (searchTerm.trim() === "") {
      setCurrentPosts(posts.slice(IndexFirstPost, IndexLastPost));
    } else {
      const filteredPosts = posts.filter(
        (post) =>
          post.title.includes(searchTerm) || post.content.includes(searchTerm)
      ); // 해당 검색어를 title 또는 content에 포함한 게시물 출력
      setCurrentPosts(filteredPosts.slice(IndexFirstPost, IndexLastPost));
    }
  };

  // 돋보기 버튼 클릭이 아닌 엔터키를 쳐도 검색이 되도록 하는 함수
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Enter 키를 눌렀을 때 폼 제출을 방지
      handleSearchClick();
    }
  };
  //유튜브 영상 미리보기 띄우기
  const renderYoutubePreview = (link) => {
    const videoId = link.split("v=")[1];
    const embedLink = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    return (
      <img
        width="300"
        src={embedLink}
        frameBorder="0"
        allowFullScreen
        title="YouTube Preview"
        alt="thumbnail"
        className="YoutubeThumbnail"
      ></img>
    );
  };
  return (
    <div>
      <div className="BoardPage">
        <Header />
        <SessionBtns initialSelectedIndex={3} />
        <div
          className="SessionBoards"
          style={{ height: isWriting ? "550px" : "850px" }}
        >
          {!isWriting ? (
            <>
              <div className="TopBoard">
                <div className="Sessionpost">
                  <h1>밴드 음악의 근본 베이스 페이지!</h1>
                  {currentPosts.slice(0, 2).map((post) => (
                    <Link
                    to={`/boards/8/${post.post_id}`}
                    style={{ textDecoration: "none" }}
                    key={post.post_id}
                  >
                    <div key={post.id} className="SessionPostbox">
                      <div className="SessionUserbox">
                        <img
                          className="SessionProfile"
                          src="/img/basicprofile.png"
                          alt="profile"
                        ></img>
                        <p style={{ marginTop: "10px" }}>{post.nickname}</p>
                      </div>
                      <div className="SessionContent">
                        <div className="Boardname">
                          <h3 style={{ color: "rgb(51, 0, 119)" }}>
                            세션 게시판
                          </h3>
                        </div>
                        <h3 style={{ marginTop: "5px" }}>{post.title}</h3>
                        <p>{post.content}</p>
                        <p className="Posttime">작성날짜 {post.created_at}</p>
                      </div>
                    </div>
                  </Link>
                  ))}
                </div>
                <Pagenumber
                  totalCount={posts.length}
                  page={page}
                  postPerPage={postPerPage}
                  pageRangeDisplayed={10}
                  handlePageChange={handlePageChange}
                />
              </div>
              <div className="BottomBoard">
                <h2>연주 영상</h2>
                <div className="Videobox">
                  {videoPosts&&videoPosts.slice(0,4).map((videoPost) => {
                    const videoId = videoPost.link?.split("v=")[1];
                    const embedLink = videoId? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`:"/img/videoimg.png";

                    return (
                      <figure className="Videopost" key={videoPost.post_id}>
                        <img
                          width="250px"
                          src={embedLink}
                          frameBorder="0"
                          allowFullScreen
                          title="YouTube Preview"
                          alt="thumbnail"
                          className="Thumbnail"
                        ></img>
                        <figcaption>
                          
                          <a href={videoPost.link} target="_blank" rel="noopener noreferrer">
                            <h3>클릭해서 이동하기!</h3>
                          </a>
                          <p>유튜브 링크로 이동합니다.</p>
                          <i>
                            <img src="/img/rightarrow.png" alt="rightarrow"></img>
                          </i>
                        </figcaption>
                        <div className="VideoTitle">{videoPost.title}</div>
                      </figure>
                    );
                  })}
                </div>
              </div>
              <button
                className="WriteBtn"
                onClick={handleWriteClick}
                style={{ cursor: "pointer" }}
              >
                글쓰기
              </button>
              <div
                className="Searchbox"
                style={{ marginTop: "0px", marginLeft: "110px" }}
              >
                <input
                  placeholder=" 검색어를 입력해주세요!"
                  value={searchTerm} // 검색어 상태 바인딩
                  onChange={handleSearchChange} // 입력 변경 핸들러 추가
                  onKeyDown={handleKeyPress} //Enter키 핸들러
                ></input>
                <span>
                  <img
                    src="/img/searchicon.png"
                    alt="searchicon"
                    onClick={handleSearchClick} // 검색 버튼 클릭 핸들러 추가
                    style={{ cursor: "pointer" }}
                  ></img>
                </span>
              </div>
            </>
          ) : (
            <div className="SessionWriteBoard">
              <button
                type="button"
                onClick={handleBackClick}
                className="Backbutton"
              >
                <img
                  className="Backbutton"
                  alt="Backbutton"
                  src="/img/arrow.png"
                />
              </button>
              <form onSubmit={handleSubmit}>
                <div className="ImgUpload">
                  {boardType === "베이스 게시판 게시글" && imagePreview && (
                    <img src={imagePreview} alt="ImagePreview" width="300px" />
                  )}
                  {boardType === "베이스 게시판 게시글" && (
                    <label>
                      이미지 업로드:
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>

                <div className="TextUpload">
                  <div>
                    <label style={{ color: "grey" }}>게시판 종류 :</label>
                    <select value={boardType} onChange={handleBoardTypeChange}>
                      <option>베이스 게시판 게시글</option>
                      <option>베이스 게시판 연주영상</option>
                    </select>
                  </div>

                  {boardType === "베이스 게시판 게시글" ? (
                    <>
                      <input
                        type="text"
                        className="SessionInputTitle"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="제목을 입력해주세요"
                        required
                      />

                      <textarea
                        className="SessionInputContent"
                        value={content}
                        onChange={handleContentChange}
                        placeholder="내용을 입력해주세요"
                        required
                      ></textarea>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        className="SessionInputTitle"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="영상 제목을 입력해주세요"
                        required
                      />
                      <input
                        type="text"
                        className="SessionInputContent"
                        value={youtubeLink}
                        onChange={handleYoutubeLinkChange}
                        placeholder="유튜브 링크를 입력해주세요"
                        required
                        style={{ height: "50px" }}
                      />
                      {youtubeLink && renderYoutubePreview(youtubeLink)}
                    </>
                  )}

                  <div className="EditBtns">
                    <button type="button" onClick={handleBackClick}>
                      취소
                    </button>
                    <button type="submit" className="SubmitBtn">
                      {isEditing ? "수정하기" : "작성하기"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Bass;
