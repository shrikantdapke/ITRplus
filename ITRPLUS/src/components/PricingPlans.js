import React from "react";
import "./PricingPlans.css";

function PricingPlans() {
  const razorpayKey = "rzp_test_f5otlAGTrPTbKS"; // Test Key ID directly included

  // Dynamically load Razorpay SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const openRazorpay = async (amount, plan) => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("⚠️ Razorpay SDK failed to load. Check your internet or browser settings.");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: amount * 100,
      currency: "INR",
      name: "ITRPLUS",
      description: `${plan} Subscription`,
      image: "https://yourdomain.com/logo.png", // Replace with your brand logo
      handler: function (response) {
        alert(`✅ Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
        // Optional: send response to backend for verification
      },
      prefill: {
        name: "Customer",
        email: "customer@example.com",
        contact: "9999999999",
      },
      notes: {
        plan,
      },
      theme: {
        color: "#007bff",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <section id="pricing-plans" className="pricing-plans">
      <div className="pricing-container">
        <h2>Pricing Plans</h2>
        <p className="description">
          Select the plan that best suits your needs. All plans come with no hidden fees,
          regular support, and secure filing.
        </p>

        <div className="plans-wrapper">
          {/* Basic Plan */}
          <div className="plan-card">
            <h3>Basic Plan</h3>
            <p className="plan-subtitle">Perfect for Individuals</p>
            <ul>
              <li>Tax filing</li>
              <li>Basic documentation review</li>
              <li>Email support</li>
            </ul>
            <p className="price">₹999/year</p>
            <button className="cta-button" onClick={() => openRazorpay(999, "Basic")}>
              Choose Basic Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="plan-card highlight">
            <h3>Premium Plan</h3>
            <p className="plan-subtitle">Ideal for Small Businesses</p>
            <ul>
              <li>Advanced filing</li>
              <li>Financial analysis</li>
              <li>Priority support</li>
            </ul>
            <p className="price">₹4999/year</p>
            <button className="cta-button" onClick={() => openRazorpay(4999, "Premium")}>
              Choose Premium Plan
            </button>
          </div>

          {/* Corporate Plan */}
          <div className="plan-card">
            <h3>Corporate Plan</h3>
            <p className="plan-subtitle">Built for Enterprises</p>
            <ul>
              <li>Custom strategies</li>
              <li>Bulk filing</li>
              <li>Dedicated account manager</li>
            </ul>
            <p className="price">₹19,999/year</p>
            <button className="cta-button" onClick={() => openRazorpay(19999, "Corporate")}>
              Choose Corporate Plan
            </button>
          </div>
        </div>
      </div>

      <div className="cta">
        <p>Start your journey to seamless tax management today.</p>
        <button className="cta-button large" onClick={() => openRazorpay(999, "Basic")}>
          Get Started Now
        </button>
      </div>
    </section>
  );
}

export default PricingPlans;
