import axios from 'axios';

const instance = axios.create({
  baseURL: "http://localhost:5000",
  headers: { 'Content-Type': 'application/json' }
  });

 

// 요청 인터셉터 추가
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    console.log("Token :", token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 응답 인터셉터 추가
instance.interceptors.response.use(
  function (response) {
    console.log("Response:", response); // 응답 로그 추가
    return response;
  },
  function (error) {
    console.log("Response Error:", error.response); // 오류 로그 추가
    return Promise.reject(error);
  }
);

export default instance;