import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BoardBtns.css";


function BoardBtns({ initialSelectedIndex }) {
    const ButtonText = ["동아리 모집 게시판", "자기 PR 게시판", "연합 공연 팀 모집 게시판"]
    const ButtonLink = ["/clubs", "/pr", "/union/performances"]
    let [select, setSelect] = useState(initialSelectedIndex);
    // 페이지마다 초깃값을 설정해 페이지 이동 후에도
    // 선택한 버튼의 스타일이 변경될 수 있게함
    const navigate = useNavigate();

    const handleClick = (e) => {
        setSelect(e.target.value);
        navigate(`/boards${ButtonLink[e.target.value]}`);
    };

  return (
      <div className="PageBtns">
          {ButtonText.map((item, index) => {
              return (
                  <button key={index} value={index}
                      className={index == select ? "SelectedBtn" : "OtherBtn"}
                      onClick={handleClick}
                  >{item}</button>
              )
          })}

        </div>
  );
}

export default BoardBtns;
