import React, { useEffect, useRef } from 'react';
// ⚠️ Make sure to place your video in `src/assets/hero-video.mp4`
import heroVideo from '../assets/hero-video.mp4'; 

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseParallax = (e) => {
      if (window.innerWidth < 1024 || !heroRef.current) return;
      const { clientX, clientY } = e;
      const { offsetWidth, offsetHeight } = heroRef.current;
      const x = (clientX / offsetWidth) - 0.5;
      const y = (clientY / offsetHeight) - 0.5;

      const layers = heroRef.current.querySelectorAll('.parallax-layer');
      layers.forEach((layer) => {
        const depth = layer.dataset.depth;
        const moveX = x * depth * 60;
        const moveY = y * depth * 60;
        layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    const currentHeroRef = heroRef.current;
    currentHeroRef.addEventListener('mousemove', handleMouseParallax);
    return () => currentHeroRef.removeEventListener('mousemove', handleMouseParallax);
  }, []);

  return (
    <section id="hero" className="hero-section" ref={heroRef}>
      <div className="parallax-layer" id="hero-video-wrapper" data-depth="0.05">
        <video playsInline autoPlay muted loop className="hero-video">
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>
      <div className="hero-content">
        <div className="hero-aura"></div>
        <h1 className="reveal-on-load parallax-layer" data-depth="0.3">
          Your Celestial Escape Awaits
        </h1>
        <p className="reveal-on-load parallax-layer" data-depth="0.2">
          Where the highway ends, and tranquility begins. Discover a week of peace, music, and starlit skies.
        </p>
        <a href="#booking" className="btn btn-primary reveal-on-load parallax-layer" data-depth="0.5">
          Begin Your Journey
        </a>
      </div>
    </section>
  );
};

export default Hero;