document.addEventListener('DOMContentLoaded', () => {
    // 1. Set Current Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
                hamburger.setAttribute('aria-expanded', 'true');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 3. Scroll Active Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Offset for navbar
            const sectionId = current.getAttribute('id');
            const link = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if(link) link.classList.add('active');
            } else {
                if(link) link.classList.remove('active');
            }
        });
    });

    // 4. Scroll Reveal Animations
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const fadeElements = document.querySelectorAll('.fade-in-up');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, observerOptions);

        fadeElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // If reduced motion is enabled, make all elements visible immediately
        const fadeElements = document.querySelectorAll('.fade-in-up');
        fadeElements.forEach(element => {
            element.classList.add('visible');
            element.style.transition = 'none';
        });
    }
});
