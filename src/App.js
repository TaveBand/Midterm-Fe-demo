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

import VoiceAnalysis from "./voiceanalysis/VoiceAnalysis";
import Record from "./voiceanalysis/Record";
import RecordWaiting from "./voiceanalysis/RecordWaiting";
import RecordResult from "./voiceanalysis/RecordResult";
import Recommendation from "./voiceanalysis/Recommendation";
import Reservation from "./performance/Reservation";
import ReservationCompleted from "./performance/ReservationCompleted";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/verify" element={<Verify />} />
          <Route path="/register/complete" element={<Complete />} />
          <Route path="/profile/edit/:user_id" element={<Profile />} />
          <Route path="/scrap/:user_id" element={<Scrap />} />
          <Route path="/myposts/:user_id" element={<MyPosts />} />
          <Route path="/myperformances/:user_id" element={<MyPerformances />} />
          <Route path="/myreservations/:user_id" element={<MyReservations />} />
          <Route path="/boards/clubs" element={<Clubs />} />
          <Route path="/boards/clubs/:post_id" element={<ClubsDetail />} />
          <Route path="/boards/pr" element={<PR />} />
          <Route path="/boards/pr/:post_id" element={<PRDetail />} />
          <Route path="/boards/matching" element={<Matching />} />
          <Route path="/boards/matching/:post_id" element={<MatchingDetail />} />
          <Route path="/boards/5" element={<Drum />} />
          <Route path="/boards/5/:post_id" element={<DrumDetail />} />
          <Route path="/boards/6" element={<Guitar />} />
          <Route path="/boards/6/:post_id" element={<GuitarDetail />} />
          <Route path="/boards/7" element={<Vocal />} />
          <Route path="/boards/7/:post_id" element={<VocalDetail />} />
          <Route path="/boards/8" element={<Bass />} />
          <Route path="/boards/8/:post_id" element={<BassDetail />} />
          <Route path="/boards/9" element={<Keyboard />} />
          <Route path="/boards/9/:post_id" element={<KeyboardDetail />} />
          <Route path="/boards/performances" element={<UnionPerformances />} />
          <Route path="/boards/performances/:performance_id" element={<UnionPerformanceDetail />} />
          <Route path="/voice_analysis" element={<VoiceAnalysis />} />
          <Route path="/record" element={<Record />} />
          <Route path="/record_waiting" element={<RecordWaiting />} />
          <Route path="record_result" element={<RecordResult />} />
          <Route path="recommendations" element={<Recommendation />} />
          <Route path="/reservations/:performance_id" element={<Reservation />} />
          <Route path="/reservation_completed" element={<ReservationCompleted />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;