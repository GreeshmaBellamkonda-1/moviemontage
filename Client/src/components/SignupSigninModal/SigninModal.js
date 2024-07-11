import React, { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';

function SigninModal({ setOpenModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("Trying to login");
      const response = await axios.post('http://localhost:3001/authenticate/signin', {
        username: email,
        password: password,
      });
      if (response.data.success) {
        // console.log(response.data);
        console.log('Sign in submitted:', email, password);
        setOpenModal(null);

        const uid=response.data.uid;

        dispatch(login({
          uid: uid,
        }));
           navigate('/home');
      } else {
        alert("Invalid Credentials")
      }
    } catch (err) {
      console.log(err);
    }


  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="titleCloseBtn">
          <button onClick={() => setOpenModal(null)}>X</button>
        </div>
        <h2 className="text-center mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
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
          <button type="submit" className="btn btn-primary btn-block">Sign In</button>
        </form>
        <div className="text-center mt-3">
          <p>Don't have an account? <button className="link-button" onClick={() => setOpenModal('signup')}>Sign Up</button></p>
        </div>
      </div>
    </div>
  );
}

export default SigninModal;
