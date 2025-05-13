import React from "react";
import Documentation from "../../components/documentation/documentation";
import ApiKeyBox from "../../components/ApiKeyDisplay/apikeybox";
import "./home.css";
import { Link } from "react-router-dom";

const HomePage = ({ apiKey }) => {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1 className="home-title">
          Free Indian Bank Data API
        </h1>
        <p className="home-description">
          Get IFSC codes, bank names, and branch details for Indian banks.<br />
          <span className="home-highlight">
            Fast. Reliable. 100% Free.
          </span>
        </p>
      </header>

      {!apiKey ? (
        <>
          <div className="home-buttons">
            <Link to="/subscribe" className="home-button subscribe-button">
              Subscribe
            </Link>
          </div>
          <div className="home-message-row">
            <span className="home-message-text">
              Already subscribed?
            </span>
            <Link to="/search-apiKey" className="home-link search-link">
              Search your API Key
            </Link>
          </div>
          <div className="home-message-row">
          <span className="home-message-text">
              Api-key for recruiters/testers : "MJpXU0B4jVEyyPVVB55cfLp8sRAc-psW3UIGnVuqPMwbxHA5MZZd6zM3sbauPyJh"
            </span>
          </div>
        </>
      ) : (
        <ApiKeyBox apiKey={apiKey} />
      )}

      <Documentation />
    </div>
  );
};

export default HomePage;
