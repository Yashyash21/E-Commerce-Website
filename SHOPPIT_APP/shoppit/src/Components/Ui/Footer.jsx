import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      className="py-3"
      style={{ backgroundColor: '#6050DC', color: 'white' }}
    >
      <div className="container text-center">
        {/* Quick Links Section */}
        <div className="mb-2">
          <a href="#home" className="text-white text-decoration-none mx-2">Home</a>
          <a href="#about" className="text-white text-decoration-none mx-2">About</a>
          <a href="#shop" className="text-white text-decoration-none mx-2">Shop</a>
          <a href="#contact" className="text-white text-decoration-none mx-2">Contact</a>
        </div>

        {/* Social Media Icons Section */}
        <div className="mb-2">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
