// Experience.jsx
import React from 'react';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      role: "Associate Web Developer",
      company: "CommerceKind",
      location: "Lahore",
      period: "MAR 2024 – Present",
      website: "https://commercekind.com/",
      achievements: [
        "Developed website using React.js with clean, props-driven component architecture",
        "Designed global styling system using CSS variables for consistent theming",
        "Integrated EmailJS and Google Maps API for enhanced user interaction",
        "Implemented Lazy Loading and React Suspense to optimize performance",
        "Optimized component usage for better reusability and improved rendering"
      ]
    },
    {
      role: "Junior Front End Developer",
      company: "Apexcode.ai",
      location: "Lahore",
      period: "OCT 2024 – DEC 2024",
      achievements: [
        "Leveraged expertise in React, JavaScript, Django and AngularJs for robust solutions",
        "Focused on delivering high-quality products with seamless user experiences",
        "Solved technical challenges efficiently to improve processes and drive innovation"
      ]
    },
    {
      role: "Front End Developer",
      company: "TechOverFlow",
      location: "Lahore",
      period: "DEC 2023 – MAR 2024",
      achievements: [
        "Developed responsive web interfaces using modern front-end technologies",
        "Gained proficiency in React.js with Bootstrap and Tailwind CSS",
        "Optimized website performance, achieving 20% reduction in page load time"
      ]
    }
  ];

  return (
    <div className="experience-container">
      <div className='exp-hea'>
      <h2 className="experience-heading">My Experience</h2>
      </div>
   
      
      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <div className="experience-card" key={index} style={{animationDelay: `${0.2 * index}s`}}>
            <div className="experience-card-header">
              <h3 className="role">{exp.role}</h3>
              <span className="period">{exp.period}</span>
            </div>
            <div className="company-info">
              {exp.website ? (
                <a href={exp.website} target="_blank" rel="noopener noreferrer" className="company-link">
                  <span className="company">{exp.company}</span>
                  <i className="fas fa-external-link-alt website-icon"></i>
                </a>
              ) : (
                <span className="company">{exp.company}</span>
              )}
              <span className="location">{exp.location}</span>
            </div>
            <ul className="achievements">
              {exp.achievements.map((achievement, idx) => (
                <li key={idx}>{achievement}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;