import React, { useEffect, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const featureCards = [
    {
        imgSrc: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=60",
        alt: "Misty mountain peaks at sunrise",
        title: "Sunrise Treks",
        description: "Greet the dawn from majestic peaks as the world awakens in hues of gold and lavender.",
        delay: 0
    },
    {
        imgSrc: "https://img.freepik.com/premium-photo/fire-dark_1048944-6939140.jpg?semt=ais_hybrid&w=740",
        alt: "Cozy bonfire with friends",
        title: "Starlit Bonfires",
        description: "Share stories and laughter around a crackling fire under a brilliant canopy of stars.",
        delay: 150
    },
    {
        imgSrc: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=800&q=60",
        alt: "Person meditating by a serene lake",
        title: "Soulful Immersion",
        description: "Disconnect from the world to reconnect with yourself, guided by nature's gentle rhythm.",
        delay: 300
    }
];

const Journey = () => {
    const addElement = useScrollAnimation();
    const journeyRef = useRef(null);
    const layersRef = useRef([]);

    useEffect(() => {
        const handleScroll = () => {
            if (!journeyRef.current) return;

            const journeyRect = journeyRef.current.getBoundingClientRect();
            const journeyTop = journeyRect.top;
            const journeyHeight = journeyRect.height;
            const windowHeight = window.innerHeight;

            if (journeyTop < windowHeight && journeyTop > -journeyHeight) {
                const scrollProgress = (windowHeight - journeyTop) / (windowHeight + journeyHeight);
                layersRef.current.forEach(layer => {
                    if (layer) {
                        const depth = layer.dataset.depth;
                        const maxMovement = journeyHeight / 2;
                        const yPos = -(scrollProgress * maxMovement * depth);
                        layer.style.transform = `translateY(${yPos}px)`;
                    }
                });
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="journey" className="journey-section" ref={journeyRef}>
            <div className="parallax-bg stars-bg" data-depth="0.2" ref={el => layersRef.current[0] = el}></div>
            <div className="parallax-bg mountains-bg" data-depth="0.5" ref={el => layersRef.current[1] = el}></div>
            
            <div className="journey-content-wrapper container">
                <div className="journey-intro text-center reveal-on-scroll" ref={addElement}>
                    <h2>An Ethereal Experience</h2>
                    <p className="lead">Every moment is crafted to be a memory, a gentle step on your path to rejuvenation.</p>
                </div>
                <div className="journey-features">
                    {featureCards.map((card, index) => (
                        <div key={index} className="feature-card reveal-on-scroll" data-delay={card.delay} ref={addElement}>
                            <img src={card.imgSrc} alt={card.alt} loading="lazy" />
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Journey;