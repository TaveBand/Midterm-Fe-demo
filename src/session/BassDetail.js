import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../shared/Header";
import SessionBtns from "../shared/SessionBtns";
import Comment from "../shared/Comment";

function BassDetail() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({ comments: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const { post_id } = useParams();
  const [nickname, setNickname] = useState("");
  const getDetail = async post_id => {
    setLoading(true);

    try {
      const res = await axios.get(`/dailband/boards/8`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDetail(res.data);
      setTitle(res.data.title);
      setContent(res.data.content);
      setImagePreview(res.data.file_url);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching post details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetail(post_id);
    console.log(detail);
  }, [post_id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBackClick = () => {
    setIsEditing(false);
    setTitle(detail.title);
    setContent(detail.content);
    setImagePreview(detail.file_url);
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleContentChange = e => {
    setContent(e.target.value);
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
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

  const handleSubmit = async e => {
    e.preventDefault();

    const updatedPost = {
      title,
      content,
      file_url: imagePreview,
      user_id: nickname,
    };

    try {
      await axios.put(`/dailband/boards/8/${post_id}`, updatedPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await getDetail(post_id);
      setIsEditing(false);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };
  const handleDeleteClick = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/dailband//boards/8/${post_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        window.confirm("게시글이 삭제되었습니다!");
        navigate("/boards/8");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };
  return (
    <div className="BoardPage">
      <Header />
      <SessionBtns initialSelectedIndex={3} />
      <div className="">
        <div className="Detailboard">
          <button
            type="button"
            onClick={() => navigate("/boards/8")}
            className="Backbutton">
            <img className="Backbutton" alt="Backbutton" src="/img/arrow.png" />
          </button>
          <div className="Detailbox">
            {imagePreview && !isEditing && (
              <img
                src={imagePreview}
                alt="SessionDetailimg"
                className="ClubsDetailimg"
              />
            )}
            <div className="Contentbox">
              {loading ? (
                <p>Loading...</p>
              ) : isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="Editbox">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <div className="EditContentbox">
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
                        style={{ height: "280px" }}></textarea>

                      <div className="EditBtns">
                        <button type="button" onClick={handleBackClick}>
                          취소
                        </button>
                        <button type="submit">수정하기</button>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <>
                  <h1>{detail.title}</h1>
                  <div className="Userbox">
                    <img
                      src="/img/basicprofile.png"
                      className="Profileimg"
                      alt="Profileimg"
                    />
                    <div>
                      <p style={{ fontWeight: "600" }}>{detail.nickname}</p>
                      <p style={{ color: "grey" }}>{detail.created_at}</p>
                    </div>
                    <div className="ModifyBtns">
                      <button>
                        <img
                          src="/img/edit.png"
                          alt="edit"
                          onClick={handleEditClick}
                        />
                      </button>
                      <button>
                        <img src="/img/trash.png" alt="trash" onClick={handleDeleteClick}/>
                      </button>
                    </div>
                  </div>
                  <div className="DetailText">{detail.content}</div>
                </>
              )}
              {!isEditing && (
                <button className="ScrBtn">
                  <img src="/img/bookmark.png" alt="bookmark" />
                  스크랩하기
                </button>
              )}
              {!isEditing && (
                <div className="SessionCommentbox">
                  <hr />
                  {detail.comments && detail.comments.length > 0 ? (
                    detail.comments.map((comment, index) => (
                      <div
                        key={comment.comment_id || index}
                        className="CommentContent">
                        <img
                          src="/img/basicprofile.png"
                          className="Profileimg"
                          alt="Profileimg"
                        />
                        <div className="comment1">
                          <div className="Comment2">
                            <p className="Commentnickname">
                              {comment.nickname}
                            </p>
                            <p style={{ color: "grey", fontSize: "15px" }}>
                              {comment.created_at}
                            </p>
                          </div>
                          <p style={{ fontSize: "17px" }}>{comment.content}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p
                      style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        color: "grey",
                      }}>
                      작성된 댓글이 없습니다
                    </p>
                  )}
                  <Comment
                    post_id={post_id}
                    endpoint="/dailband/boards/8"
                    refreshComments={() => getDetail(post_id)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BassDetail;
