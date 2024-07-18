import { useEffect, useState } from "react";
import instance from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../shared/Header";
import Pagenumber from "../shared/Pagenumber";
import "./styles/UnionPerformances.css";

function UnionPerformances() {
  const navigate = useNavigate();
  const [performances, setPerformances] = useState([]);
  const [currentPerformances, setCurrentPerformances] = useState([]);
  const [page, setPage] = useState(1);
  const [isWriting, setIsWriting] = useState(false);
  const [editingPerformanceId, setEditingPerformanceId] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [postPerPage] = useState(3);

  const IndexLastPost = page * postPerPage;
  const IndexFirstPost = IndexLastPost - postPerPage;

  const fetchPerformances = async () => {
    setLoading(true);
    try {
      const res = await instance.get("/dailband/boards/performances");
      setPerformances(res.data);
      setCurrentPerformances(res.data.slice(IndexFirstPost, IndexLastPost));
    } catch (error) {
      console.error("Error fetching performances:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformances();
  }, [IndexFirstPost, IndexLastPost, page]);

  const handleWriteClick = () => {
    setIsWriting(true);
    setEditingPerformanceId(null);
    setTitle("");
    setDate("");
    setTime("");
    setVenue("");
    setTotalSeats("");
    setImagePreview("");
    setContent("");
  };

  const handleBackClick = () => {
    setIsWriting(false);
    setEditingPerformanceId(null);
    setTitle("");
    setDate("");
    setTime("");
    setVenue("");
    setTotalSeats("");
    setImagePreview("");
    setContent("");
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleTimeChange = (e) => setTime(e.target.value);
  const handleVenueChange = (e) => setVenue(e.target.value);
  const handleTotalSeatsChange = (e) => setTotalSeats(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPerformance = {
      title,
      date,
      time,
      venue,
      totalSeats,
      currentSeats: totalSeats,
      file_url: imagePreview,
      content,
    };

    try {
      if (editingPerformanceId) {
        await instance.put(`/dailband/boards/performances/${editingPerformanceId}`, updatedPerformance);
      } else {
        await instance.post("/dailband/boards/performances", updatedPerformance);
      }
      await fetchPerformances();
    } catch (error) {
      console.error("Error submitting performance:", error);
    }

    setIsWriting(false);
  };

  const handleEditClick = (performance) => {
    setIsWriting(true);
    setEditingPerformanceId(performance.performanceId);
    setTitle(performance.title);
    setDate(performance.date);
    setTime(performance.time);
    setVenue(performance.venue);
    setTotalSeats(performance.totalSeats);
    setImagePreview(performance.file_url);
    setContent(performance.content);
  };

  const handleDeleteClick = async (performance) => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      try {
        await instance.delete(`/dailband/boards/performances/${performance.performanceId}`);
        await fetchPerformances();
        window.alert("게시글이 삭제되었습니다!");
      } catch (error) {
        console.error("Error deleting performance:", error);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="UnionPerformances">
      <Header />
      <div className="Boards">
        {isWriting ? (
          <div className="WritingForm">
            <button type="button" onClick={handleBackClick} className="BackButton">
              <img className="BackIcon" alt="Backbutton" src="/img/arrow.png" />
            </button>
            <form onSubmit={handleSubmit}>
              <div className="TextUpload">
                <input
                  type="text"
                  className="InputTitle"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="공연 제목"
                  required
                />
                <input
                  type="date"
                  className="InputDate"
                  value={date}
                  onChange={handleDateChange}
                  required
                />
                <input
                  type="time"
                  className="InputTime"
                  value={time}
                  onChange={handleTimeChange}
                  required
                />
                <input
                  type="text"
                  className="InputVenue"
                  value={venue}
                  onChange={handleVenueChange}
                  placeholder="공연 장소"
                  required
                />
                <input
                  type="number"
                  className="InputSeats"
                  value={totalSeats}
                  onChange={handleTotalSeatsChange}
                  placeholder="총 좌석 수"
                  required
                />
                <textarea
                  className="InputContent"
                  value={content}
                  onChange={handleContentChange}
                  placeholder="공연 내용을 입력하세요"
                  required
                ></textarea>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="ImagePreview" />
                )}
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
          <div className="PerformanceList">
            <h2 className="BoardTitle">공연 홍보 게시판</h2>
            <input
              type="text"
              placeholder="공연 제목을 검색하세요"
              className="SearchBox"
            />
            <button className="WriteBtn" onClick={handleWriteClick}>
              글쓰기
            </button>
            <div className="PerformanceItems">
              {currentPerformances.map((performance) => (
                <div className="PerformanceBox" key={performance.performanceId}>
                  <img
                    src={performance.file_url}
                    alt={performance.title}
                    className="PerformanceImg"
                  />
                  <div className="PerformanceInfo">
                    <h3>{performance.title}</h3>
                    <p>{performance.date} {performance.time}</p>
                    <p>{performance.venue}</p>
                    <p>총 좌석 수: {performance.totalSeats}</p>
                    <p>공연 내용: {performance.content}</p>
                    <button
                      className="EditBtn"
                      onClick={() => handleEditClick(performance)}
                    >
                      수정
                    </button>
                    <button
                      className="DeleteBtn"
                      onClick={() => handleDeleteClick(performance)}
                    >
                      삭제
                    </button>
                    <button
                      className="ReserveBtn"
                      onClick={() => navigate(`/dailband/boards/performances/${performance.performanceId}`)}
                    >
                      예약하러가기
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Pagenumber
              totalCount={performances.length}
              page={page}
              postPerPage={postPerPage}
              pageRangeDisplayed={10}
              handlePageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default UnionPerformances;
