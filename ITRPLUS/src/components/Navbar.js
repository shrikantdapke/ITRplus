import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user, onLogout }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const nowMobile = window.innerWidth <= 768;
      setIsMobile(nowMobile);
      if (!nowMobile) setToolsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setToolsOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setToolsOpen(false);
  };

  const toggleToolsDropdown = () => {
    if (isMobile) setToolsOpen(!toolsOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={closeMenu}>ITRPLUS</Link>
      </div>

      <button className="navbar-toggle" onClick={toggleMenu}>
        <div className={`navbar-icon ${menuOpen ? "active" : ""}`}>
          <div></div><div></div><div></div>
        </div>
      </button>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <ul>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
         

          {/* Tools Dropdown */}
          <li
            className={`dropdown ${toolsOpen ? "open" : ""}`}
            onClick={toggleToolsDropdown}
            onMouseEnter={() => !isMobile && setToolsOpen(true)}
            onMouseLeave={() => !isMobile && setToolsOpen(false)}
          >
            <span className="dropdown-toggle">Tools ▾</span>
            <ul className={`dropdown-menu ${toolsOpen ? "show" : ""}`}>
              <li><Link to="/tools/itr-estimator" onClick={closeMenu}>ITR Estimator</Link></li>
              <li><Link to="/tools/tax-saving-guide" onClick={closeMenu}>Tax Saving Guide</Link></li>
               <li><Link to="/money-management" onClick={closeMenu}>Money Tools</Link></li>
              <li><Link to="/tools/form16-explainer" onClick={closeMenu}>Form-16 Explainer</Link></li>
              <li><Link to="/tools/salary-to-itr" onClick={closeMenu}>Salary to ITR</Link></li>
              <li><Link to="/tools/compare-tax-regime" onClick={closeMenu}>Compare Tax Regime</Link></li>
             
            </ul>
          </li>
           <li><Link to="/pricing-plans" onClick={closeMenu}>Pricing</Link></li>
          <li><Link to="/tax-calculator" onClick={closeMenu}>Tax Calculator</Link></li>

          
          <li><Link to="/contact-us" onClick={closeMenu}>Contact</Link></li>

          {user ? (
            <>
              <li><Link to="/profile" onClick={closeMenu}>Profile</Link></li>
              <li>
                <button className="navbar-logout" onClick={() => { onLogout(); closeMenu(); }}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="navbar-login" onClick={closeMenu}>
                Login / Signup
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;