// googlepay.js
// Make sure this is at the top of your googlepay.js file
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Fancybox with simpler options
    Fancybox.bind('[data-fancybox="gallery"]', {
        compact: false,
        idle: false,
        animated: false,
        showClass: false,
        hideClass: false,
        dragToClose: false,
        Images: {
            zoom: true,
        },
        Toolbar: {
            display: {
                left: ["infobar"],
                middle: ["zoomIn", "zoomOut", "toggle1to1", "rotateCCW", "rotateCW", "flipX", "flipY"],
                right: ["slideshow", "thumbs", "close"]
            }
        },
        Thumbs: {
            autoStart: false,
        }
    });
});

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(element => {
        fadeObserver.observe(element);
    });

    // Observe takeaway items with staggered animation
    document.querySelectorAll('.takeaways-list li').forEach((item, index) => {
        setTimeout(() => {
            fadeObserver.observe(item);
        }, index * 200);
    });

    // Handle PDF preview (optional - if you want to show PDF preview)
    const pdfUrl = 'https://assets.nextleap.app/submissions/ProductTeardown-ReferralProgram-af6dcde8-161a-4417-a9b3-e5ca43a1837f.pdf';
    const pdfContainer = document.getElementById('pdfViewer');
    



