"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaPhone, FaGoogle, FaFacebookF } from "react-icons/fa";
import "./SignUp.scss";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!agreeTerms) {
      alert("Please agree to the terms and conditions!");
      return;
    }
    console.log("Signup data:", formData);
    // Add your signup logic here
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        {/* Image Section */}
        <div className="signup-image-section">
          <div className="signup-image-content">
            <Image
              src="/assets/signup.jpg"
              alt="Newton Computers Sign Up"
              width={600}
              height={600}
              className="signup-image"
              priority
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="signup-form-section">
          <div className="signup-form-container">
            <div className="signup-header">
              <h1>Create Account</h1>
              <p>Join us today! Fill in your details to get started</p>
            </div>

            <form className="signup-form" onSubmit={handleSubmit}>
              {/* First Row - Full Name & Email */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <div className="input-wrapper">
                    <FaEnvelope className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Second Row - Phone & Password */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <div className="input-wrapper">
                    <FaPhone className="input-icon" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter your phone"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Create password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Third Row - Confirm Password (Full Width) */}
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="form-group">
                <label className="checkbox-label terms-label">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="checkbox-input"
                    required
                  />
                  <span className="checkmark"></span>
                  I agree to the{" "}
                  <Link href="/terms" className="terms-link">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="terms-link">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button type="submit" className="signup-submit-btn">
                Create Account
              </button>

              {/* Divider */}
              <div className="signup-divider">
                <span>Or sign up with</span>
              </div>

              {/* Social Signup */}
              <div className="social-login">
                <button type="button" className="social-btn google-btn">
                  <FaGoogle className="social-icon" />
                  Continue with Google
                </button>
                
                <button type="button" className="social-btn facebook-btn">
                  <FaFacebookF className="social-icon" />
                  Continue with Facebook
                </button>
              </div>

              {/* Login Link */}
              <div className="signup-footer">
                <p>
                  Already have an account?{" "}
                  <Link href="/component/Login" className="auth-link">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}