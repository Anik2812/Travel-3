import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  
  const closeNav = () => {
    setIsNavOpen(false);
  }

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#journey', label: 'The Journey' },
    { href: '#event', label: 'Event' },
    { href: '#booking', label: 'Book Now' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar container">
        <div className="logo">
          <a href="#hero" onClick={closeNav}>Highway to Hill</a>
        </div>
        <ul className={`nav-links ${isNavOpen ? 'nav-active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} onClick={closeNav}>{link.label}</a>
            </li>
          ))}
        </ul>
        <div className={`burger ${isNavOpen ? 'toggle' : ''}`} onClick={handleNavToggle}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;