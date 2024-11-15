import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./SignUp.css"; // External CSS for styling

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle email/password sign up
  const handleSignUp = async () => {
    setError("");
    setSuccessMessage("");
    const { email, password } = formData;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      setSuccessMessage("Verification email sent. Please check your inbox.");
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle Google sign up
  const handleGoogleSignUp = async () => {
    setError("");
    setSuccessMessage("");

    try {
      await signInWithPopup(auth, googleProvider);
      setSuccessMessage("Successfully signed up with Google.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
      />

      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleGoogleSignUp}>Sign Up with Google</button>

      {/* Sign In Button */}
      <p className="signin-link">
        Already have an account? <Link to="/">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
