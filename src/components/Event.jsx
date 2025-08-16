import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const AccordionItem = ({ title, content, isActive, onClick }) => {
    return (
        <div className={`accordion-item ${isActive ? 'active' : ''}`}>
            <h4 className="accordion-header" onClick={onClick}>
                {title}
            </h4>
            <div className="accordion-content">
                <p>{content}</p>
            </div>
        </div>
    );
};

const itineraryData = [
    {
        title: "Day 1: Arrival & Acclimatization",
        content: "Arrive and settle into your serene abode. The evening begins with a warm welcome dinner and a gentle ice-breaking session under the stars."
    },
    {
        title: "Day 2-6: Exploration & Enchantment",
        content: "Your days will be filled with guided nature walks, visits to hidden lakes, cultural immersion, and optional adventures. Each evening is a celebration with live music by the bonfire."
    },
    {
        title: "Day 7: Farewell Sunrise",
        content: "Witness one last glorious sunrise, enjoy a heartfelt farewell breakfast, and depart with a peaceful mind and a full heart."
    }
];

const Event = () => {
    const addElement = useScrollAnimation();
    const [activeIndex, setActiveIndex] = useState(null);

    const handleItemClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="event" className="content-section light-bg">
            <div className="container text-center reveal-on-scroll" ref={addElement}>
                <h2>Music for the Soul 🎶</h2>
                <p className="lead">As dusk settles, the mountains come alive with the soulful melodies of a live Bengali folk band, an unforgettable soundtrack to your celestial escape.</p>
            </div>
            <div className="container itinerary-container reveal-on-scroll" data-delay="200" ref={addElement}>
                <div className="itinerary-visual">
                    <img src="https://images.stockcake.com/public/0/c/a/0ca0bc25-aca5-4814-9cd9-ef01a99b8c83_large/concert-night-glow-stockcake.jpg" alt="Musicians playing under string lights at dusk" loading="lazy" />
                </div>
                <div className="itinerary-accordion">
                    <h3>The Week's Itinerary</h3>
                    {itineraryData.map((item, index) => (
                        <AccordionItem
                            key={index}
                            title={item.title}
                            content={item.content}
                            isActive={activeIndex === index}
                            onClick={() => handleItemClick(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Event;