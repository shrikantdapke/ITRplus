import React, { useState } from "react";
import "./TaxSavingGuide.css";

const investments = [
  {
    name: "ELSS Mutual Funds",
    section: "80C",
    lockIn: "3 years",
    returns: "10–14% (market)",
    risk: "High",
    notes: "Market-linked; tax-free gains up to ₹1L",
  },
  {
    name: "Public Provident Fund (PPF)",
    section: "80C",
    lockIn: "15 years",
    returns: "7.1% (fixed)",
    risk: "Low",
    notes: "Tax-free interest; govt-backed",
  },
  {
    name: "National Saving Certificate (NSC)",
    section: "80C",
    lockIn: "5 years",
    returns: "7.7% (fixed)",
    risk: "Low",
    notes: "Interest taxable; safe investment",
  },
  {
    name: "5-Year Tax-Saver FD",
    section: "80C",
    lockIn: "5 years",
    returns: "6–7%",
    risk: "Low-Medium",
    notes: "Interest taxable on maturity",
  },
  {
    name: "Life Insurance Premium",
    section: "80C",
    lockIn: "Policy Term",
    returns: "3–6%",
    risk: "Low",
    notes: "Covers term & traditional plans",
  },
  {
    name: "Sukanya Samriddhi Yojana",
    section: "80C",
    lockIn: "21 years",
    returns: "8.2%",
    risk: "Low",
    notes: "Only for girl child; tax-free",
  },
  {
    name: "National Pension Scheme (NPS)",
    section: "80C + 80CCD(1B)",
    lockIn: "Till age 60",
    returns: "8–10%",
    risk: "Medium",
    notes: "Extra ₹50k deduction under 80CCD(1B)",
  },
  {
    name: "Health Insurance Premium",
    section: "80D",
    lockIn: "Yearly",
    returns: "—",
    risk: "—",
    notes: "₹25k–₹50k deduction based on age",
  },
];

export default function TaxSavingGuide() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInvestments = investments.filter((inv) =>
    inv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSectionColor = (section) => {
    if (section.includes("80C")) return "tag-80c";
    if (section.includes("80D")) return "tag-80d";
    return "tag-other";
  };

  return (
    <div className="tax-guide">
      <h2>💸 Tax-Saving Investment Guide (80C, 80D)</h2>

      <input
        type="text"
        className="search-input"
        placeholder="🔍 Search investment..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="table-container">
        <table className="investment-table">
          <thead>
            <tr>
              <th>Investment</th>
              <th>Section</th>
              <th>Lock-in</th>
              <th>Returns</th>
              <th>Risk</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvestments.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>
                  <span className={`tag ${getSectionColor(item.section)}`}>
                    {item.section}
                  </span>
                </td>
                <td>{item.lockIn}</td>
                <td>{item.returns}</td>
                <td>{item.risk}</td>
                <td>{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
