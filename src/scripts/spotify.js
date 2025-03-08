// spotify.js
// Make sure this is at the top of your spotify.js file
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
    const pdfUrl = 'https://assets.nextleap.app/submissions/NLSpotify-5de18102-35f4-458e-9b11-9f43561a11c7.pdf';
    const pdfContainer = document.getElementById('pdfViewer');
    

