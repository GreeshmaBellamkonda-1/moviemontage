import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './Views/LandingPage/landingPage';
import SigninModal from "./components/SignupSigninModal/SigninModal";
import SignupModal from "./components/SignupSigninModal/SignupModal";
import HomePage from './Views/HomePage/HomePage';
import MoviePage from './Views/MoviePage/MoviePage';
import UserProfile from './Views/UserProfile/UserProfile';

import './App.css';
// import './Views/LandingPage/LandingPage.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SigninModal />} />
          <Route path="/signup" element={<SignupModal />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/moviepage" element={<MoviePage />} />
          <Route path="/userprofile" element={<UserProfile />} />
          {/* <Route path="/moviepage/:id" element={<MoviePage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
