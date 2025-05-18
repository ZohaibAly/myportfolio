// About.jsx with Modern 3D Particles Animation
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCodeBranch, 
  faLaptopCode, 
  faGraduationCap, 
  faMusic, 
  faCode, 
  faGamepad, 
  faBook

} from "@fortawesome/free-solid-svg-icons";
import "./About.css"; // Your existing CSS
import { FaReact } from "react-icons/fa";
import { motion } from "framer-motion";
import { SiTailwindcss } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { TbBrandDjango } from "react-icons/tb";
import { FaGithub } from "react-icons/fa6";
import { BsGit } from "react-icons/bs";
import { SiMongodb } from "react-icons/si";
import { TbBrandJavascript } from "react-icons/tb";
import { TbApi } from "react-icons/tb";
import { SiMysql } from "react-icons/si";

import { FaBootstrap } from "react-icons/fa6";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa6";
import { FaNodeJs } from "react-icons/fa";


const About = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [animate, setAnimate] = useState(false);
  const canvasRef = useRef(null);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setAnimate(false);
    setTimeout(() => {
      setAnimate(true);
    }, 50);
  };
  const MovingReactIcon = (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      style={{ display: "inline-block" }}
    >
      <FaReact size={90} color="#61DBFB" />
    </motion.div>
  );
  // Animation for the background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.querySelector('.about-container').offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Colors from your brand palette
    const colors = {
      green: "#25f096",
      purple: "#9d72ff",
      orange: "#ff5722",
      blue: "#00e5ff",
      dark: "#1a1e2e"
    };

    // Create particles class
    class Particle {
      constructor(effect, index) {
        this.effect = effect;
        this.index = index;
        this.radius = Math.random() * 2 + 0.5;
        this.x = Math.random() * this.effect.width;
        this.y = Math.random() * this.effect.height;
        this.vx = Math.random() * 1 - 0.5;
        this.vy = Math.random() * 1 - 0.5;
        this.pushX = 0;
        this.pushY = 0;
        this.friction = 0.95;

        // Choose a color based on position (creates gradient effect)
        const colorPosition = this.y / this.effect.height;
        if (colorPosition < 0.33) {
          this.color = colors.purple;
        } else if (colorPosition < 0.66) {
          this.color = colors.blue;
        } else {
          this.color = colors.green;
        }

        // Occasionally use the accent color
        if (Math.random() < 0.1) {
          this.color = colors.orange;
        }

        this.depth = Math.random() * 3; // For parallax effect
        this.originalRadius = this.radius; // Store original radius
        this.pulseFactor = Math.random() * 0.2; // For size pulsing
        this.pulseSpeed = Math.random() * 0.05 + 0.01; // Speed of pulsing
        this.angle = Math.random() * Math.PI * 2; // For circular motion
        this.angleSpeed = Math.random() * 0.002 + 0.001; // Speed of circular motion
        this.orbitRadius = Math.random() * 10; // Radius of circular motion

        // For wave motion
        this.waveAmplitude = Math.random() * 2;
        this.waveFrequency = Math.random() * 0.02 + 0.01;
        this.waveOffset = Math.random() * Math.PI * 2;
      }

      draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
      }

      update(mouseX, mouseY) {
        // Apply push force from mouse
        if (mouseX !== null && mouseY !== null) {
          const dx = this.x - mouseX;
          const dy = this.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const forceFactor = 500; // Force strength factor
          
          if (distance < 120) { // Mouse influence radius
            // Calculate normalized force
            const force = (1 - distance / 120) * forceFactor / (this.depth + 1);
            
            // Apply force
            this.pushX = (dx / distance) * force;
            this.pushY = (dy / distance) * force;
          }
        }

        // Apply push force with friction
        this.x += this.pushX;
        this.y += this.pushY;
        this.pushX *= this.friction;
        this.pushY *= this.friction;

        // Keep particles within canvas
        if (this.x < 0) this.x = 0;
        if (this.x > this.effect.width) this.x = this.effect.width;
        if (this.y < 0) this.y = 0;
        if (this.y > this.effect.height) this.y = this.effect.height;

        // Apply different movement patterns based on particle index
        const time = performance.now() * 0.001;
        const pattern = this.index % 4;

        // Pattern 0: Normal movement with slight wave
        if (pattern === 0) {
          this.x += this.vx;
          this.y += this.vy + Math.sin(time * this.waveFrequency + this.waveOffset) * 0.3;
        }
        // Pattern 1: Circular motion
        else if (pattern === 1) {
          this.angle += this.angleSpeed;
          this.x += Math.cos(this.angle) * this.orbitRadius * 0.05;
          this.y += Math.sin(this.angle) * this.orbitRadius * 0.05;
        }
        // Pattern 2: Wave pattern
        else if (pattern === 2) {
          this.x += this.vx;
          this.y += this.vy + Math.sin(time * this.waveFrequency + this.waveOffset) * this.waveAmplitude;
        }
        // Pattern 3: Floating effect
        else {
          this.x += this.vx * Math.sin(time * 0.2) * 0.5;
          this.y += this.vy * Math.cos(time * 0.2) * 0.5;
        }

        // Bounce off edges
        if (this.x <= this.radius || this.x >= this.effect.width - this.radius) {
          this.vx *= -1;
        }
        if (this.y <= this.radius || this.y >= this.effect.height - this.radius) {
          this.vy *= -1;
        }

        // Pulse effect
        this.radius = this.originalRadius + Math.sin(time * this.pulseSpeed + this.index) * this.pulseFactor;
      }
    }

    // Create effect class
    class Effect {
      constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = this.calculateParticles();
        this.createParticles();
        this.maxDistance = 150; // Max distance for connections
        this.mouseX = null;
        this.mouseY = null;

        // Mouse event listeners
        this.canvas.addEventListener('mousemove', (e) => {
          const rect = this.canvas.getBoundingClientRect();
          this.mouseX = e.clientX - rect.left;
          this.mouseY = e.clientY - rect.top;
        });

        this.canvas.addEventListener('mouseleave', () => {
          this.mouseX = null;
          this.mouseY = null;
        });
      }

      calculateParticles() {
        // Responsive particle count based on screen size
        const area = this.width * this.height;
        return Math.min(Math.floor(area / 12000), 150); // Cap at 150 particles
      }

      createParticles() {
        for (let i = 0; i < this.numberOfParticles; i++) {
          this.particles.push(new Particle(this, i));
        }
      }

      handleParticles(context) {
        this.connectParticles(context);
        this.particles.forEach(particle => {
          particle.draw(context);
          particle.update(this.mouseX, this.mouseY);
        });
      }

      // Connect nearby particles with lines
      connectParticles(context) {
        for (let i = 0; i < this.particles.length; i++) {
          for (let j = i; j < this.particles.length; j++) {
            const dx = this.particles[i].x - this.particles[j].x;
            const dy = this.particles[i].y - this.particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.maxDistance) {
              // More sophisticated connection style
              const opacity = 1 - (distance / this.maxDistance);
              const lineWidth = opacity * 0.8;

              // Create a gradient for the line
              const gradient = context.createLinearGradient(
                this.particles[i].x, 
                this.particles[i].y, 
                this.particles[j].x, 
                this.particles[j].y
              );
              gradient.addColorStop(0, this.particles[i].color);
              gradient.addColorStop(1, this.particles[j].color);
              
              context.beginPath();
              context.strokeStyle = gradient;
              context.globalAlpha = opacity * 0.4;
              context.lineWidth = lineWidth;
              context.moveTo(this.particles[i].x, this.particles[i].y);
              context.lineTo(this.particles[j].x, this.particles[j].y);
              context.stroke();
              context.globalAlpha = 1;
            }
          }
        }
      }

      // Resize handler
      resize(width, height) {
        this.width = width;
        this.height = height;
        const newParticleCount = this.calculateParticles();
        
        // Add or remove particles as needed
        if (newParticleCount > this.numberOfParticles) {
          for (let i = this.numberOfParticles; i < newParticleCount; i++) {
            this.particles.push(new Particle(this, i));
          }
        } else if (newParticleCount < this.numberOfParticles) {
          this.particles = this.particles.slice(0, newParticleCount);
        }
        
        this.numberOfParticles = newParticleCount;
      }
    }

    // Initialize effect
    const effect = new Effect(canvas);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create dark gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(21, 25, 38, 0.85)');
      gradient.addColorStop(1, 'rgba(12, 15, 25, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Render particles
      effect.handleParticles(ctx);
      
      // Create subtle depth blur effect
      ctx.fillStyle = 'rgba(21, 25, 38, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      animationFrameId = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      effect.resize(canvas.width, canvas.height);
    };

    window.addEventListener('resize', handleResize);
    
    // Start animation
    animate();
    
    // Set animation to animate state
    setTimeout(() => {
      setAnimate(true);
    }, 100);
    
    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', effect.handleMouseMove);
      canvas.removeEventListener('mouseleave', effect.handleMouseLeave);
    };
  }, []);

  // Content for "About Me" tab
  const renderAboutMeContent = () => {
    return (
      <div className={`about-me-content ${animate ? 'animate' : ''}`}>
        <div className="about-text">
          <p className="bio-intro">
            I'm <span className="highlight-name">Zohaib Zulifqar</span>, a passionate Full Stack Developer with a love for creating seamless digital experiences.
          </p>
          <p className="bio-main">
            With expertise spanning both frontend and backend technologies, I specialize in building responsive and intuitive web applications. My journey in software development has been driven by curiosity and a desire to solve complex problems through elegant solutions.
          </p>
          <p className="bio-approach">
            I believe in writing clean, maintainable code and staying up-to-date with emerging technologies. My approach combines technical excellence with user-centric design, ensuring that the applications I build are not only functional but also enjoyable to use.
          </p>
          <p className="bio-personal">
            When I'm not coding, you can find me <span className="highlight-hobby">exploring new technologies</span>, contributing to open-source projects, or sharing knowledge with the developer community.
          </p>
        </div>
        <div className="fun-facts">
          <h3>Quick Facts</h3>
          <ul>
            <li>
              <FontAwesomeIcon icon={faLaptopCode} className="fact-icon" />
              1+ years of professional development experience
            </li>
            <li>
              <FontAwesomeIcon icon={faCodeBranch} className="fact-icon" />
              Contributed to 10+ open-source projects
            </li>
            <li>
              <FontAwesomeIcon icon={faMusic} className="fact-icon" />
              Love listening to music while coding
            </li>
            <li>
              <FontAwesomeIcon icon={faCode} className="fact-icon" />
              Passionate about clean code architecture
            </li>
            <li>
              <FontAwesomeIcon icon={faGamepad} className="fact-icon" />
              Enjoy gaming in my free time
            </li>
            <li>
              <FontAwesomeIcon icon={faBook} className="fact-icon" />
              Continuous learner, always exploring new tech
            </li>
          </ul>
        </div>
      </div>
    );
  };

  // Content for "Skills" tab
  const renderSkillsContent = () => {
    // Frontend skills
    const frontendSkills = [
      {  icon: MovingReactIcon,name: "React", level: "90%" },
      { icon:<TbBrandJavascript size={90} color="#f7df1e" />,name: "JavaScript", level: "85%" },
      { icon:<FaHtml5 size={90} color="#DD4B24" />,name: "HTML", level: "100%" },
      {  icon:<FaCss3Alt size={90} color="#00FFFF"/>,name: "CSS", level: "100%" },
      {  icon:<FaBootstrap  size={90} color="#760FF0"/>,name: "BootStrap", level: "85%" },
      {  icon:<SiTailwindcss   size={90} color="#760FF0"/>,name: "TailWind", level: "85%" }
    ];

    // Backend skills
    const backendSkills = [
      { icon:<FaNodeJs size={90} color="#73A964"/>,name: "Node.js", level: "50%" },
      { icon:<SiExpress size={90} color="#ffffff" />,name: "Express", level: "50%" },
      { icon:<TbBrandDjango size={90} color="#113527" />,name: "Django", level: "65%" },
      { icon:<SiMongodb size={90} color="#12A54F" />,name: "MongoDB", level: "65%" },
      { icon:<TbApi size={90} color="#ffffff" />, name: "RESTful APIs", level: "75%" },
      { icon:<SiMysql size={90} color="#087993 "/>, name: "MySQL", level: "85%" },
      { icon:<FaGithub size={90} />,name: "GitHub", level: "65%" },
      { icon:<BsGit  size={90} color="#DF523B"/>,name: "Git", level: "65%" }
  
    ];

    // Tools and other skills
    const toolsSkills = [


      {name: "Problem Solving", level: "90%" },
      { name: "Communication", level: "90%" },
      { name: "Time Managment", level: "95%" },
      { name: "Teamwork", level: "100%" },

   
    ];

    return (
      <div className={`skills-content ${animate ? 'animate' : ''}`}>
        <div className="skills-category">
          <h3>Frontend Development</h3>
          <div className="skills-grid">
            {frontendSkills.map((skill, index) => (
              <div className="skill-item" key={index}>
                <div className="skill-info">
               
                <span className="skill-icon">{skill.icon}</span>
                <div className="pixal">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">{skill.level}</span>
                </div>
               
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{ width: animate ? skill.level : "0%" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="skills-category">
          <h3>Backend Development</h3>
          <div className="skills-grid">
            {backendSkills.map((skill, index) => (
              <div className="skill-item" key={index}>
                <div className="skill-info">
                <span className="skill-icon">{skill.icon}</span>
                <div className="pixal">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">{skill.level}</span>
                </div>
                  
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{ width: animate ? skill.level : "0%" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="skills-category">
          <h3>Soft Skills</h3>
          <div className="skills-grid">
            {toolsSkills.map((skill, index) => (
              <div className="skill-item" key={index}>
                <div className="skill-info">
                   {skill.image && <img src={skill.image} alt={skill.name} />}
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{ width: animate ? skill.level : "0%" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Content for "Education" tab
  const renderEducationContent = () => {
    // Education data
    const education = {
      degree: "Bachelor of Science in Computer Science",
      university: "University of Computer Science",
      period: "2020 - 2025",
      location: "Lahore, Pakistan",
      description: "Completed my degree with a focus on web development and software engineering. The program provided me with a strong foundation in computer science principles, algorithms, and practical software development skills."
    };

    return (
      <div className={`education-content ${animate ? 'animate' : ''}`}>
        <div className="education-card">
          <div className="education-icon">
            <FontAwesomeIcon icon={faGraduationCap} />
          </div>
          <div className="education-details">
            <h3>{education.degree}</h3>
            <div className="university-info">
              <span className="university">{education.university}</span>
              <span className="period">{education.period}</span>
            </div>
            <span className="location">{education.location}</span>
            <p className="description">{education.description}</p>
            
            <div className="courses">
              <h4>Key Courses</h4>
              <div className="course-tags">
                <span className="course-tag">Data Structures</span>
                <span className="course-tag">Algorithms</span>
                <span className="course-tag">Web Development</span>
                <span className="course-tag">Database Systems</span>
                <span className="course-tag">Software Engineering</span>
                <span className="course-tag">Object-Oriented Programming</span>
              </div>
            </div>
            
            <div className="projects-about">
              <h4>Academic Project</h4>
              <div className="project-card-about">
                <h5>Student Advisory Portal</h5>
                <p>A platform designed to help students prepare for mock entry tests, explore universities across Punjab, and access information on academic programs and fee structures. Features search functionality allowing students to find universities offering their desired fields of study.</p>
                <span className="project-period-about">March 2024 – Feb 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="about-container" id="about">
      {/* Canvas for particles animation */}
      <canvas 
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div className="about-hea">
        <h2 className="about-heading">About Me</h2>
      </div>

      {/* Tabs */}
      <div className="about-tabs">
        <div
          className={`tab ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => handleTabChange('about')}
        >
          About Me
        </div>
        <div
          className={`tab ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => handleTabChange('skills')}
        >
          Skills
        </div>
        <div
          className={`tab ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => handleTabChange('education')}
        >
          Education
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'about' && renderAboutMeContent()}
        {activeTab === 'skills' && renderSkillsContent()}
        {activeTab === 'education' && renderEducationContent()}
      </div>
    </div>
  );
};

export default About;