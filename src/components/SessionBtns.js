import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SessionBtns.css";


function SessionBtns({ initialSelectedIndex }) {
    const ButtonText = ["드럼", "기타", "보컬", "베이스", "키보드"]
    const ButtonLink = [5,6,7,8,9]
    let [select, setSelect] = useState(initialSelectedIndex);
    const navigate = useNavigate();

    useEffect(() => {
        setSelect(initialSelectedIndex);
    }, [initialSelectedIndex]);
    
    const handleClick = (e) => {
        const index = e.target.value;
        setSelect(index);
        navigate(`/boards/${ButtonLink[index]}`);
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

export default SessionBtns;
