import React, { useState } from "react";
import "./styles/Toggle.css";

function Toggle({ onFilterChange  }) {
  const [isOpen, setisOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);


  const handleToggle = () => {
    setisOpen(!isOpen);
  };
  const handleCheckboxChange = (value) => {
    const updatedCheckedItems = checkedItems.includes(value)
      ? checkedItems.filter((item) => item !== value)
      : [...checkedItems, value];

    setCheckedItems(updatedCheckedItems);
    onFilterChange(updatedCheckedItems);
  };

  return (
    <div className="Sessiontoggle">
      <div className="ToggleBtn">
        <div className="Togglename">세션 조건</div>
        <button
          className="OpenBtn"
          onClick={handleToggle}
        >
          {isOpen ? (
            <img src="/img/leftarrow.png"></img>
          ) : (
            <img src="/img/rightarrow.png"></img>
          )}
        </button>
      </div>
      {isOpen && (
        <div className="Sessionbox">
          <div className="SessionBtn">
            <input
              type="checkbox"
              value={"드럼"}
              onChange={() => handleCheckboxChange("드럼")}
              checked={checkedItems.includes("드럼")}
            ></input>
            <p>드럼</p>
          </div>
          <div className="SessionBtn">
            <input type="checkbox" value="기타"
              onChange={() => handleCheckboxChange("기타")}
              checked={checkedItems.includes("기타")}></input>
            <p>기타</p>
          </div>
          <div className="SessionBtn">
            <input type="checkbox"  value="보컬"
              onChange={() => handleCheckboxChange("보컬")}
              checked={checkedItems.includes("보컬")}></input>
            <p>보컬</p>
          </div>
          <div className="SessionBtn">
            <input type="checkbox"  value="베이스"
              onChange={() => handleCheckboxChange("베이스")}
              checked={checkedItems.includes("베이스")}></input>
            <p>베이스</p>
          </div>
          <div className="SessionBtn">
            <input type="checkbox" value="키보드"
              onChange={() => handleCheckboxChange("키보드")}
              checked={checkedItems.includes("키보드")}></input>
            <p>키보드</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Toggle;
