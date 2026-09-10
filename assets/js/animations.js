/**
 * Artivo Museum - Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Hero Load Animation
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        setTimeout(() => {
            heroSection.classList.add('loaded');
        }, 300);
    }

    // 2. Intersection Observer for Scroll Reveals
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal, .image-reveal-wrapper, .fade-up');
    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Counter Animation for Statistics
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // lower is slower

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText.replace(/,/g, '');
                    
                    // Lower inc to slow and higher to speed up
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc).toLocaleString();
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                };
                
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));

    // 4. Subtle Mouse Parallax for specific images
    const interactiveImages = document.querySelectorAll('.artwork-interactive');
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        interactiveImages.forEach(img => {
            img.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = img.getBoundingClientRect();
                const x = (e.clientX - left) / width - 0.5;
                const y = (e.clientY - top) / height - 0.5;
                
                // Max movement 8px
                const moveX = x * 16; 
                const moveY = y * 16;
                
                img.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
            });
            
            img.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1) translate(0, 0)';
                // reset with transition
                img.style.transition = 'transform 0.5s ease-out';
                setTimeout(() => {
                    img.style.transition = ''; // remove inline transition to restore CSS hover
                }, 500);
            });
        });
    }
});
