//js
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
function redirectToScanner() {
    window.location.href = "scanner.html";
}
// Welcome Popup Function
function welcomePopup() {
    alert("Welcome to The Organic Route! Start your journey towards a chemical-free lifestyle.");
}

// Smooth Scroll Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Dummy Function to Check JavaScript is Active
function checkJavaScriptStatus() {
    console.log("JavaScript is successfully loaded and active.");
}

// Change Background Color (without affecting layout)
function changeBackgroundColor() {
    document.body.style.backgroundColor = "#f4f4f4"; // Subtle gray background
}

// Mouse Hover Event to Test JavaScript Interaction
function addHoverEffect() {
    const buttons = document.querySelectorAll('.discover-btn, .start-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.1)';
            button.style.transition = 'transform 0.3s ease';
        });
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
        });
    });
}

// Call functions on page load
window.onload = function() {
    welcomePopup();
    checkJavaScriptStatus();
    changeBackgroundColor();
    addHoverEffect();
    autoScroll();
};