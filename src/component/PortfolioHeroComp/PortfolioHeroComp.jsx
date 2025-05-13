// HeroSection.jsx with cosmic galaxy theme
import React from "react";
import { Link } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import "./PortfolioHeroComp.css";
import TestImage from '../../assets/testing-image.png';

const HeroSection = () => {
  return (
    <div className="Port-hero-container">
      {/* Cosmic background elements */}
      <div className="cosmic-bg">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
        <div className="galaxy-core"></div>
        <div className="galaxy-ring"></div>
        <div className="energy-particles"></div>
      </div>
      
      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-text">
          {/* <div className="section-subtitle">COSMIC DEVELOPER</div> */}
          <h3>Hello, I'm</h3>
          <h1>Zohaib Zulifqar</h1>
          <h2>
            A <span className="highlight-green">Full Stack Developer</span> 
          </h2>
          <ul className="hero-points">
            <li>Creative Full Stack Developer passionate about building responsive and intuitive web applications</li>
            <li>Expertise in both frontend and backend technologies</li>
            <li>Transform ideas into seamless digital experiences</li>
            <li>Commitment to clean code and continuous learning</li>
            <li>Deliver high-quality solutions that make an impact</li>
          </ul>

          <div className="cta-container">
            <Link
              to="about"
              className="about-btn"
            >
              About Me
            </Link>
            <div className="social-icons">
              <a 
                href="https://linkedin.com/in/zohaibzulifqar/"
                className="social-icon"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="profile-container">
            <div className="profile-wrapper">
              <div className="energy-orbit"></div>
              <img
                src={TestImage}
                alt="Zohaib Zulifqar"
                className="profile-image"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-icon"></div>
      </div>
    </div>
  );
};

export default HeroSection;