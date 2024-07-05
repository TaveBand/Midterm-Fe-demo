import { useEffect, useState } from "react";
import Header from "../components/Header";
import BoardBtns from "../components/BoardBtns";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Pagenumber from "../components/Pagenumber";
import "./Performances.css";
import instance from "./axios";

function Performances() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isWriting, setIsWriting] = useState(false); //글쓰기 버튼에 따른 상태 업데이트
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // 사진 미리보기
  const handlePageChange = (page) => {
    setPage(page);
  };
  const [postPerPage] = useState(3);

  const IndexLastPost = page * postPerPage;
  const IndexFirstPost = IndexLastPost - postPerPage;
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await instance.get("/posts2");
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
  }, [IndexFirstPost, IndexLastPost, page]);

  const [selectedPost, setSelectedPost] = useState(null);
  const handlePostClick = (postId) => {
    setSelectedPost(postId);
    window.location.href = `/union-performances/${postId}`;
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

    try {
      if (isEditing) {
        await instance.put(`/posts2/${editingPostId}`, updatedPost);
      } else {
        await instance.post("/posts2", updatedPost);
      }
      await fetchPosts();
    } catch (error) {
      console.error("Error submitting post:", error);
    }

    setIsWriting(false);
    setIsEditing(false);
  };

  const handleEditClick = (post) => {
    setIsEditing(true);
    setIsWriting(true);
    setEditingPostId(post.post_id);
    setTitle(post.title);
    setContent(post.content);
    setImage(null);
    setImagePreview(post.image_url);
  };
  //공연 예정 일자나 장소, 모집하는 팀 수, 한 팀당 곡 수등을 적어주시면 좋아요!
  
  const handleDeleteClick = async (post) => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      try {
        await instance.delete(`/posts2/${post.post_id}`);
        await fetchPosts();
  
        window.confirm("게시글이 삭제되었습니다!")
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };
  return (
    <div>
      <div className="BoardPage">
        <Header />
        <BoardBtns initialSelectedIndex={"2"} />
        <div className="Boards">
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
                    className="InputTitle"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="밴드 이름 : 제목"
                    required
                  />

                  <textarea
                    className="InputContent"
                    value={content}
                    onChange={handleContentChange}
                    placeholder="학교명, 인원수, 좋아하는 밴드 스타일 등을 적어주시면 좋아요!"
                    required
                    style={{ height: "280px" }}
                  ></textarea>

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
          ) : (
            <div>
              <button
                className="WriteBtn"
                onClick={handleWriteClick}
                style={{ marginLeft: "1270px", marginTop: "400px", cursor:"pointer"}}
              >
                글쓰기
              </button>
              <div className="Clubpost">
                {currentPosts.slice(0, 3).map((post) => (
                  <Link
                    to={`/boards/union-performances/${post.post_id}`}
                    style={{ textDecoration: "none" }}
                    key={post.post_id}
                  >
                    <div className="Postbox">
                      <div className="clubimg"></div>
                      <div className="contentbox">
                        <div className="Boardname">
                          <h3 style={{ color: "rgb(51,0,119)" }}>
                            연합 공연 팀 모집 게시판
                          </h3>
                          <div className="ModifyBtns">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                handleEditClick(post);
                              }}
                            >
                              <img src="/img/edit.png" alt="edit" />
                            </button>
                            <button onClick={(e) => {
                                e.preventDefault();
                                handleDeleteClick(post);
                              }}>
                              <img src="/img/trash.png" alt="trash" />
                            </button>
                          </div>
                        </div>

                        <h3>{post.title}</h3>
                        <p>
                          {post.content.length > 80
                            ? `${post.content.slice(0, 80)}...`
                            : post.content}
                        </p>

                        <div></div>
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Performances;
