// auth.js

const API_URL = "http://localhost:5000/api/auth";

// Signup Handler
async function handleSignup(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const dob = document.getElementById("dob").value;
    const age = document.getElementById("age").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const userData = { firstName, lastName, email, phone, dob, age, password };

    try {
        const res = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            alert("Signup failed: " + (errorData.message || "Server error"));
            return;
        }

        const data = await res.json();
        alert("Signup successful! Please login.");
        window.location.href = "login.html";
    } catch (error) {
        console.error("Error:", error);
        alert("Server error! Please try again later.");
    }
}

// Add Event Listener
document.getElementById("signup-form").addEventListener("submit", handleSignup);
