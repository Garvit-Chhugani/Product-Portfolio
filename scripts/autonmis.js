// autonmis.js
document.addEventListener('DOMContentLoaded', function() {
    // Fade in animation for sections
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Ensure proper positioning of section headings
    function adjustHeadings() {
        const contentBlocks = document.querySelectorAll('.content-block');
        const headings = document.querySelectorAll('.section-headings h2');
        
        contentBlocks.forEach((block, index) => {
            if (headings[index]) {
                const blockTop = block.offsetTop;
                headings[index].style.top = `${blockTop}px`;
            }
        });
    }

    // Run on load and resize
    window.addEventListener('load', adjustHeadings);
    window.addEventListener('resize', adjustHeadings);
});
