import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./ITREstimator.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ITR_Estimator = () => {
  const [income, setIncome] = useState("");
  const [deduction, setDeduction] = useState("");
  const [age, setAge] = useState("below60");
  const [regime, setRegime] = useState("old");
  const [taxDetails, setTaxDetails] = useState(null);

  const getOldRegimeTax = (taxable) => {
    const exemption = age === "below60" ? 250000 : age === "60to80" ? 300000 : 500000;
    let baseTax = 0;

    if (taxable <= exemption) return { baseTax: 0, rebate: 0, cess: 0, total: 0 };

    if (taxable <= 500000) baseTax = (taxable - exemption) * 0.05;
    else if (taxable <= 1000000) baseTax = 12500 + (taxable - 500000) * 0.2;
    else baseTax = 112500 + (taxable - 1000000) * 0.3;

    const rebate = taxable <= 500000 ? Math.min(baseTax, 12500) : 0;
    const taxAfterRebate = baseTax - rebate;
    const cess = taxAfterRebate * 0.04;
    const total = taxAfterRebate + cess;

    return {
      baseTax: Math.round(baseTax),
      rebate: Math.round(rebate),
      cess: Math.round(cess),
      total: Math.round(total),
    };
  };

  const getNewRegimeTax = (taxable) => {
    let baseTax = 0;

    if (taxable <= 300000) baseTax = 0;
    else if (taxable <= 600000) baseTax = (taxable - 300000) * 0.05;
    else if (taxable <= 900000) baseTax = 15000 + (taxable - 600000) * 0.10;
    else if (taxable <= 1200000) baseTax = 45000 + (taxable - 900000) * 0.15;
    else if (taxable <= 1500000) baseTax = 90000 + (taxable - 1200000) * 0.20;
    else baseTax = 150000 + (taxable - 1500000) * 0.30;

    const rebate = taxable <= 700000 ? Math.min(baseTax, 25000) : 0;
    const taxAfterRebate = baseTax - rebate;
    const cess = taxAfterRebate * 0.04;
    const total = taxAfterRebate + cess;

    return {
      baseTax: Math.round(baseTax),
      rebate: Math.round(rebate),
      cess: Math.round(cess),
      total: Math.round(total),
    };
  };

  const handleEstimate = () => {
    const annualIncome = parseFloat(income);
    const deductions = parseFloat(deduction) || 0;

    if (isNaN(annualIncome) || annualIncome <= 0) {
      alert("Please enter a valid annual income.");
      return;
    }

    const taxable =
      regime === "old" ? Math.max(annualIncome - deductions, 0) : annualIncome;

    const tax = regime === "old"
      ? getOldRegimeTax(taxable)
      : getNewRegimeTax(taxable);

    setTaxDetails({ ...tax, taxable });
  };

  const handleDownloadPDF = () => {
    if (!taxDetails) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Income Tax Estimation Report (FY 2025-26)", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Detail", "Amount"]],
      body: [
        ["Tax Regime", regime === "old" ? "Old Regime" : "New Regime"],
        ["Taxable Income", `₹${taxDetails.taxable.toLocaleString()}`],
        ["Base Tax", `₹${taxDetails.baseTax.toLocaleString()}`],
        ["Rebate (87A)", `₹${taxDetails.rebate.toLocaleString()}`],
        ["Cess (4%)", `₹${taxDetails.cess.toLocaleString()}`],
        ["Total Tax Payable", `₹${taxDetails.total.toLocaleString()}`],
      ],
    });

    doc.save("ITR_Estimation_Report.pdf");
  };

  return (
    <div className="itr-estimator">
      <h2>🧾 ITR Estimator (FY 2025-26)</h2>

      <label>Annual Income (₹):</label>
      <input
        type="number"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
        placeholder="e.g. 800000"
      />

      <label>Age Group:</label>
      <select value={age} onChange={(e) => setAge(e.target.value)}>
        <option value="below60">Below 60</option>
        <option value="60to80">60 to 80</option>
        <option value="above80">Above 80</option>
      </select>

      <label>80C Deductions (₹):</label>
      <input
        type="number"
        value={deduction}
        onChange={(e) => setDeduction(e.target.value)}
        placeholder="Max up to ₹1,50,000"
        disabled={regime === "new"}
      />

      <label>Tax Regime:</label>
      <select value={regime} onChange={(e) => setRegime(e.target.value)}>
        <option value="old">Old Regime</option>
        <option value="new">New Regime</option>
      </select>

      <button onClick={handleEstimate}>Estimate Tax</button>

      {taxDetails && (
        <>
          <div className="result">
            <p><strong>Taxable Income:</strong> ₹{taxDetails.taxable.toLocaleString()}</p>
            <p><strong>Base Tax:</strong> ₹{taxDetails.baseTax.toLocaleString()}</p>
            <p><strong>Rebate (87A):</strong> ₹{taxDetails.rebate.toLocaleString()}</p>
            <p><strong>Cess (4%):</strong> ₹{taxDetails.cess.toLocaleString()}</p>
            <p><strong>Total Tax Payable:</strong> ₹{taxDetails.total.toLocaleString()}</p>
          </div>

          <button onClick={handleDownloadPDF}>📥 Download PDF Report</button>

          <Bar
            data={{
              labels: ["Base Tax", "Rebate", "Cess", "Total"],
              datasets: [
                {
                  label: "Tax Breakdown (₹)",
                  data: [
                    taxDetails.baseTax,
                    taxDetails.rebate,
                    taxDetails.cess,
                    taxDetails.total,
                  ],
                  backgroundColor: ["#2196f3", "#f44336", "#4caf50", "#ff9800"],
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function (value) {
                      return "₹" + value.toLocaleString();
                    },
                  },
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
};

export default ITR_Estimator;
