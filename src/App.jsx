import React, { useEffect, lazy, Suspense } from 'react';
import { Element } from 'react-scroll';
import NavComp from './component/Navbar/Navbar';
import FooterComp from './component/Footer/Footer';
import HeroSection from './component/PortfolioHeroComp/PortfolioHeroComp'; // Eagerly load
import AboutComp from './component/About/About'; // Eagerly load
import './App.css';

// Only lazy load heavier components
const ExpComp = lazy(() => import('./component/ExperienceComp/Experience'));
const PrjComp = lazy(() => import('./component/Projects/Projects'));
const ContactComp = lazy(() => import('./component/Contact/Contact'));

// Loading component for Suspense fallback
const LoadingComponent = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
  </div>
);

function App() {
  useEffect(() => {
    // This ensures proper scrolling behavior with browser history
    if ('scrollRestoration' in history) {
      // Prevent the browser from automatically restoring scroll position
      history.scrollRestoration = 'manual';
    }
    
    // Scroll to top on page load/refresh
    window.scrollTo(0, 0);
    
    // Preload other sections in the background after initial render
    const preloadSections = () => {
      // Preload remaining sections after a short delay
      setTimeout(() => {
        import('./component/ExperienceComp/Experience');
        import('./component/Projects/Projects');
        import('./component/Contact/Contact');
      }, 2000); // Wait 2 seconds after page load
    };
    
    preloadSections();
  }, []);

  return (
    <div className="App">
 
      <NavComp />

      <Element name="hero">
        <HeroSection /> {/* No Suspense needed for eagerly loaded components */}
      </Element>
      
      <Element name="about">
        <AboutComp /> {/* No Suspense needed for eagerly loaded components */}
      </Element>
      
      <Element name="experience">
        <Suspense fallback={<LoadingComponent />}>
          <ExpComp />
        </Suspense>
      </Element>
      
      <Element name="projects">
        <Suspense fallback={<LoadingComponent />}>
          <PrjComp />
        </Suspense>
      </Element>
      
      <Element name="contact">
        <Suspense fallback={<LoadingComponent />}>
          <ContactComp />
        </Suspense>
      </Element>
      
      <FooterComp />
    </div>
  );
}

export default App;