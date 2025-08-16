import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const About = () => {
  const addElement = useScrollAnimation();

  return (
    <section id="about" className="content-section">
      <div className="container text-center reveal-on-scroll" ref={addElement}>
        <h2>Breathe the Mountain Air</h2>
        <p className="lead">
          Step away from the noise and into a world painted with peace. Highway to Hill is more than a trip; it's a week-long immersion into the serene heart of nature, designed to soothe your soul and awaken your senses this January.
        </p>
      </div>
    </section>
  );
};

export default About;