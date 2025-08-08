import React, { useState } from "react";
import "./CompareTaxRegime.css";

export default function CompareTaxRegime() {
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState("");
  const [oldTax, setOldTax] = useState(null);
  const [newTax, setNewTax] = useState(null);

  const calculateTaxes = () => {
    const gross = parseFloat(income) || 0;
    const deduction = parseFloat(deductions) || 0;
    const taxableOld = Math.max(0, gross - deduction);
    const taxableNew = gross;

    const calcOld = calculateOldRegimeTax(taxableOld);
    const calcNew = calculateNewRegimeTax(taxableNew);

    setOldTax(calcOld);
    setNewTax(calcNew);
  };

  const calculateOldRegimeTax = (income) => {
    let tax = 0;
    if (income <= 250000) tax = 0;
    else if (income <= 500000) tax = (income - 250000) * 0.05;
    else if (income <= 1000000)
      tax = 12500 + (income - 500000) * 0.2;
    else tax = 112500 + (income - 1000000) * 0.3;

    if (income <= 500000) return 0; // Rebate u/s 87A
    return tax;
  };

  const calculateNewRegimeTax = (income) => {
    let tax = 0;
    const slabs = [
      { limit: 300000, rate: 0 },
      { limit: 600000, rate: 0.05 },
      { limit: 900000, rate: 0.10 },
      { limit: 1200000, rate: 0.15 },
      { limit: 1500000, rate: 0.20 },
      { limit: Infinity, rate: 0.30 },
    ];
    let prev = 0;
    for (const slab of slabs) {
      if (income > slab.limit) {
        tax += (slab.limit - prev) * slab.rate;
        prev = slab.limit;
      } else {
        tax += (income - prev) * slab.rate;
        break;
      }
    }
    return income <= 700000 ? 0 : tax; // Section 87A rebate for new regime
  };

  return (
    <div className="compare-tax-regime">
      <h2>📊 Compare Old vs New Tax Regime</h2>
      <div className="inputs">
        <label>
          Total Annual Income:
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Enter gross salary"
          />
        </label>
        <label>
          Deductions (80C, 80D, HRA etc):
          <input
            type="number"
            value={deductions}
            onChange={(e) => setDeductions(e.target.value)}
            placeholder="Enter deductions (for Old Regime)"
          />
        </label>
        <button onClick={calculateTaxes}>Compare</button>
      </div>

      {oldTax !== null && newTax !== null && (
        <div className="results">
          <div className="result-card">
            <h3>Old Regime</h3>
            <p>Tax Payable: ₹{oldTax.toLocaleString()}</p>
          </div>
          <div className="result-card">
            <h3>New Regime</h3>
            <p>Tax Payable: ₹{newTax.toLocaleString()}</p>
          </div>
          <div className="suggestion">
            <strong>
              You Save More With:{" "}
              {oldTax < newTax ? "Old Regime 🧾" : "New Regime 💼"}
            </strong>
          </div>
        </div>
      )}
    </div>
  );
}
