import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { FaWhatsapp, FaLinkedin, FaFacebook, FaTimes } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";

const Navbar = () => {
  const [showContact, setShowContact] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleContact = () => {
    setShowContact(!showContact);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (showContact) setShowContact(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">S.Dev</div>
      
      {/* Desktop Navigation */}
      <ul className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <li><a href="#home" className="active">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#clients">Clients</a></li>
        <li className="mobile-contact">
          <button className="contact-button" onClick={toggleContact}>
            💬 Contact Me
          </button>
        </li>
      </ul>
      
      <div className="nav-right">
        <button className="contact-button desktop-only" onClick={toggleContact}>
          💬 Contact Me
        </button>
        
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <HiMenuAlt3 />}
        </button>
      </div>

      {showContact && (
        <div className="contact-info">
          <div className="contact-header">
            <h4>Get In Touch</h4>
            <button className="close-button" onClick={toggleContact}>
              <FaTimes />
            </button>
          </div>
          <div className="contact-items">
            <a href="mailto:sachithnimsara0501@gmail.com" className="contact-item">
              <MdEmail className="contact-icon" />
              <span>sachithnimsara0501@gmail.com</span>
            </a>
            <a href="https://wa.me/94753716956" target="_blank" rel="noopener noreferrer" className="contact-item">
              <FaWhatsapp className="contact-icon" />
              <span>0753716956</span>
            </a>
            <a href="https://www.linkedin.com/in/sachith-nimsara" target="_blank" rel="noopener noreferrer" className="contact-item">
              <FaLinkedin className="contact-icon" />
              <span>Sachith Nimsara</span>
            </a>
            <a href="https://www.facebook.com/sachith.nimsara" target="_blank" rel="noopener noreferrer" className="contact-item">
              <FaFacebook className="contact-icon" />
              <span>Sachith Nimsara</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;