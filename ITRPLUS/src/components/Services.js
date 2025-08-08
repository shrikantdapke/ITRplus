import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalculator,
  FaBriefcase,
  FaClipboardList,
  FaFolderOpen,
  FaCreditCard,
  FaUniversity,
} from "react-icons/fa";
import "./Services.css";

function Services() {
  const navigate = useNavigate();

  const services = [
    {
      icon: <FaCalculator size={32} color="#007bff" />,
      title: "Income Tax Filing",
      description: "Hassle-free income tax return filing for individuals and businesses.",
      link: "/services/income-tax-filing", // ✅ Navigation path
    },
    {
      icon: <FaBriefcase size={32} color="#007bff" />,
      title: "GST Registration & Filing",
      description: "Complete GST solutions including registration and return filing.",
    },
    {
      icon: <FaClipboardList size={32} color="#007bff" />,
      title: "Tax Planning",
      description: "Expert advice on tax-saving strategies and investment planning.",
    },
    {
      icon: <FaFolderOpen size={32} color="#007bff" />,
      title: "Business Registration",
      description: "Assistance in company incorporation and business registration.",
    },
    {
      icon: <FaCreditCard size={32} color="#007bff" />,
      title: "TDS Services",
      description: "Comprehensive TDS return filing and compliance services.",
    },
    {
      icon: <FaUniversity size={32} color="#007bff" />,
      title: "Accounting Services",
      description: "Professional bookkeeping and financial statement preparation.",
    },
  ];

  return (
    <section className="tax-services" id="services">
      <h2 className="section-title">Our Tax Services</h2>
      <div className="services-grid">
        {services.map((service, idx) => (
          <div
            className="service-card"
            key={idx}
            onClick={() => {
              if (service.link) navigate(service.link);
            }}
            style={{ cursor: service.link ? "pointer" : "default" }}
          >
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
