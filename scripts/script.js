// JavaScript Code (paste this in the JS panel of CodePen)
// Select elements for menu toggle and dropdown functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-item');

// Toggle navigation menu on small screens
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Handle dropdown functionality for nav items on small screens
if (navItems.length > 0) {
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                const dropdown = item.querySelector('.dropdown');
                if (dropdown) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            }
        });
    });
}



// Fade-in animation for cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});

// List of greetings in the 21 official languages of India
const greetings = [
    "नमस्ते", // Hindi
    "নমস্কার", // Bengali
    "నమస్తే", // Telugu
    "नमस्कार", // Marathi
    "வணக்கம்", // Tamil
    "آداب", // Urdu
    "નમસ્તે", // Gujarati
    "നമസ്കാരം", // Malayalam
    "ನಮಸ್ಕಾರ", // Kannada
    "ନମସ୍କାର", // Odia
    "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", // Punjabi
    "নমস্কাৰ", // Assamese
    "प्रणाम", // Maithili
    "ᱥᱟᱱᱛᱟᱲ", // Santali
    "آداب", // Kashmiri
    "नमस्कार", // Konkani
    "नमस्ते", // Dogri
    "ꯊꯥꯛꯄꯥ", // Manipuri
    "वंदे", // Bodo
    "नमः", // Sanskrit
    "نمستے", // Sindhi
];

const greetingText = document.querySelector(".greeting-text");
let index = 0;

// Function to update the greeting text
function updateGreeting() {
    greetingText.textContent = greetings[index];
    index = (index + 1) % greetings.length; // Loop through the list
}

// Update the greeting every 1 second
setInterval(updateGreeting, 1500);

// Initial call to display the first greeting
updateGreeting();