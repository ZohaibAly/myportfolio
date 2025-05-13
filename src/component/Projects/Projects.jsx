// Projects.jsx with cosmic data-gathering animations
import React, { useState, useEffect } from 'react';

import './Projects.css';

import commerceKindLogo from '../../assets/ck-home-page.png';
import develtroLogo from '../../assets/develtro-home-page.png';
import StudentAdvisory from '../../assets/Student Advisory Portal.png';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  
  // Add visibility detection
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    const projectsContainer = document.querySelector('.projects-container');
    if (projectsContainer) {
      observer.observe(projectsContainer);
    }
    
    return () => {
      if (projectsContainer) {
        observer.unobserve(projectsContainer);
      }
    };
  }, []);
  
  const projects = [
    {
      id: 1,
      title: "Student Advisory Portal",
      category: "full-stack",
      image: StudentAdvisory, 
      description: "A comprehensive platform designed to help students prepare for mock entry tests, explore universities across Punjab, and access detailed program information.",
      technologies: ["React.js", "Django", "Firebase", "MySql"],
      features: [
        "Mock test preparation modules with instant feedback",
        "University exploration tools with advanced filtering",
        "Program comparison with detailed fee structures",
        "Field of study search functionality"
      ],
      status: "Final Year Project - Running perfectly on localhost with zero errors",
      demo: "#"
    },
    {
      id: 2,
      title: "CommerceKind Website",
      category: "frontend",
      image: commerceKindLogo,
      description: "A professional business website developed for CommerceKind with modern design patterns and optimized performance.",
      technologies: ["React.js", "CSS Variables", "EmailJS", "Google Maps API", "Lazy Loading and suspense", "Fully Responsive"],
      features: [
        "Clean, props-driven component architecture",
        "Global styling system using CSS variables",
        "Integrated contact form with EmailJS",
        "Optimized performance with React Suspense",
        "Responsive design for all devices"
      ],
      status: "Live Website",
      link: "https://commercekind.com/"
    },
    {
      id: 3,
      title: "Develtro Website",
      category: "frontend",
      image: develtroLogo,
      description: "A professional business website built for Develtro featuring modern design elements and optimized user experience.",
      technologies: ["HTML", "CSS", "Bootstrap", "JavaScript","Google Maps API", "EmailJS","Fully Responsive"],
      features: [
        "Responsive design following Bootstrap principles",
        "Custom animations and transitions",
        "Professional business layout",
        "Optimized assets and loading time"
      ],
      status: "Live Website",
      link: "https://develtro.com/",
     
    }
  ];
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className={`projects-container ${isVisible ? 'animate-in' : ''}`}>
      {/* Cosmic Data Background Elements */}
      <div className="cosmic-data-bg">
        <div className="data-streams"></div>
        <div className="data-grid"></div>
        <div className="data-particles"></div>
      </div>
      
      {/* Energy Connectors */}
      <div className="energy-connectors">
        <div className="energy-node"></div>
        <div className="energy-node"></div>
        <div className="energy-node"></div>
      </div>
      
      <div className="projects-header">
        <h2 className="projects-heading">My Projects</h2>
        <p className="projects-subheading">Explore my recent work and frontend development capabilities</p>
      </div>
      
      <div className="projects-filter">
        <button 
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All Projects
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'full-stack' ? 'active' : ''}`}
          onClick={() => setActiveFilter('full-stack')}
        >
          Full Stack
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'frontend' ? 'active' : ''}`}
          onClick={() => setActiveFilter('frontend')}
        >
          Frontend
        </button>
      </div>
      
      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <div 
            className="project-card" 
            key={project.id}
            style={{"--i": index}}
          >
            {/* Data Gathering Elements */}
            <div className="data-orb"></div>
            <div className="data-circuit"></div>
            
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                <div className="project-links">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      <i className="fas fa-globe"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            <div className="project-details">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="project-tech">
                {project.technologies.map((tech, index) => (
                  <span className="tech-tag" key={index}>{tech}</span>
                ))}
              </div>
              
              <div className="project-features">
                <h4>Key Features</h4>
                <ul>
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="project-status">
                <span>{project.status}</span>
              </div>
              
              <div className="project-actions">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="visit-btn">
                    Visit Website
                  </a>
                )}
              </div>
              
              {/* Data Visualization Element */}
              <div className="project-data-viz"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;