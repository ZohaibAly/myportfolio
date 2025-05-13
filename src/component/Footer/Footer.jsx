// Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="copyright">
          Copyright © {currentYear} <span>Zohaib Zulifqar</span> | all rights and content Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;