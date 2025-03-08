// about.js


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


    
// engagement.js
document.addEventListener('DOMContentLoaded', function () {


    // Elements
    const heartBtn = document.getElementById('heartBtn');
    const heartIcon = heartBtn.querySelector('i');
    const heartCount = document.getElementById('heartCount');
    const heartTooltip = document.getElementById('heartTooltip');
    const shareBtn = document.getElementById('shareBtn');
    const shareTooltip = document.getElementById('shareTooltip');

    // Load heart count from localStorage
    let count = localStorage.getItem('heartCount') ? parseInt(localStorage.getItem('heartCount')) : 0;
    heartCount.textContent = count;

    // ✅ Like Button Click
    heartBtn.addEventListener('click', function () {


        count++;  // Increase count
        localStorage.setItem('heartCount', count); // Save in localStorage
        heartCount.textContent = count;  // Update UI

        // Change heart icon
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');

        // Animate heart
        heartBtn.classList.add('active');
        setTimeout(() => heartBtn.classList.remove('active'), 300);

        // Show tooltip
        showTooltip(heartTooltip);
    });

    // ✅ Share Button Click
    shareBtn.addEventListener('click', function () {


        // Copy URL to clipboard
        navigator.clipboard.writeText("https://garvitchhugani.com")
            .then(() => {


                // Show tooltip
                shareTooltip.classList.add('show');
                setTimeout(() => shareTooltip.classList.remove('show'), 2000);
            })
            .catch(err => {
                console.error('Failed to copy:', err);
                alert('Failed to copy link. Please try again.');
            });
    });

    // Function to show tooltip
    function showTooltip(tooltip) {
        tooltip.classList.add('show');
        setTimeout(() => tooltip.classList.remove('show'), 2000);
    }



// Wait for the DOM to be fully loaded
window.addEventListener('DOMContentLoaded', function () {
    // Get DOM elements
    const modal = document.getElementById('contactModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.querySelector('.close');

    // Ensure modal is hidden on page load
    if (modal) {
        modal.style.display = 'none';
    }

    // Function to open modal
    function openModal(event) {
        if (event) event.preventDefault(); // Prevent page jump

        if (modal) {
            modal.style.display = 'flex'; // Make modal visible
            document.body.classList.add('modal-open'); // Prevent background scrolling

            // Ensure modal is centered in the viewport
            const modalContent = document.querySelector('.modal-content');
            modalContent.scrollTop = 0; /* Reset scroll position to top */
        }
    }

    // Function to close modal
    function closeModal() {
        if (modal) {
            modal.style.display = 'none'; // Hide modal
            document.body.classList.remove('modal-open'); // Restore background scrolling
        }
    }

    // Event listener for opening modal
    if (openBtn) {
        openBtn.addEventListener('click', openModal);
    }

    // Event listener for closing modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
            e.preventDefault();
            closeModal();
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Initialize EmailJS
    if (window.emailjs) {
        emailjs.init("tIp9pejc13mD3pofU");
    }
});



// Form submission handler starts here...

// Form submission handler
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');


const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');

function checkFormValidity() {
    submitBtn.disabled = !validateForm();
}

inputs.forEach(input => {
    input.addEventListener('input', () => {
        validateForm();
        checkFormValidity();
    });

    input.addEventListener('focus', function () {
        const errorMessage = this.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.textContent = '';
            errorMessage.classList.remove('show');
        }
    });
});

let lastSubmissionTime = 0;
contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSubmissionTime < 60000) { 
        const waitMessage = document.getElementById("waitMessage");
        waitMessage.style.display = "block"; // Show wait message
    
        setTimeout(() => {
            waitMessage.style.display = "none"; // Hide wait message after alert is dismissed
        }, 4000); // Slight delay to ensure the UI updates before alert

        return;
    }


    if (!validateForm()) return;

    submitBtn.disabled = true;
    submitBtn.querySelector('.button-text').textContent = 'Submitting...';
    submitBtn.querySelector('.button-loader').style.display = 'block';

    try {
        await emailjs.sendForm(
            'service_sqgk6ud',
            'template_2cfc8un',
            this,
            'tIp9pejc13mD3pofU'
        );

        lastSubmissionTime = now;

        const successMessage = document.getElementById('successMessage');
        successMessage.innerHTML = `
            <p><strong>Message Sent!</strong></p>
            <p>Thanks for reaching out! I’ll be sure to look over your message.</p>
            <p>Best,<br>Garvit</p>
        `;
        successMessage.style.display = "block";

        this.reset();
        submitBtn.disabled = true;

        setTimeout(() => {
            successMessage.style.display = "none"; 
            if (contactModal) {  // ✅ Check if modal exists before trying to use it
                contactModal.style.display = "none"; 
            } else {
                console.warn("Modal element not found in the DOM.");
            }

        }, 5000);

    } catch (error) {
        alert('Sorry, something went wrong. Please try again later.');
        console.error('EmailJS Error:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.querySelector('.button-text').textContent = 'Submit';
        submitBtn.querySelector('.button-loader').style.display = 'none';
    }
});

function validateForm() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    let isValid = true;

    document.querySelectorAll('.error-message').forEach(err => {
        err.textContent = '';
        err.classList.remove('show');
    });

    function showError(id, msg) {
        const err = document.querySelector(`#${id} + .error-message`);
        if (err) {
            err.textContent = msg;
            err.classList.add('show');
        }
    }

    if (!firstName) { showError('firstName', 'First Name is required.'); isValid = false; }
    if (!lastName) { showError('lastName', 'Last Name is required.'); isValid = false; }

    const emailError = document.querySelector('#email + .error-message');
    if (!email) { showError('email', 'Your Email is required.'); isValid = false; }
    else if (!isValidEmail(email)) { showError('email', 'Invalid Email. Email address should follow the format: user@domain.com'); isValid = false; }

    if (!message) { showError('message', 'Message is required.'); isValid = false; }

    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}



});

