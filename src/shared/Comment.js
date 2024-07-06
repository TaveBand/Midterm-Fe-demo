import { useState } from "react";
import instance from "axios";
import './styles/Comment.css'

function Comment(props) {
  const { post_id, refreshComments, endpoint } = props;
  const [input, setInput] = useState("");

  const addComment = async () => {
    console.log("input:", input);
    let writetime = new Date();
    let time = {
      year: writetime.getFullYear(),
      month: writetime.getMonth() + 1,
      date: writetime.getDate(),
      hours: writetime.getHours(),
      minutes: writetime.getMinutes(),
    };
    let timestamp = `${time.year}.${("0"+time.month).slice(-2)}.${("0"+time.date).slice(-2)}`;
    console.log("timestamp:", timestamp);

    if (input !== "") {
      const newComment = {
        comment_id: "",
        content: input,
        nickname: "string",
        created_at: timestamp,
      };

      try {
        const res = await instance.post(`${endpoint}/${post_id}/comments`, newComment);
        if (res.data.success) {
          console.log("Response data:", res.data.result);
          refreshComments();
        } else {
          console.log("Failed to add comment:", res.data.message);
        }
      } catch (error) {
        if (error.response) {
          // 서버에서 응답을 받았으나 2xx 상태 코드를 받지 못한 경우
          console.error('Response error:', error.response.data);
        } else if (error.request) {
          // 요청이 이루어졌으나 응답을 받지 못한 경우
          console.error('Request error:', error.request);
        } else {
          // 요청을 설정하는 중에 문제가 발생한 경우
          console.error('Error:', error.message);
        }
      }
      setInput('');
    }
  };

  return (
    <div className="CommentInput">
      <input className="Inputtext"
        type="text"
        placeholder="댓글 작성하기"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? addComment() : null)}
      />
      <button onClick={addComment}>작성하기</button>
    </div>
  );
}

export default Comment;