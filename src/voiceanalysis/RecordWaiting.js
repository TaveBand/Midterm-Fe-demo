import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from "../shared/Header";
import axios from 'axios';
import './styles/RecordWaiting.css';

const RecordWaiting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { file } = location.state;

  useEffect(() => {
    const uploadFileToServer = (file) => {
      const formData = new FormData();
      formData.append('audioFile', file, 'recording.wav');

      axios.post('/dailband/song', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        navigate('/record_result', { state: { data: response.data } });
      })
      .catch(error => {
        console.error('파일 전송 중 오류 발생:', error);
        navigate('/record_result', { state: { data: null } });
      });
    };

    if (file) {
      uploadFileToServer(file);
    } else {
      console.error('분석할 파일이 없습니다.');
      navigate('/record_result', { state: { data: null } });
    }
  }, [file, navigate]);

  return (
    <>
      <Header />
      <div className="record-waiting-page">
        <h2 className="record-waiting-text">...분석 중...</h2>
        <div className="record-waiting-icon">
          <img src="/img/recording.png" alt="Recording" />
        </div>
      </div>
    </>
  );
};

export default RecordWaiting;
