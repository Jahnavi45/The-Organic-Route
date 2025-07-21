const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "devSecretKey";
const IS_DEV = process.env.NODE_ENV !== "production";

/* -------------------------------------------
   Utility: Parse DOB in different formats
--------------------------------------------*/
function parseDOB(input) {
  if (!input) return null;

  // Already a Date object?
  if (input instanceof Date) return input;

  // If value looks like "2004-10-10"
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    return new Date(input);
  }

  // If value looks like "10-10-2004" or "10/10/2004"
  if (/^\d{2}[-/]\d{2}[-/]\d{4}$/.test(input)) {
    const parts = input.includes("-") ? input.split("-") : input.split("/");
    const [dd, mm, yyyy] = parts;
    return new Date(`${yyyy}-${mm}-${dd}`);
  }

  // If value looks like "10 Oct 2004"
  const attempt = new Date(input);
  if (!isNaN(attempt.getTime())) return attempt;

  return null;
}

/* -------------------------------------------
   Test Route
--------------------------------------------*/
router.get("/ping", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

/* -------------------------------------------
   SIGNUP
--------------------------------------------*/
router.post("/signup", async (req, res) => {
  console.log("---- /signup HIT ----");
  console.log("Raw Body:", req.body);

  try {
    let {
      firstName,
      lastName,
      email,
      phone,
      dob,
      age,
      password
    } = req.body;

    // Basic presence validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !dob ||
      !password
    ) {
      console.log("Validation fail: Missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    // Normalize + trim
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim().toLowerCase();
    phone = phone.trim();

    // Parse DOB
    const parsedDOB = parseDOB(dob);
    if (!parsedDOB || isNaN(parsedDOB.getTime())) {
      console.log("Invalid DOB format received:", dob);
      return res.status(400).json({ message: "Invalid date of birth format" });
    }

    // Age fallback calculate if not valid number
    if (!age || isNaN(Number(age))) {
      const today = new Date();
      let calcAge = today.getFullYear() - parsedDOB.getFullYear();
      const m = today.getMonth() - parsedDOB.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < parsedDOB.getDate())) {
        calcAge--;
      }
      age = calcAge;
      console.log("Auto-calculated age:", age);
    }

    // Check existing
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("Email already exists:", email);
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      dob: parsedDOB,
      age: Number(age),
      password: hashed
    });

    console.log("User created:", user._id);

    return res
      .status(201)
      .json({ message: "Signup successful", userId: user._id });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return res
      .status(500)
      .json({ message: "Server Error", error: IS_DEV ? err.message : undefined });
  }
});

/* -------------------------------------------
   LOGIN
--------------------------------------------*/
router.post("/login", async (req, res) => {
  console.log("---- /login HIT ----");
  console.log("Raw Body:", req.body);

  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email & password required" });
    }

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("Password mismatch for:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1d"
    });

    console.log("Login success:", user._id);

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res
      .status(500)
      .json({ message: "Server Error", error: IS_DEV ? err.message : undefined });
  }
});

module.exports = router;
