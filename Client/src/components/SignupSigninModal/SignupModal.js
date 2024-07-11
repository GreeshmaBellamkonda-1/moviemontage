import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signup } from '../../features/userSlice';

function SignupModal({ setOpenModal }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();

  function generateId(N) {
    // Generate a random number with N digits
    const randomComponent = Math.floor(Math.random() * (Math.pow(10, N) - Math.pow(10, N - 1))) + Math.pow(10, N - 1);

    return randomComponent;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(confirmPassword==password){
      const uid = generateId(7);

    dispatch(signup({
      uid: uid,
    }));

    try {
      const response = await axios.post('http://localhost:3001/authenticate/signup', {
        username: name,
        password: password,
        uid: uid,
      });
      if (response.data.success) {
        console.log('Sign up submitted:', name, email, password, confirmPassword);
        setOpenModal(null);
        navigate('/home');
      } else {
        console.log("none"); // Login failed
      }
    } catch (err) {
      console.log(err);
    }
    }else{
      alert("Confirm password and password dont match! please check");
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="titleCloseBtn">
          <button onClick={() => setOpenModal(null)}>X</button>
        </div>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
        </form>
        <div className="text-center mt-3">
          <p>Already have an account? <button className="link-button" onClick={() => setOpenModal('signin')}>Sign In</button></p>
        </div>
      </div>
    </div>
  );
}

export default SignupModal;
