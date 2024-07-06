import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../shared/Header";
import BoardBtns from "../shared/BoardBtns";
import Pagenumber from "../shared/Pagenumber";
import Toggle from "../shared/Toggle";
import instance from "axios";
import "./styles/PR.css";

function PR() {
  const [posts, setPosts] = useState([]);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [page, setPage] = useState(1);
  const postPerPage = 8;
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState([]); // 세션 조건에 따른 필터링
  const [isWriting, setIsWriting] = useState(false); // 글쓰기 버튼에 따른 상태 업데이트
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // 사진 미리보기
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [session, setSession] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const IndexLastPost = page * postPerPage;
  const IndexFirstPost = IndexLastPost - postPerPage;
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await instance.get("/posts3");
      setPosts(res.data.posts);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  useEffect(() => {
    const filteredPosts =
      filters.length === 0
        ? posts
        : posts.filter(
            (post) =>
              post.sessions &&
              post.sessions.some((session) =>
                filters.includes(session.session_info)
              )
          );

    if (Array.isArray(filteredPosts)) {
      setCurrentPosts(filteredPosts.slice(IndexFirstPost, IndexLastPost));
    } else {
      console.error("Filtered posts is not an array:", filteredPosts);
      setCurrentPosts([]);
    }
  }, [posts, filters, page]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleFilterChange = (selectedFilters) => {
    setFilters(selectedFilters);
    setPage(1); // 필터가 바뀌면 첫번째 페이지로 리셋
  };

  const handleWriteClick = () => {
    setIsWriting(true); // 글 작성
  };

  const handleBackClick = () => {
    setIsWriting(false); // 다시 게시판으로
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ title, content, imagePreview });

    const updatedPost = {
      title,
      content,
      file_url: imagePreview,
    };

    await instance.post("/posts3", updatedPost);
    await fetchPosts();
    setIsWriting(false);
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
  return (
    <div>
      <div className="BoardPage">
        <Header />
        <BoardBtns initialSelectedIndex={1} />

        <div className="PRBoards">
          {isWriting ? (
            <div>
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
                  {imagePreview && (
                    <img src={imagePreview} alt="ImagePreview" width="300px" />
                  )}
                  <label>
                    이미지 업로드:
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                <div className="TextUpload">
                  <input
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="이메일 입력"
                    required
                  ></input>
                  <input
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="이름 입력"
                    required
                  ></input>
                  <input
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="세션 입력"
                    required
                  ></input>

                  <input
                    type="text"
                    className="InputTitle"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="제목을 입력해주세요!"
                    required
                  />

                  <textarea
                    className="InputContent"
                    value={content}
                    onChange={handleContentChange}
                    placeholder="학교명, 세션, 본인의 장점 등 자유롭게 작성해주세요!"
                    required
                  ></textarea>

                  <div className="EditBtns">
                    <button type="button" onClick={handleBackClick}>
                      취소
                    </button>
                    <button type="submit" className="SubmitBtn">
                      작성하기
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <div
                className="Searchbox"
                style={{ marginTop: "535px", marginLeft: "110px" }}
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
              <button className="WriteBtn" onClick={handleWriteClick}>
                글쓰기
              </button>
              <Toggle onFilterChange={handleFilterChange} />

              <div className="PRpost">
                {loading && <p>Loading...</p>}
                {!loading && currentPosts.length === 0 && (
                  <p>No posts found.</p>
                )}
                {!loading &&
                  currentPosts.map((post) => (
                    <div key={post.post_id} className="PRbox">
                      <Link
                        to={`/boards/pr/${+post.post_id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <img
                          src="../img/basicprofile.png"
                          className="PRphoto"
                          alt="PRphoto"
                        ></img>
                        <div className="PRcontentbox">
                          <h3>{post.nickname}</h3>
                          <p>{post.email}</p>
                          <div className="Sessioninfo">
                            {post.sessions &&
                              post.sessions
                                .map((session) => session.session_info)
                                .join(", ")}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
              <Pagenumber
                totalCount={
                  filters.length === 0
                    ? posts.length
                    : posts.filter(
                        (post) =>
                          post.sessions &&
                          post.sessions.some((session) =>
                            filters.includes(session.session_info)
                          )
                      ).length
                }
                page={page}
                postPerPage={postPerPage}
                pageRangeDisplayed={10}
                handlePageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PR;
