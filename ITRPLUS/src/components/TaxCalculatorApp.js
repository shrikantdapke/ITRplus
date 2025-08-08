import React, { useState } from 'react';

function TaxCalculatorApp() {
  const [pan, setPan] = useState('');
  const [otherIncome, setOtherIncome] = useState('');
  const [homeLoanInterest, setHomeLoanInterest] = useState('');
  const [taxableIncome, setTaxableIncome] = useState(0);
  const [taxLiability, setTaxLiability] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  // Handle submission of tax details
  const handleSubmitDetails = (e) => {
    e.preventDefault();
    calculateTax(); // Calculate tax after submitting details
  };

  // Calculate tax based on the details entered
  const calculateTax = () => {
    const income = parseFloat(otherIncome) || 0;
    const loanInterest = parseFloat(homeLoanInterest) || 0;

    const totalIncome = income; // Gross income from all sources
    const deductions = loanInterest; // Home Loan Interest deduction

    const taxableIncome = totalIncome - deductions;
    let tax = 0;

    // Apply basic Indian income tax slabs (individual below 60)
    if (taxableIncome <= 250000) {
      tax = 0;
    } else if (taxableIncome <= 500000) {
      tax = (taxableIncome - 250000) * 0.05;
    } else if (taxableIncome <= 1000000) {
      tax = 250000 * 0.05 + (taxableIncome - 500000) * 0.2;
    } else {
      tax = 250000 * 0.05 + 500000 * 0.2 + (taxableIncome - 1000000) * 0.3;
    }

    setTaxableIncome(taxableIncome);
    setTaxLiability(tax);
  };

  // Get tax saving suggestions
  const getSuggestions = () => {
    const currentInvestment = parseFloat(homeLoanInterest) || 0;
    const additionalInvestmentRequired = 15000 - currentInvestment; // Example suggestion for Section 80C (ELSS)

    const newSuggestions = [
      `Invest ₹${additionalInvestmentRequired} more in ELSS to save ₹${additionalInvestmentRequired * 0.3} in taxes under Section 80C.`,
      `Consider increasing your health insurance premiums for self/parents to save more under Section 80D.`,
    ];

    setSuggestions(newSuggestions);
  };

  return (
    <div className="tax-calculator-app">
      <h1>Tax Calculator App</h1>
      
      {/* Tax Details Form */}
      <div className="tax-details-form">
        <h2>Input Additional Tax Details</h2>
        <form onSubmit={handleSubmitDetails}>
          <div>
            <label>PAN Number:</label>
            <input
              type="text"
              value={pan}
              onChange={(e) => setPan(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Other Income (e.g., interest, rental):</label>
            <input
              type="number"
              value={otherIncome}
              onChange={(e) => setOtherIncome(e.target.value)}
            />
          </div>
          <div>
            <label>Home Loan Interest Paid (Section 24(b)):</label>
            <input
              type="number"
              value={homeLoanInterest}
              onChange={(e) => setHomeLoanInterest(e.target.value)}
            />
          </div>
          <button type="submit">Submit Tax Details</button>
        </form>
      </div>

      {/* Tax Calculation */}
      {taxableIncome > 0 && (
        <div className="tax-calculator">
          <h2>Tax Calculator</h2>
          <p>Taxable Income: ₹{taxableIncome}</p>
          <p>Estimated Tax Liability: ₹{taxLiability}</p>
        </div>
      )}

      {/* Deduction Optimization Suggestions */}
      {taxableIncome > 0 && (
        <div className="tax-optimization-suggestions">
          <h2>Deduction Optimization Suggestions</h2>
          <button onClick={getSuggestions}>Get Suggestions</button>
          {suggestions.length > 0 && (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Tax Summary */}
      {taxableIncome > 0 && (
        <div className="tax-summary">
          <h2>Tax Summary</h2>
          <p>Total Income: ₹{taxableIncome + taxLiability}</p>
          <p>Total Deductions: ₹{homeLoanInterest}</p>
          <p>Taxable Income: ₹{taxableIncome}</p>
          <p>Estimated Tax Liability: ₹{taxLiability}</p>
          <p>Suggestions: Optimize investments under Section 80C and 80D for further tax savings.</p>
        </div>
      )}

      {/* Redirect to E-Filing Portal */}
      <div className="redirect-to-e-file">
        <h2>Proceed to E-Filing Portal</h2>
        <p>Click the button below to go to the official Income Tax Department e-filing portal:</p>
        <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer">
          <button>Proceed to E-Filing</button>
        </a>
      </div>
    </div>
  );
}

export default TaxCalculatorApp;

// CSS styles
const styles = `
  .tax-calculator-app {
    font-family: Arial, sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  h1 {
    text-align: center;
    color: #333;
    font-size: 2.5rem;
  }

  h2 {
    color: #333;
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .tax-details-form {
    margin-bottom: 2rem;
  }

  .tax-details-form label {
    display: block;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  .tax-details-form input {
    width: 100%;
    padding: 0.8rem;
    margin-bottom: 1.2rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  .tax-details-form button {
    padding: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.2rem;
    transition: background-color 0.3s;
  }

  .tax-details-form button:hover {
    background-color: #0056b3;
  }

  .tax-calculator {
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .tax-optimization-suggestions {
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin-top: 2rem;
  }

  .tax-optimization-suggestions button {
    padding: 1rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
  }

  .tax-optimization-suggestions button:hover {
    background-color: #218838;
  }

  .tax-summary {
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin-top: 2rem;
  }

  .tax-summary p {
    font-size: 1.2rem;
    color: #333;
  }

  .redirect-to-e-file {
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin-top: 2rem;
    text-align: center;
  }

  .redirect-to-e-file button {
    padding: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.2rem;
  }

  .redirect-to-e-file button:hover {
    background-color: #0056b3;
  }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
