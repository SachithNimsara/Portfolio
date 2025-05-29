import React, { useState } from "react";
import "./NavBar.css"; // Import the shared CSS file
import { FaWhatsapp, FaLinkedin, FaFacebook } from "react-icons/fa"; // Import icons
import { MdEmail } from "react-icons/md"; // Import email icon

const Navbar = () => {
  const [showContact, setShowContact] = useState(false);

  const toggleContact = () => {
    setShowContact(!showContact);
  };

  return (
    <nav className="navbar">
      <div className="logo">W.</div>
      
      <ul className="nav-links">
        <li><a href="#home" className="active">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#clients">Clients</a></li>
      </ul>
      
      <button className="contact-button" onClick={toggleContact}>
        💬 Contact Me
      </button>

      {showContact && (
        <div className="contact-info">
          <h4>Contact Me</h4>
          <p>
            <MdEmail /> Email:{" "}
            <a href="mailto:sachithnimsara0501@gmail.com">sachithnimsara0501@gmail.com</a>
          </p>
          <p>
            <FaWhatsapp /> WhatsApp:{" "}
            <a href="https://wa.me/94753716956" target="_blank" rel="noopener noreferrer">
              0753716956
            </a>
          </p>
          <p>
            <FaLinkedin /> LinkedIn:{" "}
            <a href="https://www.linkedin.com/in/sachith-nimsara" target="_blank" rel="noopener noreferrer">
              Sachith Nimsara
            </a>
          </p>
          <p>
            <FaFacebook /> Facebook:{" "}
            <a href="https://www.facebook.com/sachith.nimsara" target="_blank" rel="noopener noreferrer">
              Sachith Nimsara
            </a>
          </p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
