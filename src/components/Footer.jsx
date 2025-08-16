import React from 'react';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="container footer-container">
                <div className="footer-column">
                    <h3 className="logo-font">Highway to Hill</h3>
                    <p>Crafting tranquil escapes since 2025.</p>
                </div>
                <div className="footer-column">
                    <h4>Explore</h4>
                    <a href="#about">About Us</a>
                    <a href="#event">The Event</a>
                    <a href="#booking">Book Now</a>
                </div>
                <div className="footer-column">
                    <h4>Connect</h4>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook">FB</a>
                        <a href="#" aria-label="Instagram">IN</a>
                        <a href="#" aria-label="Twitter">TW</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Highway to Hill. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;