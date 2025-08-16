import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Initial state for form data
const initialFormData = {
    travelDate: '',
    package: '',
    fullName: '',
    email: '',
    phone: '',
    numGuests: 1,
};

// Initial state for form errors
const initialErrors = {
    travelDate: '',
    package: '',
    fullName: '',
    email: '',
    phone: '',
    numGuests: '',
};

const Booking = () => {
    const addElement = useScrollAnimation();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState(initialErrors);
    const [isExiting, setIsExiting] = useState(false);

    const steps = ['Dates', 'Package', 'Details', 'Confirm'];

    // Set date input constraints for next year's January
    const nextYear = new Date().getFullYear() + 1;
    const minDate = `${nextYear}-01-01`;
    const maxDate = `${nextYear}-01-24`; // A 7-day trip must start by the 24th to end in Jan

    // Handle input changes and clear errors
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Handle package selection
    const handlePackageChange = (value) => {
        setFormData(prev => ({ ...prev, package: value }));
        if (errors.package) {
            setErrors(prev => ({ ...prev, package: '' }));
        }
    }

    // Validate the current step's inputs
    const validateStep = () => {
        const newErrors = { ...initialErrors };
        let isValid = true;

        if (currentStep === 0) {
            if (!formData.travelDate) {
                newErrors.travelDate = 'Please select a valid date in January.';
                isValid = false;
            }
        }
        if (currentStep === 1) {
            if (!formData.package) {
                newErrors.package = 'Please select a package.';
                isValid = false;
            }
        }
        if (currentStep === 2) {
            if (!formData.fullName.trim()) {
                newErrors.fullName = 'Please enter your name.';
                isValid = false;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Please enter a valid email.';
                isValid = false;
            }
            if (!/^\+?[1-9]\d{9,14}$/.test(formData.phone)) { // Simple phone validation
                newErrors.phone = 'Please enter a valid phone number.';
                isValid = false;
            }
            if (formData.numGuests < 1 || formData.numGuests > 10) {
                newErrors.numGuests = 'Please enter a number between 1 and 10.';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    // Animate and move to the next step
    const handleNext = () => {
        if (validateStep()) {
            setIsExiting(true);
            setTimeout(() => {
                setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
                setIsExiting(false);
            }, 300);
        }
    };

    // Animate and move to the previous step
    const handlePrev = () => {
        setIsExiting(true);
        setTimeout(() => {
            setCurrentStep(prev => Math.max(prev - 1, 0));
            setIsExiting(false);
        }, 300);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateStep()) {
            alert('Booking Confirmed! (Demo) Thank you for reserving your celestial escape.');
            setFormData(initialFormData);
            setErrors(initialErrors);
            setCurrentStep(0);
        }
    };

    // Calculate the total booking cost
    const calculateTotal = () => {
        if (!formData.package || formData.numGuests < 1) return 0;
        const costPerPerson = formData.package === 'standard' ? 18000 : 25000;
        return costPerPerson * formData.numGuests;
    };

    return (
        <section id="booking" className="booking-section">
            <div className="container text-center reveal-on-scroll" ref={addElement}>
                <h2>Reserve Your Place in Heaven</h2>

                <div className="progress-bar">
                    {steps.map((step, index) => (
                        <React.Fragment key={step}>
                            <div className={`step ${index <= currentStep ? 'active' : ''}`}>
                                <span>{index + 1}</span> {step}
                            </div>
                            {index < steps.length - 1 && (
                                <div className="progress-line-container">
                                    <div className="progress-line" style={{ width: index < currentStep ? '100%' : '0%' }}></div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <form id="bookingForm" className="booking-form" onSubmit={handleSubmit} noValidate>
                    {/* Step 1: Dates */}
                    <div className={`form-step ${currentStep === 0 ? 'active' : ''} ${isExiting && currentStep === 0 ? 'exiting' : ''}`}>
                        <h3>When Will You Join Us?</h3>
                        <p className="form-description">Our exclusive event runs through January. Please select your preferred start date for the 7-day experience.</p>
                        <div className={`form-group ${errors.travelDate ? 'invalid' : ''}`}>
                            <label htmlFor="travelDate">Start Date</label>
                            <input type="date" id="travelDate" name="travelDate" value={formData.travelDate} onChange={handleChange} min={minDate} max={maxDate} required />
                            <p className="error-message">{errors.travelDate}</p>
                        </div>
                        <div className="form-navigation">
                            <button type="button" className="btn btn-primary btn-next" onClick={handleNext}>Next</button>
                        </div>
                    </div>

                    {/* Step 2: Package */}
                    <div className={`form-step ${currentStep === 1 ? 'active' : ''} ${isExiting && currentStep === 1 ? 'exiting' : ''}`}>
                        <h3>Choose Your Experience</h3>
                        <p className="form-description">Select the package that best suits your vision for this escape.</p>
                        <div className="package-options">
                            <label className={`package-card ${formData.package === 'standard' ? 'selected' : ''}`} onClick={() => handlePackageChange('standard')}>
                                <input type="radio" name="package" value="standard" checked={formData.package === 'standard'} readOnly />
                                <div className="package-content">
                                    <h4>Standard Serenity ✨</h4>
                                    <p>Cozy accommodation, all meals, guided walks, and full access to musical nights.</p>
                                    <span className="price">₹18,000 / person</span>
                                </div>
                            </label>
                            <label className={`package-card ${formData.package === 'premium' ? 'selected' : ''}`} onClick={() => handlePackageChange('premium')}>
                                <input type="radio" name="package" value="premium" checked={formData.package === 'premium'} readOnly />
                                <div className="package-content">
                                    <h4>Premium Paradise 🌟</h4>
                                    <p>Private cottage, themed dinners, backstage access, and inclusive adventure activities.</p>
                                    <span className="price">₹25,000 / person</span>
                                </div>
                            </label>
                        </div>
                        <p className="error-message" style={{ textAlign: 'center', display: errors.package ? 'block' : 'none' }}>{errors.package}</p>
                        <div className="form-navigation">
                            <button type="button" className="btn btn-secondary btn-prev" onClick={handlePrev}>Previous</button>
                            <button type="button" className="btn btn-primary btn-next" onClick={handleNext}>Next</button>
                        </div>
                    </div>

                    {/* Step 3: Details */}
                    <div className={`form-step ${currentStep === 2 ? 'active' : ''} ${isExiting && currentStep === 2 ? 'exiting' : ''}`}>
                        <h3>Tell Us About Yourself</h3>
                        <p className="form-description">Just a few details to personalize your booking.</p>
                        <div className="form-grid">
                            <div className={`form-group ${errors.fullName ? 'invalid' : ''}`}>
                                <label htmlFor="fullName">Full Name</label>
                                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                                <p className="error-message">{errors.fullName}</p>
                            </div>
                            <div className={`form-group ${errors.email ? 'invalid' : ''}`}>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                                <p className="error-message">{errors.email}</p>
                            </div>
                            <div className={`form-group ${errors.phone ? 'invalid' : ''}`}>
                                <label htmlFor="phone">Phone Number</label>
                                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                                <p className="error-message">{errors.phone}</p>
                            </div>
                            <div className={`form-group ${errors.numGuests ? 'invalid' : ''}`}>
                                <label htmlFor="numGuests">Number of Guests</label>
                                <input type="number" id="numGuests" name="numGuests" value={formData.numGuests} onChange={handleChange} min="1" max="10" required />
                                <p className="error-message">{errors.numGuests}</p>
                            </div>
                        </div>
                        <div className="form-navigation">
                            <button type="button" className="btn btn-secondary btn-prev" onClick={handlePrev}>Previous</button>
                            <button type="button" className="btn btn-primary btn-next" onClick={handleNext}>Next</button>
                        </div>
                    </div>

                    {/* Step 4: Confirm */}
                    <div className={`form-step ${currentStep === 3 ? 'active' : ''} ${isExiting && currentStep === 3 ? 'exiting' : ''}`}>
                        <h3>Confirm Your Booking</h3>
                        <p className="form-description">Please review your details. This is the final step before securing your spot.</p>
                        <div className="booking-summary">
                            <h4>Booking Summary</h4>
                            <p><strong>Start Date:</strong> <span>{formData.travelDate || 'N/A'}</span></p>
                            <p><strong>Package:</strong> <span style={{ textTransform: 'capitalize' }}>{formData.package || 'N/A'}</span></p>
                            <p><strong>Guests:</strong> <span>{formData.numGuests}</span></p>
                            <hr />
                            <p className="total-cost"><strong>Total Cost:</strong> <span>₹{calculateTotal().toLocaleString('en-IN')}</span></p>
                        </div>
                        <div className="form-navigation">
                            <button type="button" className="btn btn-secondary btn-prev" onClick={handlePrev}>Previous</button>
                            <button type="submit" className="btn btn-primary">Confirm & Book</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Booking;