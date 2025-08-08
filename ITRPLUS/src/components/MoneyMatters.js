import React from "react";
import "./MoneyMatters.css";
import { useNavigate } from "react-router-dom";

function MoneyMatters() {
  const navigate = useNavigate();

  const resources = [
    {
      title: "What is Personal Finance? – Investopedia",
      description:
        "A detailed guide covering personal finance fundamentals, from budgeting to retirement planning.",
      url: "https://www.investopedia.com/terms/p/personalfinance.asp",
    },
    {
      title: "ET Money – Personal Finance Learning",
      description:
        "Curated articles and tips for improving your financial habits and making smarter investment choices.",
      url: "https://www.etmoney.com/learn/personal-finance/",
    },
    {
      title: "Harvard Business Review – Manage Finances",
      description:
        "5 actionable strategies from HBR on managing your finances effectively and responsibly.",
      url: "https://hbr.org/2022/11/5-ways-to-manage-your-personal-finances",
    },
    {
      title: "Spotify: Paisa Vaisa Podcast",
      description:
        "Weekly podcast on personal finance, investing, and money management for Indian audiences.",
      url: "https://open.spotify.com/show/0Kh3F03ttLAfmAxH3f1f72?si=aca3f47e63014ba8",
    },
    {
      title: "Spotify: Millennial Money Podcast",
      description:
        "Explore real-life stories and expert interviews on how to manage, grow, and enjoy your money.",
      url: "https://open.spotify.com/show/1xFeOrlfwM2JMNZz8gGTkH?si=0d75959e41394271",
    },
  ];

  return (
    <div className="money-matters">
      <header className="money-header">
        <h1>💸 Money Matters: Listen, Learn, Grow</h1>
        <p>
          Master your money with the best resources, expert tips, and curated
          podcasts — all in one place.
        </p>
        <button className="explore-btn" onClick={() => navigate("/services")}>
          Explore Services
        </button>
      </header>

      <section className="resources-section">
        <h2>📚 Financial Resources & Podcasts</h2>
        <div className="resources-grid">
          {resources.map((item, index) => (
            <div className="resource-card" key={index}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link"
              >
                Visit Resource <span className="arrow-icon">↗</span>
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MoneyMatters;
