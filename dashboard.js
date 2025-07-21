// Show Welcome Message
document.addEventListener("DOMContentLoaded", () => {
    const firstName = localStorage.getItem("firstName") || "User";
    document.getElementById("welcome-message").innerText = `Welcome, ${firstName}!`;

    // Show Last Scanned Product
    const lastScan = localStorage.getItem("lastScan") || "No scan history available.";
    document.getElementById("last-scan").innerText = lastScan;
});

// Go to Scanner
function goToScanner() {
    window.location.href = "scanner.html";
}

// Logout
function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}
