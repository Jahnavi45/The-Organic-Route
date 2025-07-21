// login.js

const LOGIN_API = "http://localhost:5000/api/auth/login";

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }

    try {
        const res = await fetch(LOGIN_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            alert("Login successful!");
            // Save token and user details in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            // Redirect to services page
            window.location.href = "services.html";
        } else {
            alert(data.message || "Login failed. Check your credentials.");
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("Server error. Please try again.");
    }
});
