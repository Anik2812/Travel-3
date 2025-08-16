import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import SectionDivider from './components/SectionDivider';
import Event from './components/Event';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css'; // Make sure styles are imported

function App() {
  useEffect(() => {
    document.body.classList.add('loaded');
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Journey />
        <SectionDivider />
        <Event />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;