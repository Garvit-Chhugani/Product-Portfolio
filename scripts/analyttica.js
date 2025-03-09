// leaps.js
document.addEventListener('DOMContentLoaded', function() {
    // Fade in and slide animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    const slideRightElements = document.querySelectorAll('.slide-in-right');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    // Observer for fade-in elements
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer for slide-in elements
    const slideObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements
    fadeElements.forEach(element => fadeObserver.observe(element));
    slideLeftElements.forEach(element => slideObserver.observe(element));
    slideRightElements.forEach(element => slideObserver.observe(element));

    // Smooth scroll for feature navigation
    //document.querySelectorAll('.feature-link').forEach(anchor => {
        //anchor.addEventListener('click', function(e) {
           // e.preventDefault();
           // const targetId = this.getAttribute('href');
           // const targetElement = document.querySelector(targetId);
            
            //if (targetElement) {
              //  targetElement.scrollIntoView({
                //    behavior: 'smooth',
                  //  block: 'start'
                //});
            //}
        //});
    //});
    
    // Smooth scroll for feature navigation
    document.querySelectorAll('.feature-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href'); // Get the target section ID
            const targetElement = document.querySelector(targetId);
    
            if (targetElement) {
                const offset = 100; // Adjust this value to prevent heading cut-off
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    
                window.scrollTo({
                    top: targetPosition - offset,
                    behavior: 'smooth'
                });
            }
        });
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