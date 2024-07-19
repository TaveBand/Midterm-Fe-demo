import React, { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from "../shared/Header";
import { WaveFile } from 'wavefile';
import './styles/Record.css';

const Record = () => {
  const [blobURL, setBlobURL] = useState(null);
  const [wavBlob, setWavBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const navigate = useNavigate();
  const {
    startRecording,
    stopRecording,
    mediaBlobUrl
  } = useReactMediaRecorder({ audio: true });

  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  useEffect(() => {
    if (mediaBlobUrl) {
      console.log('mediaBlobUrl:', mediaBlobUrl);
      fetch(mediaBlobUrl)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
          const audioContext = new AudioContext();
          return audioContext.decodeAudioData(arrayBuffer);
        })
        .then(audioBuffer => {
          const wav = new WaveFile();
          const channelData = audioBuffer.getChannelData(0);
          wav.fromScratch(1, audioBuffer.sampleRate, '16', channelData);
          const wavBlob = new Blob([wav.toBuffer()], { type: 'audio/wav' });
          setBlobURL(URL.createObjectURL(wavBlob));
          setWavBlob(wavBlob); // WAV 파일 Blob 저장
        })
        .catch(error => console.error('오디오 변환 중 오류 발생:', error));
    }
  }, [mediaBlobUrl]);

  const handleAnalyze = () => {
    if (wavBlob) {
      navigate('/record_waiting', { state: { file: wavBlob } });
    } else {
      console.error('분석할 파일이 없습니다.');
    }
  };

  return (
    <>
      <Header />
      <div className="record-page">
        <h2>Voice recognition</h2>
        <div className="record-container">
          <div className="record-icon">
            <img src="/img/recording.png" alt="Recording" />
          </div>
          <div className="record-btn-container">
            <button className="record-btn" onClick={() => {
              setIsRecording(true);
              setRecordingTime(0);
              startRecording();
            }} type="button">녹음하기!</button>
            <button className="record-btn" onClick={() => {
              setIsRecording(false);
              stopRecording();
            }} type="button">녹음 중지</button>
            <button className="record-btn" onClick={handleAnalyze} type="button">분석하기</button>
          </div>
          {isRecording && <p>녹음 중... {recordingTime}초</p>}
          {blobURL && (
            <div>
              <p>녹음된 파일:</p>
              <audio src={blobURL} controls />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Record;
