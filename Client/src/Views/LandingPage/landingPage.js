import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import People from "../../assets/images/People.jpg";
import SigninModal from "../../components/SignupSigninModal/SigninModal";
import SignupModal from "../../components/SignupSigninModal/SignupModal";

const LandingPage = () => {
  const [openModal, setOpenModal] = useState(null);
  const navigate=useNavigate();

  const handleGuestClick=()=>{
     navigate('/home');
  }
  return (
    <div className="MasterContainer">
    
      <div className="HomeDiv">
        <div className="DarkOverlay">
          <div className="TopBar">
            <div className="LOGO">
              NAME
            </div>
            <div className="GuestButtonDiv">
              <button className="GuestButton" onClick={handleGuestClick}>Guest</button>
            </div>
          </div>
          <div className="TagLines">
          {/* <MovieCard /> */}
            <h3 style={{ margin: "0px" }}>Hello! Welcome to Movie Mania</h3>
            <h1 style={{ margin: "10px" }}>Your Personalized Movie Journey Begins Here!</h1>
          </div>
          <div className="ButtonDiv">
            <button className="SignUpButton" onClick={() => setOpenModal('signup')}>Sign up</button>
            <button className="SignInButton" onClick={() => setOpenModal('signin')}>Sign in</button>
          </div>
        </div>
      </div>
      <div className="ComponentContainer">
        <div className="ComponentTaglineContent">
          <h3 style={{ margin: "0px" }}>Discover Your Next Favorite: </h3>
          <p>Discover curated movie suggestions tailored uniquely to your taste with our Personalized Movie Recommendations service.</p>
        </div>
        <div className="ComponentImage">
          <div>
            <img src={People} className="imageCSS" alt="People" />
          </div>
        </div>
      </div>

      <div className="ComponentContainer2">

        <div className="ComponentImage">
          <div>
            <img src={People} className="imageCSS2" alt="People" />
          </div>
        </div>

        <div className="ComponentTaglineContent2">
          <h3 style={{ margin: "0px" }}>Discover Your Next Favorite: </h3>
          <p>Discover curated movie suggestions tailored uniquely to your taste with our Personalized Movie Recommendations service.</p>
        </div>

      </div>

      <div className="ComponentContainer2">
        <div className="ComponentTaglineContent">
          <h3 style={{ margin: "0px" }}>Discover Your Next Favorite: </h3>
          <p>Discover curated movie suggestions tailored uniquely to your taste with our Personalized Movie Recommendations service.</p>
        </div>
        <div className="ComponentImage">
          <div>
            <img src={People} className="imageCSS"  alt="People"/>
          </div>
        </div>
      </div>

      <div className="ComponentContainer2">

        <div className="ComponentImage">
          <div>
            <img src={People} className="imageCSS2" alt="People" />
          </div>
        </div>

        <div className="ComponentTaglineContent2">
          <h3 style={{ margin: "0px" }}>Discover Your Next Favorite: </h3>
          <p>Discover curated movie suggestions tailored uniquely to your taste with our Personalized Movie Recommendations service.</p>
        </div>

      </div>


      
      
      
      {openModal === 'signin' && <SigninModal setOpenModal={setOpenModal} />}
      {openModal === 'signup' && <SignupModal setOpenModal={setOpenModal} />}
    </div>
  );
};

export default LandingPage;