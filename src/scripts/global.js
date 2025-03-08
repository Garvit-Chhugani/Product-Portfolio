// global.js
document.addEventListener('DOMContentLoaded', async function() {
    // Load header
    const headerResponse = await fetch('/src/components/header.html');
    const headerText = await headerResponse.text();
    document.body.insertAdjacentHTML('afterbegin', headerText);

    // Load footer
    const footerResponse = await fetch('/src/components/footer.html');
    const footerText = await footerResponse.text();
    document.body.insertAdjacentHTML('beforeend', footerText);

    // Initialize header/footer functionality
    initializeNavigation();
});

function initializeNavigation() {
    // Your existing navigation JS code here

    // ... rest of your navigation code
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
    
}