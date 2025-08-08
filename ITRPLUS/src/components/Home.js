import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaClipboardList,
  FaCheckCircle,
  FaArrowRight,
  FaComments,
  FaTimes,
} from "react-icons/fa";
import Services from "./Services";
import ContactUs from "./ContactUs";
import PricingPlans from "./PricingPlans";
import ChatBot from "./ChatBot"; // ✅ Include ChatBot component
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);

  const handleGetStarted = () => navigate("/user-info");
  const handlePricing = () => navigate("/pricing-plans");

  return (
    <>
      {/* Hero/Login Section */}
      <div className="home-wrapper">
        <div className="left-pane">
          <h1>
            Simplify Your Tax Filing with <span className="brand">ITRPLUS</span>
          </h1>
          <p className="description">
            Expert tax services at your fingertips. Fast, accurate, and hassle-free.
          </p>
          <div className="hero-buttons">
            <button className="get-started-btn" onClick={handleGetStarted}>
              Get Started
            </button>
            <button className="get-started-btn secondary-btn" onClick={handlePricing}>
              View Pricing
            </button>
          </div>
        </div>

        <div className="right-pane">
          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <h2>Login to Your Account</h2>

            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Enter your username" required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />

            <button type="submit" className="sign-in-btn">
              Sign In
            </button>

            <p className="signup-redirect">
              Don't have an account?
              <span className="signup-link" onClick={() => navigate("/login")}>
                {" "}Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* Services Section */}
      <Services />

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="how-title">How It Works</h2>
        <div className="how-steps">
          <div className="step">
            <div className="step-icon"><FaUserPlus /></div>
            <h3>1. Sign Up</h3>
            <p>Create your account and log in to our secure platform.</p>
          </div>

          <div className="arrow-icon"><FaArrowRight /></div>

          <div className="step">
            <div className="step-icon"><FaClipboardList /></div>
            <h3>2. Choose Service</h3>
            <p>Select the tax service you need from our comprehensive offerings.</p>
          </div>

          <div className="arrow-icon"><FaArrowRight /></div>

          <div className="step">
            <div className="step-icon"><FaCheckCircle /></div>
            <h3>3. Get It Done</h3>
            <p>Our experts handle your tax needs efficiently and accurately.</p>
          </div>
        </div>

        <button className="get-started-btn how-btn" onClick={handleGetStarted}>
          Get Started Now
        </button>
      </section>

      {/* Pricing + Contact */}
      <PricingPlans />
      <ContactUs />

      {/* 🧠 ChatBot Floating Icon */}
      <div className="chatbot-float">
        {showChat ? (
          <div className="chatbot-popup">
            <div className="chatbot-header">
              
              <FaTimes onClick={() => setShowChat(false)} className="close-icon" />
            </div>
            <ChatBot />
          </div>
        ) : (
          <button className="chatbot-button" onClick={() => setShowChat(true)}>
            <FaComments size={20} />
          </button>
        )}
      </div>
    </>
  );
}

export default Home;
