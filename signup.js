// signup.js

const API_URL = "http://localhost:5000/api/auth/signup";

const form = document.getElementById("signup-form");
const btn = document.getElementById("signupBtn");
const statusLine = document.getElementById("signupStatus");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusLine.textContent = "";
    
    const firstName = document.getElementById("firstName").value.trim();
    const lastName  = document.getElementById("lastName").value.trim();
    const email     = document.getElementById("email").value.trim();
    const phone     = document.getElementById("phone").value.trim();
    const dob       = document.getElementById("dob").value;
    const age       = document.getElementById("age").value;
    const password  = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const payload = { firstName, lastName, email, phone, dob, age, password };

    // Disable button during request
    btn.disabled = true;
    const originalText = btn.textContent;
    btn.textContent = "Processing...";
    statusLine.style.color = "#ddd";
    statusLine.textContent = "Creating your account...";

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok) {
            statusLine.style.color = "#4CAF50";
            statusLine.textContent = "Signup successful! Redirecting...";
            // Optional: small delay
            setTimeout(() => {
                window.location.href = "services.html";
            }, 800);
        } else {
            statusLine.style.color = "#ff4444";
            statusLine.textContent = data.message || "Signup failed.";
            alert("Signup failed: " + (data.message || "Unknown error"));
        }
    } catch (err) {
        console.error("Signup error:", err);
        statusLine.style.color = "#ff4444";
        statusLine.textContent = "Server error. Try again.";
        alert("Server error. Please try again.");
    } finally {
        btn.disabled = false;
        btn.textContent = originalText;
    }
});
