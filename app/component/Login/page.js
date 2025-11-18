"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaGoogle, FaFacebookF } from "react-icons/fa";
import "./Login.scss";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
    // Add your login logic here
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Image Section */}
        <div className="login-image-section">
          <div className="login-image-content">
            <Image
              src="/assets/login.jpg"
              alt="Newton Computers Login"
              width={600}
              height={600}
              className="login-image"
              priority
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="login-form-section">
          <div className="login-form-container">
            <div className="login-header">
              <h1>Welcome Back</h1>
              <p>Sign in to your Newton Computers account</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              {/* Email Field */}
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

              {/* Password Field */}
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
                    placeholder="Enter your password"
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

              {/* Remember Me & Forgot Password */}
              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="checkbox-input"
                  />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                
                <Link href="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button type="submit" className="login-submit-btn">
                Sign In
              </button>

              {/* Divider */}
              <div className="login-divider">
                <span>Or continue with</span>
              </div>

              {/* Social Login */}
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

              {/* Sign Up Link */}
              <div className="login-footer">
                <p>
                  Don't have an account?{" "}
                  <Link href="/component/SignUp" className="auth-link">
                    Sign up here
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