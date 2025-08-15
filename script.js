document.addEventListener('DOMContentLoaded', () => {

    // --- 1. General Setup & Body Load ---
    const body = document.querySelector('body');
    body.classList.add('loaded');

    // --- 2. Header Style on Scroll ---
    const header = document.querySelector('.main-header');
    
    // --- 3. Immersive Parallax Effects (Scroll + Mouse) ---
    const heroSection = document.getElementById('hero');
    const mouseParallaxLayers = heroSection.querySelectorAll('.parallax-layer');
    
    const journeySection = document.getElementById('journey');
    const scrollParallaxLayers = journeySection.querySelectorAll('.parallax-layer');

    const handleScroll = () => {
        const scrollY = window.scrollY;
        
        // Header Scroll Effect
        header.classList.toggle('scrolled', scrollY > 50);

        // Journey Section Parallax Effect
        const journeyRect = journeySection.getBoundingClientRect();
        const journeyTop = journeyRect.top;
        const journeyHeight = journeyRect.height;
        const windowHeight = window.innerHeight;

        // Check if the journey section is in the viewport
        if (journeyTop < windowHeight && journeyTop > -journeyHeight) {
            // Calculate scroll progress within the section (0 to 1)
            const scrollProgress = (windowHeight - journeyTop) / (windowHeight + journeyHeight);
            
            scrollParallaxLayers.forEach(layer => {
                const depth = layer.dataset.depth;
                // THIS LINE IS THE KEY CHANGE FOR MORE INTENSE PARALLAX
                const maxMovement = journeyHeight / 2; // Controls how much the layers move
                const yPos = -(scrollProgress * maxMovement * depth);
                layer.style.transform = `translateY(${yPos}px)`;
            });
        }
    };
    
    const handleMouseParallax = (e) => {
        if (window.innerWidth < 1024) return; // Disable on smaller screens
        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight } = heroSection;
        const x = (clientX / offsetWidth) - 0.5;
        const y = (clientY / offsetHeight) - 0.5;
        
        mouseParallaxLayers.forEach(layer => {
            const depth = layer.dataset.depth;
            const moveX = x * depth * 60; // Increased intensity for more immersion
            const moveY = y * depth * 60;
            layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    };

    window.addEventListener('scroll', handleScroll);
    heroSection.addEventListener('mousemove', handleMouseParallax);
    
    // --- 4. Mobile Navigation ---
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });
    
    // --- 5. Animate Elements on Scroll (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, entry.target.dataset.delay || 0);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));

    // --- 6. Itinerary Accordion ---
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.accordion-item');
            const isActive = item.classList.contains('active');
            
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = null);
            
            if (!isActive) {
                item.classList.add('active');
                item.querySelector('.accordion-content').style.maxHeight = item.querySelector('.accordion-content').scrollHeight + "px";
            }
        });
    });

    // --- 7. Fully Functional Multi-Step Booking Form ---
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        const formSteps = [...bookingForm.querySelectorAll('.form-step')];
        const progressSteps = [...document.querySelectorAll('.progress-bar .step')];
        const progressLines = [...document.querySelectorAll('.progress-bar .progress-line')];
        let currentStep = 0;

        const showStep = (stepIndex) => {
            const currentStepEl = formSteps[currentStep];
            currentStepEl.classList.add('exiting');
            
            setTimeout(() => {
                currentStepEl.classList.remove('active', 'exiting');
                formSteps[stepIndex].classList.add('active');
                currentStep = stepIndex;
                updateProgressBar();
            }, 300);
        };
        
        const updateProgressBar = () => {
            progressSteps.forEach((step, index) => step.classList.toggle('active', index <= currentStep));
            progressLines.forEach((line, index) => line.style.width = index < currentStep ? '100%' : '0%');
        };

        const validateStep = (stepIndex) => {
            let isValid = true;
            const step = formSteps[stepIndex];
            step.querySelectorAll('[required]').forEach(input => {
                const parent = input.closest('.form-group') || input.closest('.package-options').parentElement;
                
                let inputValid = true;
                if (input.type === 'radio') {
                    const radioGroup = step.querySelectorAll(`input[name="${input.name}"]`);
                    inputValid = [...radioGroup].some(r => r.checked);
                    const packageError = step.querySelector('.package-error');
                    if (packageError) {
                        packageError.style.display = inputValid ? 'none' : 'block';
                    }
                } else if (input.type === 'email') {
                    inputValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
                } else {
                    inputValid = input.value.trim() !== '';
                }

                if(parent.classList.contains('form-group')) {
                    parent.classList.toggle('invalid', !inputValid);
                }
                if (!inputValid) isValid = false;
            });
            return isValid;
        };
        
        const updateSummary = () => {
            document.getElementById('summaryStartDate').textContent = bookingForm.travelDate.value || 'Not selected';
            const selectedPackage = bookingForm.querySelector('input[name="package"]:checked');
            document.getElementById('summaryPackage').textContent = selectedPackage ? selectedPackage.value.charAt(0).toUpperCase() + selectedPackage.value.slice(1) : 'N/A';
            document.getElementById('summaryNumGuests').textContent = bookingForm.numGuests.value;
            
            let cost = 0;
            if (selectedPackage && bookingForm.numGuests.value > 0) {
                cost = (selectedPackage.value === 'standard' ? 18000 : 25000) * parseInt(bookingForm.numGuests.value);
            }
            document.getElementById('totalCost').textContent = `₹${cost.toLocaleString('en-IN')}`;
        };

        bookingForm.addEventListener('click', (e) => {
            if (e.target.matches('.btn-next')) {
                if (validateStep(currentStep)) {
                    if (currentStep < formSteps.length - 1) {
                         if(currentStep === 2) updateSummary();
                        showStep(currentStep + 1);
                    }
                }
            } else if (e.target.matches('.btn-prev')) {
                if (currentStep > 0) {
                    showStep(currentStep - 1);
                }
            }
        });
        
        document.querySelectorAll('.package-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.package-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                card.querySelector('input').checked = true;
            });
        });
        
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateStep(currentStep)) {
                alert('Booking Confirmed! (Demo) Thank you for reserving your celestial escape.');
                bookingForm.reset();
                document.querySelectorAll('.package-card').forEach(c => c.classList.remove('selected'));
                document.querySelectorAll('.form-group.invalid').forEach(g => g.classList.remove('invalid'));
                showStep(0);
            }
        });

        // Set min/max dates for January
        const travelDateInput = document.getElementById('travelDate');
        const nextYear = new Date().getFullYear() + 1;
        travelDateInput.setAttribute('min', `${nextYear}-01-01`);
        travelDateInput.setAttribute('max', `${nextYear}-01-31`);
    }
});