// Portfolio.js
import React, { useEffect, useRef, useState } from 'react';
import './Portfolio.css';
import myPhoto from './myPhoto.png';
import { 
  FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaReact, FaNodeJs, 
  FaJs, FaCss3Alt, FaFigma, FaDatabase, FaGg, FaLinkedin, FaGoogle, 
  FaJsSquare, FaCreativeCommons, FaHtml5, FaPython, FaAws, FaDocker, FaGithub 
} from 'react-icons/fa';
import { Card, CardContent, Button, Typography, Grid, CardMedia } from '@mui/material';
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
      <h2>What I Do</h2>
      <p>
        I am a skilled and passionate web designer with experience in creating visually appealing
        and user-friendly websites. I have a strong understanding of design and a keen eye for
        detail. I am proficient in HTML, CSS, and JavaScript, as well as design software such as
        Adobe Photoshop and Illustrator.
      </p>
      <div className="services">
        <ServiceCard
          emoji="🖌️🎨 🖼️"
          title="UI/UX Design"
          description="This is a demo text, you can write your own content here."
        />
        <ServiceCard
          emoji="🌐 ⚛️ 🐘 🌿"
          title="Website Design"
          description="This demo text can be changed while making the production-ready site."
        />
      </div>
    </section>
  );
};

// ServiceCard Component
const ServiceCard = ({ emoji, title, description }) => {
  return (
    <div className="service-card">
      <span role="img" aria-label={title}>{emoji}</span>
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
      title: 'Project 1',
      description: 'Description for project 1.',
      image: 'https://via.placeholder.com/300x400?text=Project+1',
    },
    {
      title: 'Project 2',
      description: 'Description for project 2.',
      image: 'https://via.placeholder.com/300x400?text=Project+2',
    },
    {
      title: 'Project 3',
      description: 'Description for project 3.',
      image: 'https://via.placeholder.com/300x400?text=Project+3',
    },
  ];

  return (
    <section id="portfolio" className="portfolio-projects">
      <div className="portfolio-page bg-black text-white py-10">
        <Typography variant="h2" align="center" gutterBottom>
          My Portfolio
        </Typography>
        <Typography variant="body1" align="center" className="mb-8 max-w-2xl mx-auto">
          I take pride in paying attention to the smallest details and making sure that my work is pixel perfect.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </Grid>
      </div>
    </section>
  );
};

// ProjectCard Component
const ProjectCard = ({ project }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className="project-card">
        <CardMedia
          component="img"
          height="300"
          image={project.image}
          alt={project.title}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {project.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {project.description}
          </Typography>
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
      <h1 className="contact-title">Contact Me</h1>
      <p className="contact-subtitle">Please fill out the form below to discuss any work opportunities.</p>

      <Card className="contact-card">
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
      <h2>My Tech Skills</h2>
    </div>
  );
};

export { Portfolio, WhatIDo, PortfolioProjectsPage, ContactForm, TechSkillsOrbit, TypingAnimation };