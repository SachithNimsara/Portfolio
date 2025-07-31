// Portfolio.js
import React, { useEffect, useRef, useState } from 'react';
import './Portfolio.css';
import myPhoto from './myPhoto.png';
import OBD2 from './OBD2.jpg';
import RMA from './RMA.jpg';
import portfolio from './portfolio.png';
import { 
  FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaReact, FaNodeJs, 
  FaJs, FaCss3Alt, FaFigma, FaDatabase, FaGg, FaLinkedin, FaGoogle, 
  FaJsSquare, FaCreativeCommons, FaHtml5, FaPython, FaAws, FaDocker, FaGithub 
} from 'react-icons/fa';
import { Card, CardContent, Button, Typography, Grid, CardMedia, Box } from '@mui/material';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import emailjs from '@emailjs/browser';

// TypingAnimation Component
const TypingAnimation = ({ text, speed = 50, cursor = true, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  useEffect(() => {
    if (cursor) {
      const blinkInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);

      return () => clearInterval(blinkInterval);
    }
  }, [cursor]);

  return (
    <span>
      {displayedText}
      {cursor && <span className={`cursor ${showCursor ? 'visible' : 'hidden'}`}>|</span>}
    </span>
  );
};

TypingAnimation.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number,
  cursor: PropTypes.bool,
  onComplete: PropTypes.func
};

// Portfolio Component (Home Page)
const Portfolio = () => {
  const imageRef = useRef(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const imageElement = imageRef.current;
      if (imageElement) {
        const rect = imageElement.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          imageElement.classList.add('show');
          setShowAnimation(true);
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };

  return (
    <div id="home" className="portfolio">
      <div className="hero-section">
        <div className="text-content">
          <h1>
            <TypingAnimation text="Hello," speed={100} cursor={false} />
          </h1>
          <h2>
            <TypingAnimation 
              text="I'm Sachith Nimsara" 
              speed={100} 
              cursor={false}
              onComplete={handleAnimationComplete}
            />
          </h2>
          <h3>
            {animationComplete && (
              <TypingAnimation text="Website Designer" speed={100} />
            )}
          </h3>
          <p>
            {animationComplete && (
              <TypingAnimation 
                text="I am a skilled and passionate web designer with experience in creating visually appealing and user-friendly websites."
                speed={30}
              />
            )}
          </p>
          {animationComplete && (
            <Button 
              variant="contained" 
              color="primary"
              className="hire-me-btn"
              onClick={() => window.location.href = '#contact'}
            >
              Hire me
            </Button>
          )}
        </div>
        <div className="image-content">
          <img ref={imageRef} src={myPhoto} alt="Sachith Nimsara" />
        </div>
      </div>
    </div>
  );
};

// WhatIDo Component (About Section)
const WhatIDo = () => {
  return (
    <section id="about" className="what-i-do">
      <Box textAlign="center" mb={4}>
        <h2>What I Do</h2>
        <Box maxWidth="800px" mx="auto" px={2}>
          <p>
            I am a skilled and passionate web designer with experience in creating visually appealing
            and user-friendly websites. I have a strong understanding of design and a keen eye for
            detail. I am proficient in HTML, CSS, ReactJs, SpringBoot, MySQL, PHP, Firebase, C ,python and JavaScript 
          </p>
        </Box>
      </Box>
      <div className="services">
        <ServiceCard
          emoji="🖌️🎨 🖼️"
          title="UI/UX Design"
          description="Creating intuitive and beautiful user interfaces with a focus on user experience and accessibility.Figma, Adobe XD, and Sketch."
        />
        <ServiceCard
          emoji="🌐 ⚛️ 🐘 🌿"
          title="Website Design"
          description="Building responsive, modern websites with clean code and optimized performance. react, HTML, CSS, springboot, MySQL, PHP, Firebase, C ,python and JavaScript."
        />
      </div>
    </section>
  );
};

// ServiceCard Component
const ServiceCard = ({ emoji, title, description }) => {
  return (
    <div className="service-card">
      <span role="img" aria-label={title} className="service-emoji">{emoji}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

ServiceCard.propTypes = {
  emoji: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

// PortfolioProjectsPage Component (Portfolio Section)
const PortfolioProjectsPage = () => {
  const projects = [
    {
      title: 'OBD2 Project',
      description: 'In this project, I developed a web application that interfaces with OBD2 devices to provide real-time vehicle diagnostics and data visualization. for first year Hardware project.',
      image: OBD2,
      tags: ['React', 'PHP', 'mySQL'],
      link: 'https://github.com/SachithNimsara/MotoMatrix.git'
    },
    {
      title: 'RMA Web Application',
      description: 'This project involved creating a web application for managing Return Merchandise Authorization (RMA) processes. It includes features for tracking product returns, managing customer requests, and generating reports.',
      image: RMA,
      tags: ['React', 'springboot', 'MySQL'],
      link: ''
    },
    {
      title: 'Portfolio Project',
      description: 'This is my personal portfolio website where I showcase my skills, projects, and experiences. It includes sections for my work, skills, and contact information.',
      image: portfolio,
      tags: ['React',  'CSS3'],
      link: 'https://github.com/SachithNimsara/Portfolio.git'
    },
  ];

  return (
    <section id="portfolio" className="portfolio-projects">
      <Box className="portfolio-page bg-black text-white py-10" textAlign="center">
        <Typography variant="h2" gutterBottom>
          My Portfolio
        </Typography>
        <Box maxWidth="800px" mx="auto" px={2} mb={6}>
          <Typography variant="body1">
            I take pride in paying attention to the smallest details and making sure that my work is pixel perfect.
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </Grid>
      </Box>
    </section>
  );
};

// ProjectCard Component with hover effects
const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card 
        className="project-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          transform: isHovered ? 'translateY(-10px)' : 'none',
          boxShadow: isHovered ? '0 10px 20px rgba(0,0,0,0.2)' : '0 4px 8px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden',
          '&:hover .project-image': {
            transform: 'scale(1.05)'
          }
        }}
      >
        <Box sx={{ overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="250"
            image={project.image}
            alt={project.title}
            className="project-image"
            sx={{
              transition: 'transform 0.5s ease',
              objectFit: 'cover'
            }}
          />
        </Box>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h5" component="div" gutterBottom>
            {project.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {project.description}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {project.tags.map((tag, index) => (
              <Typography 
                key={index} 
                variant="caption" 
                sx={{
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1
                }}
              >
                {tag}
              </Typography>
            ))}
          </Box>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth
            href={project.link}
            sx={{ mt: 'auto' }}
          >
            View Project
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

// ContactForm Component (Contact Section)
const ContactForm = () => {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_lr492bv', 'template_6tm1u2q', form.current, 'HcnYSSKj1vmtXBvWH')
      .then(() => {
        alert('Message sent successfully!');
        form.current.reset();
      }, (error) => {
        console.error('EmailJS error:', error.text);
        alert('Failed to send message.');
      });
  };

  return (
    <section id="contact" className="contact-container">
      <Box textAlign="center" mb={4}>
        <h1 className="contact-title">Contact Me</h1>
        <Box maxWidth="600px" mx="auto">
          <p className="contact-subtitle">Please fill out the form below to discuss any work opportunities.</p>
        </Box>
      </Box>

      <Card className="contact-card" sx={{ maxWidth: '600px', mx: 'auto' }}>
        <CardContent>
          <form ref={form} onSubmit={handleSubmit} className="contact-form">
            <input type="text" name="user_name" placeholder="Your name" className="contact-input" required />
            <input type="email" name="user_email" placeholder="Your Email" className="contact-input" required />
            <textarea name="message" placeholder="Your Message" className="contact-textarea" required></textarea>
            <Button variant="contained" color="primary" type="submit" className="contact-button">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="contact-social-icons">
        <a href="#" className="social-icon facebook"><FaFacebook /></a>
        <a href="#" className="social-icon twitter"><FaTwitter /></a>
        <a href="#" className="social-icon youtube"><FaYoutube /></a>
        <a href="#" className="social-icon instagram"><FaInstagram /></a>
      </div>
    </section>
  );
};

// TechSkillsOrbit Component
const TechSkillsOrbit = () => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const icons = [
      { component: <FaReact />, name: 'React', color: '#61DAFB' },
      { component: <FaNodeJs />, name: 'Node.js', color: '#68A063' },
      { component: <FaJs />, name: 'JavaScript', color: '#F7DF1E' },
      { component: <FaHtml5 />, name: 'HTML5', color: '#E34F26' },
      { component: <FaCss3Alt />, name: 'CSS3', color: '#2965F1' },
      { component: <FaFigma />, name: 'Figma', color: '#F24E1E' },
      { component: <FaDatabase />, name: 'MySQL', color: '#00758F' },
      { component: <FaPython />, name: 'Python', color: '#3776AB' },
      { component: <FaAws />, name: 'AWS', color: '#FF9900' },
      { component: <FaDocker />, name: 'Docker', color: '#2496ED' },
      { component: <FaGithub />, name: 'GitHub', color: '#383636' },
      { component: <FaLinkedin />, name: 'LinkedIn', color: '#0A66C2' },
      { component: <FaGoogle />, name: 'Google', color: '#4285F4' }
    ];

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const particles = [];
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    icons.forEach((icon, index) => {
      const particle = document.createElement('div');
      particle.className = 'atom-particle';

      const size = 50 + Math.random() * 30;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      const posX = Math.random() * (containerWidth - size);
      const posY = Math.random() * (containerHeight - size);

      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;

      const velocity = {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
      };

      particle.style.color = icon.color;
      particle.style.boxShadow = `0 0 10px ${icon.color}, 0 0 20px ${icon.color}`;

      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = icon.name;
      particle.appendChild(tooltip);

      const iconContainer = document.createElement('div');
      iconContainer.className = 'icon-container';
      
      const tempDiv = document.createElement('div');
      ReactDOM.render(icon.component, tempDiv, () => {
        iconContainer.appendChild(tempDiv.firstChild);
      });
      
      particle.appendChild(iconContainer);
      container.appendChild(particle);

      particles.push({
        element: particle,
        velocity,
        size
      });
    });

    const animate = () => {
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;

      particles.forEach(particle => {
        const rect = particle.element.getBoundingClientRect();

        let posX = rect.left - containerRect.left;
        let posY = rect.top - containerRect.top;

        posX += particle.velocity.x;
        posY += particle.velocity.y;

        if (posX <= 0 || posX + particle.size >= containerWidth) {
          particle.velocity.x *= -1;
          posX = Math.max(0, Math.min(posX, containerWidth - particle.size));
        }

        if (posY <= 0 || posY + particle.size >= containerHeight) {
          particle.velocity.y *= -1;
          posY = Math.max(0, Math.min(posY, containerHeight - particle.size));
        }

        particle.element.style.left = `${posX}px`;
        particle.element.style.top = `${posY}px`;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div id="skills" className="orbit-container" ref={containerRef}>
      <Box textAlign="center" mb={4}>
        <h2>My Tech Skills</h2>
      </Box>
    </div>
  );
};

export { Portfolio, WhatIDo, PortfolioProjectsPage, ContactForm, TechSkillsOrbit, TypingAnimation }; 