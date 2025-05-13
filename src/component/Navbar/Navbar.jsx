// NavbarSection.jsx with faster navigation
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-scroll"; // Import Link from react-scroll
import Portfoliologo from '../../assets/portfolio-logo.png';

import "./Navbar.css";

const NavbarSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Define faster scroll settings with proper offset
  const scrollSettings = {
    smooth: true,
    duration: 150,  // Reduced from 500ms to 200ms - MUCH faster scrolling
    offset: -80,    // Adjust based on your navbar height
    spy: true
  };

  return (  
    <div className="Nav-Parent">
      <nav className="navbar">
        <div className="logo">
          {/* <img src={Portfoliologo} alt="" /> */}
          <h1>myportfolio</h1>
        </div>
        <div className="nav-links">
          <Link to="hero" {...scrollSettings}>Home</Link>
          <Link to="about" {...scrollSettings}>About</Link>
          <Link to="experience" {...scrollSettings}>Experience</Link>
          <Link to="projects" {...scrollSettings}>Projects</Link>
          
          <Link to="contact" {...scrollSettings}>Contact</Link>
        </div>
        <div className="download-cv">
          <a href="/CVZohaibZulifqar.pdf" download className="cv-button">
            Download CV
          </a>
        </div>
        <div className='hamburger-icon' onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className='mobile-menu-header'>
          <div className='close-icon' onClick={toggleMenu}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className='mobile-navigation'>
          <Link to="hero" {...scrollSettings} onClick={toggleMenu}>Home</Link>
          <Link to="experience" {...scrollSettings} onClick={toggleMenu}>Experience</Link>
          <Link to="projects" {...scrollSettings} onClick={toggleMenu}>Projects</Link>
          <Link to="about" {...scrollSettings} onClick={toggleMenu}>About</Link>
          <Link to="contact" {...scrollSettings} onClick={toggleMenu}>Contact</Link>
          <div className="mobile-cv-button-parent">
  <a href="/CVZohaibZulifqar.pdf" download onClick={toggleMenu} className="mobile-cv-button">
            Download CV
          </a>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default NavbarSection;