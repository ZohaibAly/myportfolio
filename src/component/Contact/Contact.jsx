// Contact.jsx with Fixed Alpha and Movement Distance Values
import React, { useState, useRef, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { 
  faMapMarkerAlt, 
  faBriefcase, 
  faPaperPlane,
  faUser,
  faCheck,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser';
import './Contact.css';

// Constants
const BRAND_COLORS = {
  primary: "#25f096",
  secondary: "#9d72ff",
  accent: "#ff5722",
  highlight: "#00e5ff",
  dark: "#151926",
  darkGlass: "rgba(26, 30, 46, 0.7)"
};

// Animation timing constants
const ANIMATION_TIMINGS = {
  headerDelay: 400,
  infoCardsBaseDelay: 800,
  infoCardStagger: 200,
  formDelay: 1400
};

const Contact = () => {
  // const location = useLocation();
  // Entrance animation

  const form = useRef();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
    sending: false
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [hasMovedMouse, setHasMovedMouse] = useState(false);
  // Animation state
  const [activeField, setActiveField] = useState(null);
  // const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  // const [lastMousePosition, setLastMousePosition] = useState({ x: null, y: null });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isAnimatingIn, setIsAnimatingIn] = useState(true);
  const [formProgress, setFormProgress] = useState(0);
  
  // Check if this is a new page load to trigger animations
// Entrance animation
useEffect(() => {
  setIsAnimatingIn(true);
  
  // Reset animation after 5 seconds
  const timer = setTimeout(() => {
    setIsAnimatingIn(false);
  }, 5000);
  
  return () => clearTimeout(timer);
}, []); // Empty dependency array - runs once on mount
  
  // Update form progress whenever form data changes
  useEffect(() => {
    let progress = 0;
    if (formData.name) progress += 33;
    if (formData.email) progress += 33;
    if (formData.message) progress += 34;
    setFormProgress(progress);
  }, [formData]);

  // Form event handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFocus = (field) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const newPosition = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      
      // Calculate zoom only if we've already moved the mouse at least once
      if (hasMovedMouse) {
        // const deltaX = newPosition.x - lastMousePosition.x;
        const deltaY = newPosition.y - lastMousePosition.y;
        
        // Zoom logic
        const zoomChange = deltaY * 0.001;
        const newZoom = Math.max(0.8, Math.min(1.2, zoomLevel + zoomChange));
        setZoomLevel(newZoom);
      } else {
        // First mouse movement - just set the flag to true
        setHasMovedMouse(true);
      }
      
      // Always update positions
      setLastMousePosition({...mousePosition});
      setMousePosition(newPosition);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Set loading state
    setFormStatus({
      submitted: true,
      success: false,
      message: 'Sending your message...',
      sending: true
    });
    
    // Replace these with your actual EmailJS IDs
    const serviceId = 'service_5virjf1';
    const templateId = 'template_isod4rc';
    const publicKey = 'CJ6dbNzV0gKOeCuNf';
    
    // Send the email using the form reference after a slight delay for visual effect
    setTimeout(() => {
      emailjs.sendForm(serviceId, templateId, form.current, publicKey)
        .then((response) => {
          console.log('Email sent successfully:', response);
          setFormStatus({
            submitted: true,
            success: true,
            message: 'Message sent successfully! I\'ll be in touch soon.',
            sending: false
          });
          
          // Reset form after successful submission
          setTimeout(() => {
            setFormData({
              name: '',
              email: '',
              message: ''
            });
            
            // Keep success message visible for a bit longer
            setTimeout(() => {
              setFormStatus({
                submitted: false,
                success: false,
                message: '',
                sending: false
              });
            }, 3000);
          }, 2000);
        })
        .catch((error) => {
          console.error('Error sending email:', error);
          setFormStatus({
            submitted: true,
            success: false,
            message: 'There was a problem sending your message. Please try again.',
            sending: false
          });
        });
    }, 1500);
  };

  // Canvas animation with zoom effect
// Canvas animation with zoom effect - with corrected function order
// Canvas animation with zoom effect - Complete Implementation
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas || !containerRef.current) return;
  
  const ctx = canvas.getContext('2d');
  
  // Animation elements
  let particles = [];
  let gridPoints = [];
  let glowPoints = [];
  
  // Get random color from brand colors
  const getRandomColor = (alpha = 1) => {
    const colors = [
      BRAND_COLORS.primary,
      BRAND_COLORS.secondary,
      BRAND_COLORS.accent,
      BRAND_COLORS.highlight
    ];
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Return color with alpha
    if (color.startsWith('#')) {
      // Convert hex to rgba
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    return color; // Already rgba
  };
  
  // Initialize animation elements
  const initElements = () => {
    // Reset all arrays
    particles = [];
    gridPoints = [];
    glowPoints = [];
    
    // Create particles
    const particleCount = Math.floor(canvas.width * canvas.height / 10000);
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 500, // Depth for 3D effect
        originalZ: Math.random() * 500,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2,
        color: getRandomColor(0.7),
        pulse: Math.random() * Math.PI * 2
      });
    }
    
    // Create grid points
    const gridSize = 80;
    const cols = Math.ceil(canvas.width / gridSize) + 1;
    const rows = Math.ceil(canvas.height / gridSize) + 1;
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        gridPoints.push({
          x: i * gridSize,
          y: j * gridSize,
          z: Math.random() * 300, // Depth for 3D effect
          originalZ: Math.random() * 300,
          size: Math.random() * 1 + 0.5,
          color: getRandomColor(0.3),
          pulse: Math.random() * Math.PI * 2
        });
      }
    }
    
    // Create glow points
    const glowCount = 5;
    for (let i = 0; i < glowCount; i++) {
      glowPoints.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 300,
        originalZ: Math.random() * 300,
        radius: Math.random() * 100 + 50,
        color: getRandomColor(0.2),
        speed: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5
        }
      });
    }
  };
  
  // Resize handling - DEFINED AFTER initElements
  const resizeCanvas = () => {
    canvas.width = containerRef.current.offsetWidth;
    canvas.height = containerRef.current.offsetHeight;
    initElements(); // Now this works because initElements is defined above
  };
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Convert 3D coordinates to 2D with zoom
  const project = (x, y, z, zoom) => {
    // Calculate perspective divide (further objects appear smaller)
    const factor = 1000 / (1000 + z);
    
    // Apply zoom to the factor
    const zoomedFactor = factor * zoom;
    
    // Convert to screen coordinates
    // const screenX = canvas.width / 2 + (x - canvas.width / 2) * zoomedFactor;
    // const screenY = canvas.height / 2 + (y - canvas.height / 2) * zoomedFactor;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Apply zoom from the center point
    const screenX = centerX + (x - centerX) * zoomedFactor;
    const screenY = centerY + (y - centerY) * zoomedFactor;
    
    return {
      x: screenX,
      y: screenY,
      scale: zoomedFactor
    };
  };
  
  // Main animation function
  const animate = () => {
    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(21, 25, 38, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const time = performance.now() / 1000; // Convert to seconds
    
    // Update and draw glow points
    glowPoints.forEach(point => {
      // Move points slowly
      point.x += point.speed.x;
      point.y += point.speed.y;
      
      // Keep within bounds
      if (point.x < -point.radius) point.x = canvas.width + point.radius;
      if (point.x > canvas.width + point.radius) point.x = -point.radius;
      if (point.y < -point.radius) point.y = canvas.height + point.radius;
      if (point.y > canvas.height + point.radius) point.y = -point.radius;
      
      // Adjust z based on zoom
      point.z = point.originalZ * zoomLevel;
      
      // Project to 2D
      const projected = project(point.x, point.y, point.z, zoomLevel);
      
      // Draw glow
      const gradient = ctx.createRadialGradient(
        projected.x, projected.y, 0,
        projected.x, projected.y, point.radius * projected.scale
      );
      gradient.addColorStop(0, point.color);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      
      ctx.beginPath();
      ctx.arc(projected.x, projected.y, point.radius * projected.scale, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.3;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    
    // Draw grid points
    let visibleGridPoints = [];
    gridPoints.forEach(point => {
      // Adjust z based on zoom
      point.z = point.originalZ * zoomLevel;
      
      // Project to 2D
      const projected = project(point.x, point.y, point.z, zoomLevel);
      
      // Store visible points for connecting lines
      if (projected.x >= 0 && projected.x <= canvas.width && 
          projected.y >= 0 && projected.y <= canvas.height) {
        visibleGridPoints.push({
          x: projected.x,
          y: projected.y,
          z: point.z,
          color: point.color,
          originalPoint: point
        });
      }
      
      // Pulse effect
      const pulse = Math.sin(time + point.pulse) * 0.5 + 0.5;
      
      // Draw point
      ctx.beginPath();
      ctx.arc(projected.x, projected.y, point.size * projected.scale, 0, Math.PI * 2);
      ctx.fillStyle = point.color;
      ctx.globalAlpha = 0.4 * pulse;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    
    // Connect grid points with lines
    visibleGridPoints.forEach(point => {
      visibleGridPoints.forEach(otherPoint => {
        if (point !== otherPoint) {
          const dx = point.x - otherPoint.x;
          const dy = point.y - otherPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 80; // Maximum distance for connection
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.strokeStyle = point.color;
            ctx.globalAlpha = 0.1 * (1 - distance / maxDistance);
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });
    });
    
    // Draw particles with 3D effect
    particles.forEach(p => {
      // Adjust z based on zoom
      p.z = p.originalZ * zoomLevel;
      
      // Project to 2D
      const projected = project(p.x, p.y, p.z, zoomLevel);
      
      // Pulse effect
      const pulse = Math.sin(time * 2 + p.pulse) * 0.3 + 0.7;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(projected.x, projected.y, p.size * projected.scale, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.7 * pulse;
      ctx.fill();
      ctx.globalAlpha = 1;
      
      // Move particles slowly in a slightly random direction
      const angle = time * 0.2 + p.pulse;
      p.x += Math.cos(angle) * p.speed;
      p.y += Math.sin(angle) * p.speed;
      
      // Wrap around when reaching edges
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });
    
    // Mouse effects
    if (mousePosition.x !== null && mousePosition.y !== null) {
      // Draw cursor glow
      const gradient = ctx.createRadialGradient(
        mousePosition.x, mousePosition.y, 0,
        mousePosition.x, mousePosition.y, 100
      );
      gradient.addColorStop(0, 'rgba(37, 240, 150, 0.2)');
      gradient.addColorStop(1, 'rgba(37, 240, 150, 0)');
      
      ctx.beginPath();
      ctx.arc(mousePosition.x, mousePosition.y, 100, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Connect particles to mouse cursor
      const mouseInfluenceRadius = 100; // Distance where particles connect to mouse
      
      particles.forEach(p => {
        const projected = project(p.x, p.y, p.z, zoomLevel);
        const dx = mousePosition.x - projected.x;
        const dy = mousePosition.y - projected.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseInfluenceRadius) {
          ctx.beginPath();
          ctx.moveTo(projected.x, projected.y);
          ctx.lineTo(mousePosition.x, mousePosition.y);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = 0.2 * (1 - distance / mouseInfluenceRadius);
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });
    }
    
    // Add focus effect for active form field
    if (activeField) {
      const formElement = document.getElementById(activeField);
      if (formElement) {
        const rect = formElement.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        
        const fieldX = rect.left + rect.width / 2 - containerRect.left;
        const fieldY = rect.top + rect.height / 2 - containerRect.top;
        const fieldRadius = Math.max(rect.width, rect.height) * 0.7;
        
        // Draw focus glow
        const gradient = ctx.createRadialGradient(
          fieldX, fieldY, 0,
          fieldX, fieldY, fieldRadius
        );
        gradient.addColorStop(0, 'rgba(37, 240, 150, 0.15)');
        gradient.addColorStop(1, 'rgba(37, 240, 150, 0)');
        
        ctx.beginPath();
        ctx.arc(fieldX, fieldY, fieldRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw pulse rings
        const pulseTime = time % 3;
        if (pulseTime < 1) {
          const pulseRadius = fieldRadius * pulseTime;
          ctx.beginPath();
          ctx.arc(fieldX, fieldY, pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = BRAND_COLORS.primary;
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.5 * (1 - pulseTime);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
    
    // Draw form progress bar
    if (formProgress > 0) {
      const progressWidth = canvas.width * (formProgress / 100);
      const barHeight = 3;
      const barY = canvas.height - barHeight - 2;
      
      // Draw background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, barY, canvas.width, barHeight);
      
      // Draw progress
      const progressGradient = ctx.createLinearGradient(0, 0, progressWidth, 0);
      progressGradient.addColorStop(0, BRAND_COLORS.primary);
      progressGradient.addColorStop(1, BRAND_COLORS.secondary);
      
      ctx.fillStyle = progressGradient;
      ctx.fillRect(0, barY, progressWidth, barHeight);
      
      // Add glow to edge
      ctx.shadowColor = BRAND_COLORS.primary;
      ctx.shadowBlur = 6;
      ctx.fillRect(progressWidth - 5, barY, 5, barHeight);
      ctx.shadowBlur = 0;
    }
    
    // Continue animation loop
    animationRef.current = requestAnimationFrame(animate);
  };
  
  // Start the animation
  animationRef.current = requestAnimationFrame(animate);
  
  // Cleanup
  return () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    window.removeEventListener('resize', resizeCanvas);
  };
}, [zoomLevel, mousePosition, activeField, formProgress]);

  return (
    <div 
      className="contact-container" 
      id="contact"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Canvas for zooming animation */}
      <canvas 
        ref={canvasRef}
        className="contact-canvas"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          // transform: `scale(${zoomLevel})`,
          // transition: 'transform 0.1s ease-out'
        }}
      />
      
      <div className={`contact-header ${isAnimatingIn ? 'animate-in' : ''}`}>
        <h2 className="contact-heading">Get In Touch</h2>
        <div className="heading-line"></div>
        <p className="contact-subheading">Let's collaborate on your next project or discuss potential opportunities!</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info">
          <div 
            className={`info-card ${isAnimatingIn ? 'animate-in' : ''}`} 
            style={{animationDelay: `${ANIMATION_TIMINGS.infoCardsBaseDelay}ms`}}
          >
            <div className="info-icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
            <div className="info-text">
              <h3>Location</h3>
              <p>Lahore, Punjab, Pakistan</p>
            </div>
          </div>
          
          <div 
            className={`info-card ${isAnimatingIn ? 'animate-in' : ''}`}
            style={{animationDelay: `${ANIMATION_TIMINGS.infoCardsBaseDelay + ANIMATION_TIMINGS.infoCardStagger}ms`}}
          >
            <div className="info-icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className="info-text">
              <h3>Email</h3>
              <p>mzohaibali223@gmail.com</p>
            </div>
          </div>
          
          <div 
            className={`info-card ${isAnimatingIn ? 'animate-in' : ''}`}
            style={{animationDelay: `${ANIMATION_TIMINGS.infoCardsBaseDelay + ANIMATION_TIMINGS.infoCardStagger * 2}ms`}}
          >
            <div className="info-icon">
              <FontAwesomeIcon icon={faBriefcase} />
            </div>
            <div className="info-text">
              <h3>Employment</h3>
              <p>Open to opportunities</p>
            </div>
          </div>
          
          <div 
            className={`form-progress-container ${isAnimatingIn ? 'animate-in' : ''}`}
            style={{animationDelay: `${ANIMATION_TIMINGS.infoCardsBaseDelay + ANIMATION_TIMINGS.infoCardStagger * 3}ms`}}
          >
            <h3>Form Completion</h3>
            <div className="progress-bar-container">
              <div 
                className="progress-bar" 
                style={{width: `${formProgress}%`}}
              ></div>
            </div>
            <p className="progress-text">{formProgress}% Complete</p>
          </div>
        </div>
        
        <div 
          className={`contact-form-container ${isAnimatingIn ? 'animate-in' : ''}`}
          style={{animationDelay: `${ANIMATION_TIMINGS.formDelay}ms`}}
        >
          <form className="contact-form" ref={form} onSubmit={handleSubmit}>
            <div className="form-header">
              <div className="form-icon">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <h3>Send A Message</h3>
            </div>
            
            <div className={`form-group ${activeField === 'name' ? 'active' : ''}`}>
              <label htmlFor="name">Your Name</label>
              <div className="input-container">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  placeholder="Enter your name"
                  required
                />
                <div className="field-status">
                  {formData.name && <FontAwesomeIcon icon={faCheck} className="status-icon complete" />}
                </div>
              </div>
            </div>
            
            <div className={`form-group ${activeField === 'email' ? 'active' : ''}`}>
              <label htmlFor="email">Email Address</label>
              <div className="input-container">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                  required
                />
                <div className="field-status">
                  {formData.email && <FontAwesomeIcon icon={faCheck} className="status-icon complete" />}
                </div>
              </div>
            </div>
            
            <div className={`form-group ${activeField === 'message' ? 'active' : ''}`}>
              <label htmlFor="message">Message</label>
              <div className="input-container textarea-container">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  placeholder="Enter your message"
                  rows="6"
                  required
                ></textarea>
                <div className="field-status textarea-status">
                  {formData.message && <FontAwesomeIcon icon={faCheck} className="status-icon complete" />}
                </div>
              </div>
            </div>
            <div className='Submit-btn-div'>
 <button 
              type="submit" 
              className={`submit-btn ${formStatus.sending ? 'sending' : ''}`}
              disabled={formStatus.sending}
            >
              {formStatus.sending ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="spinner" /> Sending...
                </>
              ) : (
                <>
                  Send Message <FontAwesomeIcon icon={faPaperPlane} />
                </>
              )}
            </button>
            </div>
           
            
            {formStatus.submitted && (
              <div className={`form-status ${formStatus.success ? 'success' : 'error'}`}>
                {formStatus.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;