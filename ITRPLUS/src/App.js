import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Firebase
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./components/Home";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import PricingPlans from "./components/PricingPlans";
import Login from "./components/Login";
import Profile from "./components/Profile";

// Public Tools
import ChatBot from "./components/ChatBot";
import ITREstimator from "./components/ITREstimator";
import TaxSavingGuide from "./components/TaxSavingGuide";
import Form16Explainer from "./components/Form16Explainer";
import SalaryToITRWalkthrough from "./components/SalaryToITRWalkthrough";
import CompareTaxRegime from "./components/CompareTaxRegime"; // ⬅️ New Tool Component

// Protected Tools
import ProtectedRoute from "./components/ProtectedRoute";
import MoneyManagement from "./components/MoneyManagement";
import GoalTrackingService from "./components/GoalTrackingService";
import TaxCalculatorApp from "./components/TaxCalculatorApp";

// Services & Forms
import UserInfoForm from "./components/UserInfoForm";
import IncomeTaxFiling from "./components/IncomeTaxFiling";

// Optional: Error/Fallback Page
const NotFound = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h2>404 - Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
  </div>
);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home user={user} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/pricing-plans" element={<PricingPlans />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/chatbot" element={<ChatBot />} />

        {/* Public Tools */}
        <Route path="/tools/itr-estimator" element={<ITREstimator />} />
        <Route path="/tools/tax-saving-guide" element={<TaxSavingGuide />} />
        <Route path="/tools/form16-explainer" element={<Form16Explainer />} />
        <Route path="/tools/salary-to-itr" element={<SalaryToITRWalkthrough />} />
        <Route path="/tools/compare-tax-regime" element={<CompareTaxRegime />} /> {/* ✅ New Tool */}

        {/* Services & Forms */}
        <Route path="/user-info" element={<UserInfoForm />} />
        <Route path="/itr-filing" element={<UserInfoForm />} />
        <Route path="/services/income-tax-filing" element={<IncomeTaxFiling />} />

        {/* Protected Tools */}
        <Route
          path="/money-management"
          element={
            <ProtectedRoute user={user}>
              <MoneyManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/goal-tracking"
          element={
            <ProtectedRoute user={user}>
              <GoalTrackingService />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tax-calculator"
          element={
            <ProtectedRoute user={user}>
              <TaxCalculatorApp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Fallback for Unknown Routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
