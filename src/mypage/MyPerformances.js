import React, { useState, useEffect } from "react";
import instance from "axios";
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import "./styles/MyPerformances.css";
import { useAuth } from '../authentication/AuthContext';


function MyPerformances() {
  const { currentUser } = useAuth();
  const [performances, setPerformances] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const token = localStorage.getItem("token");
      const userId = currentUser.user_id; // currentUser에서 user_id 가져오기

      if (!token) {
        console.error("Invalid or missing token");
        return;
      }

      const fetchPerformances = async () => {
        try {
          const response = await instance.get(`/dailband/user/${userId}/myperformances`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          setPerformances(response.data.performances);
        } catch (error) {
          console.error("Error fetching performances:", error);
        }
      };

      fetchPerformances();
    }
  }, [currentUser]);

  const handleDelete = async (performance_id) => {
    if (currentUser) {
      const token = localStorage.getItem("token");
      const userId = currentUser.user_id; // currentUser에서 user_id 가져오기

      if (!token) {
        console.error("Invalid or missing token");
        return;
      }

      try {
        await instance.delete(`/dailband/user/${userId}/myperformances/${performance_id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setPerformances(prevPerformances => prevPerformances.filter(p => p.performance_id !== performance_id));
      } catch (error) {
        console.error("Error deleting performance:", error);
      }
    }
  };

  return (
    <div className="MyPerformances">
      <Header />
      <div className="MyPerformances-container">
        <Sidebar nickname={currentUser?.username} /> {/* currentUser에서 username 가져오기 */}
        <div className="MyPerformances-content">
          <h2 className="MyPerformances-title">내가 작성한 공연 조회</h2>
          <div className="MyPerformances-list">
            {performances.length > 0 ? (
              performances.map(performance => (
                <div key={performance.performance_id} className="MyPerformances-item">
                  <img src={performance.image_path} alt={performance.title} />
                  <h3>{performance.title}</h3>
                  <p>{performance.date} {performance.time}</p>
                  <p>장소: {performance.venue}</p>
                  <button onClick={() => handleDelete(performance.performance_id)} className="DeleteButton">삭제</button>
                </div>
              ))
            ) : (
              <p>작성한 공연이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPerformances;
