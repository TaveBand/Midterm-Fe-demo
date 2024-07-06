import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Home from "./mainpage/Home";

import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Verify from "./authentication/Verify";
import Complete from "./authentication/Complete";
import { AuthProvider } from "./authentication/AuthContext";

import Profile from "./mypage/Profile";
import Scrap from "./mypage/Scrap"
import MyPosts from "./mypage/MyPosts";
import MyPerformances from "./mypage/MyPerformances";
import MyReservations from "./mypage/MyReservations";

import Clubs from "./post/Clubs";
import ClubsDetail from "./post/ClubsDetail";
import PR from "./post/PR";
import PRDetail from "./post/PRDetail";
import Matching from "./post/Matching";
import MatchingDetail from "./post/MatchingDetail";

import Drum from "./session/Drum"
import DrumDetail from "./session/DrumDetail";
import Guitar from "./session/Guitar"
import GuitarDetail from "./session/GuitarDetail";
import Vocal from "./session/Vocal"
import VocalDetail from "./session/VocalDetail";
import Bass from "./session/Bass"
import BassDetail from "./session/BassDetail";
import Keyboard from "./session/Keyboard"
import KeyboardDetail from "./session/KeyboardDetail";

import UnionPerformances from "./performance/UnionPerformances";
import UnionPerformanceDetail from "./performance/UnionPerformanceDetail";

function App() {
  
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/register/verify" element={<Verify />}></Route>
          <Route path="/register/complete" element={<Complete />}></Route>
          <Route path="/profile/edit/:user_id" element={<Profile />}></Route>
          <Route path="/Scrap/:user_id" element={<Scrap />}></Route>
          <Route path="/MyPosts/:user_id" element={<MyPosts />}></Route>
          <Route path="/MyPerformances/:user_id" element={<MyPerformances />}></Route>
          <Route path="/MyReservations/:user_id" element={<MyReservations />}></Route>
          <Route path="/boards/clubs" element={<Clubs />}></Route>
          <Route path="/boards/clubs/:post_id" element={<ClubsDetail />}></Route>
          <Route path="/boards/pr" element={<PR />}></Route>
          <Route path="/boards/pr/:post_id" element={<PRDetail />}></Route>
          <Route path="/boards/matching" element={<Matching />}></Route>
          <Route path="/boards/matching/:post_id" element={<MatchingDetail />}></Route>
          <Route path="/boards/5" element={<Drum />}></Route>
          <Route path="/boards/5/:post_id" element={<DrumDetail />}></Route>
          <Route path="/boards/6" element={<Guitar />}></Route>
          <Route path="/boards/6/:post_id" element={<GuitarDetail />}></Route>
          <Route path="/boards/7" element={<Vocal />}></Route>
          <Route path="/boards/7/:post_id" element={<VocalDetail />}></Route>
          <Route path="/boards/8" element={<Bass />}></Route>
          <Route path="/boards/8/:post_id" element={<BassDetail />}></Route>
          <Route path="/boards/9" element={<Keyboard />}></Route>
          <Route path="/boards/9/:post_id" element={<KeyboardDetail />}></Route>
          <Route path="/boards/performances" element={<UnionPerformances />}></Route>
          <Route path="/boards/performances/:performance_id" element={<UnionPerformanceDetail />}></Route>

        </Routes>
      </AuthProvider>
    </Router>
    
  );
}

export default App;
