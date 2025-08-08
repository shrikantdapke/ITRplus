import React, { useState } from "react";
import { database } from "../firebase";
import { ref, push } from "firebase/database";
import "./UserInfoForm.css";

function UserInfoForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    residentialStatus: "",
    monthlySalary: "",
    otherIncome: "",
    rentPaid: "",
    homeLoanEMI: "",
    otherLoanEMIs: "",
    ppf: "",
    elss: "",
    healthInsurance: "",
    shortTermGoals: "",
    longTermGoals: "",
    savePercent: "",
    investPercent: "",
    leisurePercent: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      monthlySalary: formData.monthlySalary || "0",
      rentPaid: formData.rentPaid || "0",
      homeLoanEMI: formData.homeLoanEMI || "0",
      otherLoanEMIs: formData.otherLoanEMIs || "0",
      shortTermGoals: formData.shortTermGoals || "0",
      longTermGoals: formData.longTermGoals || "0",
    };

    push(ref(database, "userFinancialInfo"), updatedData)
      .then(() => {
        alert("Information saved successfully!");
        setFormData({
          fullName: "",
          dob: "",
          residentialStatus: "",
          monthlySalary: "",
          otherIncome: "",
          rentPaid: "",
          homeLoanEMI: "",
          otherLoanEMIs: "",
          ppf: "",
          elss: "",
          healthInsurance: "",
          shortTermGoals: "",
          longTermGoals: "",
          savePercent: "",
          investPercent: "",
          leisurePercent: "",
        });
      })
      .catch((error) => {
        console.error("Error storing data:", error);
        alert("Failed to save data.");
      });
  };

  return (
    <section className="user-info-form">
      <h2>Personal & Financial Information</h2>
      <form onSubmit={handleSubmit} className="modern-form">
        <h4>Personal Details <span>*</span></h4>
        <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        <input name="residentialStatus" placeholder="Residential Status (e.g., Resident, NRI)" value={formData.residentialStatus} onChange={handleChange} required />

        <h4>Income Details <span>*</span></h4>
        <input name="monthlySalary" type="number" placeholder="Monthly Salary (enter 0 if none)" value={formData.monthlySalary} onChange={handleChange} required />
        <input name="otherIncome" type="number" placeholder="Other Income (Interest, Rental, etc.)" value={formData.otherIncome} onChange={handleChange} />

        <h4>Fixed Expenses <span>*</span></h4>
        <input name="rentPaid" type="number" placeholder="Rent Paid (enter 0 if none)" value={formData.rentPaid} onChange={handleChange} required />
        <input name="homeLoanEMI" type="number" placeholder="Home Loan EMI (enter 0 if none)" value={formData.homeLoanEMI} onChange={handleChange} required />
        <input name="otherLoanEMIs" type="number" placeholder="Other Loan EMIs (enter 0 if none)" value={formData.otherLoanEMIs} onChange={handleChange} required />

        <h4>Tax-Saving Investments</h4>
        <input name="ppf" type="number" placeholder="PPF Contributions" value={formData.ppf} onChange={handleChange} />
        <input name="elss" type="number" placeholder="ELSS Investments" value={formData.elss} onChange={handleChange} />
        <input name="healthInsurance" type="number" placeholder="Health Insurance Premiums" value={formData.healthInsurance} onChange={handleChange} />

        <h4>Financial Goals <span>*</span></h4>
        <input name="shortTermGoals" type="number" placeholder="Short-Term Goals (Amount in ₹)" value={formData.shortTermGoals} onChange={handleChange} required />
        <input name="longTermGoals" type="number" placeholder="Long-Term Goals (Amount in ₹)" value={formData.longTermGoals} onChange={handleChange} required />

        <h4>Disposable Income Allocation (%)</h4>
        <input name="savePercent" type="number" placeholder="Saving %" value={formData.savePercent} onChange={handleChange} />
        <input name="investPercent" type="number" placeholder="Investing %" value={formData.investPercent} onChange={handleChange} />
        <input name="leisurePercent" type="number" placeholder="Leisure %" value={formData.leisurePercent} onChange={handleChange} />

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </section>
  );
}

export default UserInfoForm;