import { useEffect, useState } from "react";
import instance from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../shared/Header";
import "./styles/UnionPerformanceDetail.css";

function UnionPerformanceDetail() {
  const { performance_id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [performance, setPerformance] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const fetchPerformance = async () => {
    setLoading(true);
    try {
      const res = await instance.get(`/dailband/boards/performances/${performance_id}`);
      setPerformance(res.data);
      setTitle(res.data.title);
      setDate(res.data.date);
      setTime(res.data.time);
      setVenue(res.data.venue);
      setTotalSeats(res.data.totalSeats);
      setContent(res.data.content);
      setImagePreview(res.data.file_url);
    } catch (error) {
      console.error("Error fetching performance details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformance();
  }, [performance_id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBackClick = () => {
    setIsEditing(false);
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
      await instance.put(`/dailband/boards/performances/${performance_id}`, updatedPerformance);
      await fetchPerformance();
      setIsEditing(false);
    } catch (error) {
      console.error("Error submitting performance:", error);
    }
  };

  return (
    <div className="UnionPerformanceDetail">
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="DetailContainer">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <button type="button" onClick={handleBackClick} className="BackButton">
                <img className="BackIcon" alt="Backbutton" src="/img/arrow.png" />
              </button>
              <div className="EditForm">
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
                    수정하기
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="PerformanceDetails">
              <button
                className="Backbutton"
                onClick={() => navigate("/dailband/boards/performances")}
              >
                <img className="Backbutton" alt="Backbutton" src="/img/arrow.png" />
              </button>
              <img src={performance.file_url} alt="PerformanceDetailImg" className="PerformanceDetailImg" />
              <div className="PerformanceInfo">
                <h1>{performance.title}</h1>
                <p>{performance.date} {performance.time}</p>
                <p>{performance.venue}</p>
                <p>총 좌석 수: {performance.totalSeats}</p>
                <p>공연 내용: {performance.content}</p>
                <button
                  className="EditBtn"
                  onClick={handleEditClick}
                >
                  수정
                </button>
                <button
                  className="ReserveBtn"
                  onClick={() => navigate(`/dailband/reserve/${performance.performanceId}`)}
                >
                  예약하기
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UnionPerformanceDetail;
