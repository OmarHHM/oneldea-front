import React, { useState, useContext } from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/chatbot-banner.webp";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { auth, googleProvider } from "./firebase";
import {
  signInWithPopup,
} from "firebase/auth";
import { EmailContext } from './EmailContext';
import Bots from "./bots";
const Home = () => {
  const { email, setEmail } = useContext(EmailContext);
  const [loggedIn, setLoggedIn] = useState(false);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setEmail(result.user.email);
      setLoggedIn(true);
    } catch (err) {
      setEmail("");
      console.error(err);
    }
  };
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        {loggedIn ? (
          // Componente a cargar cuando el inicio de sesión sea exitoso
          <Bots />
        ) : (
        <div className="home-text-section">
          <h1 className="primary-heading">
          ¡Potencía la presencia de tus celebridades en las redes sociales!
          </h1>
          <ul className="primary-text">
            <li>Envía audios autogenerados para sorprender y cautivar a los fans</li>
            <li>Capta las intenciones de los seguidores y responde de manera adecuada</li>
            <li>Aprovecha la popularidad de Instagram, ya que nuestro bot captura y comparte automáticamente los últimos posts</li>
          </ul>
 
          <button className="secondary-button" onClick={signInWithGoogle}>
            Pruebalo ahora <FiArrowRight />{" "}
          </button>
        </div>
        )}
        {!loggedIn && (
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
        )}
      </div>
    </div>
  );
};

export default Home;
