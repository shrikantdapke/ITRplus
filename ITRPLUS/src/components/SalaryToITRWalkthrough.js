import React, { useState } from "react";

import "./SalaryToITRWalkthrough.css";

export default function SalaryToITRWalkthrough() {
  const [inputs, setInputs] = useState({
    basic: "",
    hra: "",
    bonus: "",
    other: "",
    rentPaid: "",
    metro: false,
    deductions80C: "",
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const calculate = () => {
    const basic = parseFloat(inputs.basic) || 0;
    const hra = parseFloat(inputs.hra) || 0;
    const bonus = parseFloat(inputs.bonus) || 0;
    const other = parseFloat(inputs.other) || 0;
    const rent = parseFloat(inputs.rentPaid) || 0;
    const isMetro = inputs.metro;
    const deduction80C = Math.min(parseFloat(inputs.deductions80C) || 0, 150000);

    const salary = basic + hra + bonus + other;

    const hraExempt = Math.min(
      hra,
      isMetro ? 0.5 * basic : 0.4 * basic,
      Math.max(rent - 0.1 * basic, 0)
    );

    const taxableSalary = salary - hraExempt - deduction80C;

    setResults({
      grossSalary: Math.round(salary),
      hraExempt: Math.round(hraExempt),
      deductions: deduction80C,
      taxableIncome: Math.round(taxableSalary),
    });
  };

  return (
    <div className="salary-walkthrough">
      <h2>💼 Salary to ITR Walkthrough</h2>

      <div className="form-grid">
        <div className="input-group">
          <label>Basic Salary (₹)</label>
          <input name="basic" value={inputs.basic} onChange={handleChange} placeholder="e.g. 500000" />
        </div>

        <div className="input-group">
          <label>HRA Received (₹)</label>
          <input name="hra" value={inputs.hra} onChange={handleChange} placeholder="e.g. 200000" />
        </div>

        <div className="input-group">
          <label>Bonus / Incentives (₹)</label>
          <input name="bonus" value={inputs.bonus} onChange={handleChange} placeholder="e.g. 100000" />
        </div>

        <div className="input-group">
          <label>Other Allowances (₹)</label>
          <input name="other" value={inputs.other} onChange={handleChange} placeholder="e.g. 50000" />
        </div>

        <div className="input-group">
          <label>Annual Rent Paid (₹)</label>
          <input name="rentPaid" value={inputs.rentPaid} onChange={handleChange} placeholder="e.g. 150000" />
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            name="metro"
            checked={inputs.metro}
            onChange={handleChange}
            id="metro"
          />
          <label htmlFor="metro">Metro City (like Mumbai, Delhi)</label>
        </div>

        <div className="input-group">
          <label>Deductions under 80C (₹)</label>
          <input name="deductions80C" value={inputs.deductions80C} onChange={handleChange} placeholder="Max 150000" />
        </div>
      </div>

      <button className="calculate-btn" onClick={calculate}>Calculate Taxable Income</button>

      {results && (
        <div className="results-box fade-in">
          <h3>🧾 ITR Summary</h3>
          <p><strong>Gross Salary:</strong> ₹{results.grossSalary.toLocaleString()}</p>
          <p><strong>HRA Exempted (Sec 10(13A)):</strong> ₹{results.hraExempt.toLocaleString()}</p>
          <p><strong>Deductions (Sec 80C):</strong> ₹{results.deductions.toLocaleString()}</p>
          <p><strong>Taxable Income:</strong> ₹{results.taxableIncome.toLocaleString()}</p>
          <hr />
          <p>✅ Use this in <strong>“Income from Salary”</strong> section of ITR filing.</p>
        </div>
      )}
    </div>
  );
}
