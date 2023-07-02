import React, { useState } from 'react';
import { auth, googleProvider } from "./firebase";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import '../styles/RegistrationForm.css';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

     createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Usuario registrado:', userCredential.user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="registration-form">
      <h2>Registrate</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="form-input"
          />
        </div>

       
        <div className='div-button'>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="form-button">Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;