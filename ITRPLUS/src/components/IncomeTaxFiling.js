import React from "react";
import "./IncomeTaxFiling.css";

function IncomeTaxFiling() {
  return (
    <div className="income-tax-page">
      <div className="container">
        <h1>Income Tax Filing</h1>
        <p>
          We simplify income tax filing for individuals, freelancers, and businesses.
          Our experts ensure accuracy, compliance, and maximum refunds.
        </p>

        <ul className="features">
          <li>✔️ End-to-end e-Filing assistance</li>
          <li>✔️ Expert document review</li>
          <li>✔️ Advice on deductions and tax-saving</li>
          <li>✔️ ITR filing status tracking</li>
        </ul>

        <button className="cta-button">Start Filing</button>
      </div>
    </div>
  );
}

export default IncomeTaxFiling;
