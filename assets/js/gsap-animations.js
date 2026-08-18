document.addEventListener('DOMContentLoaded', function() {
    // 1. Initialize tsParticles Background
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        interactivity: {
            events: {
                onClick: { enable: true, mode: "push" },
                onHover: { enable: true, mode: "repulse" },
                resize: true
            },
            modes: {
                push: { quantity: 4 },
                repulse: { distance: 100, duration: 0.4 }
            }
        },
        particles: {
            color: { value: "#2e7d32" },
            links: {
                color: "#81c784",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1
            },
            move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: 1,
                straight: false
            },
            number: {
                density: { enable: true, area: 800 },
                value: 40
            },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } }
        },
        detectRetina: true
    });

    // 2. Initialize GSAP ScrollTrigger Animations
    gsap.registerPlugin(ScrollTrigger);

    // Initial fade in for Hero elements across pages
    const heroElements = document.querySelectorAll('.hero-content, .hero h1, .hero p, .hero-stats');
    if (heroElements.length > 0) {
        gsap.from(heroElements, {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
        });
    }

    // Scroll-triggered animations for all standard sections/cards
    const fadeUpElements = document.querySelectorAll('.card, .grid > div, .section-title, .form-group, .dashboard-container section');
    
    fadeUpElements.forEach((el) => {
        // Prevent animating sidebars, navigation, or dynamic crop grid items inadvertently
        if(el.closest('.sidebar') || el.closest('.topbar') || el.closest('#cropGrid')) return;
        
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%", // Trigger when top of element is 85% down the viewport
                toggleActions: "play none none reverse"
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Scale-up animation for buttons and icons
    const scaleElements = document.querySelectorAll('.btn, .feature-icon, .stat-icon');
    scaleElements.forEach((el) => {
        // Exclude navbar buttons (Login/Register) from the appear animation
        if(el.closest('.navbar')) return;

        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)"
        });
    });
});
