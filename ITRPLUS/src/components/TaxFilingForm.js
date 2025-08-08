import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database"; // Import required functions
import "./TaxFilingForm.css";

function TaxFilingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    income: "",
    taxYear: "",
    aadharCard: null,
    panCard: null,
    salarySlip: null,
    taxProof: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get the database reference
    const db = getDatabase();
    const formRef = ref(db, "taxFilings/" + new Date().getTime()); // Using timestamp as a unique ID

    // Store the form data in Firebase Realtime Database
    set(formRef, {
      name: formData.name,
      email: formData.email,
      income: formData.income,
      taxYear: formData.taxYear,
      aadharCard: formData.aadharCard ? formData.aadharCard.name : null, // Store file name (you can also store file URL later)
      panCard: formData.panCard ? formData.panCard.name : null,
      salarySlip: formData.salarySlip ? formData.salarySlip.name : null,
      taxProof: formData.taxProof ? formData.taxProof.name : null,
    }).then(() => {
      console.log("Form data stored successfully in Firebase.");
      alert("Form submitted and data stored successfully!");
    }).catch((error) => {
      console.error("Error storing form data:", error);
      alert("Error in form submission. Please try again!");
    });
  };

  return (
    <div className="form-container">
      <h1>Tax Filing Form</h1>
      <form className="tax-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="income">Annual Income (₹)</label>
          <input
            type="number"
            id="income"
            name="income"
            placeholder="Enter your annual income"
            value={formData.income}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="taxYear">Tax Year</label>
          <select
            id="taxYear"
            name="taxYear"
            value={formData.taxYear}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select tax year
            </option>
            <option value="2022-2023">2022-2023</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="aadharCard">Upload Aadhaar Card</label>
          <input
            type="file"
            id="aadharCard"
            name="aadharCard"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="panCard">Upload PAN Card</label>
          <input
            type="file"
            id="panCard"
            name="panCard"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="salarySlip">Upload Salary Slip</label>
          <input
            type="file"
            id="salarySlip"
            name="salarySlip"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="taxProof">Upload Tax-Saving Proofs (if any)</label>
          <input
            type="file"
            id="taxProof"
            name="taxProof"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default TaxFilingForm;
