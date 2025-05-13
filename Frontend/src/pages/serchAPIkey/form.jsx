import React, { useState } from "react";
import "./form.css";
import { useNavigate } from "react-router-dom";
import ApiKeyModal from "../../components/apiModel/model";


const SearchApiKey = ({ setApiKey }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [generatedKey, setGeneratedKey] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setApiKey("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const BE_URL = process.env.REACT_APP_BE_URL;
      const response = await fetch(`${BE_URL}/api/search-apikey/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setApiKey(data.apikey);
        setGeneratedKey(data.apikey);
        setShowModal(true);
      } else {
        // Backend returns error message
        setError(data.error || "No subscription found with entered email.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="search-api-key-page">
      <h1 className="search-title">API Subscription Service</h1>
      <div className="search-form-container">
        <h2 className="search-form-title">Find Your API Key</h2>
        <form onSubmit={handleSearch}>
          <label className="search-label" htmlFor="email">
            Email
          </label>
          <input
            className="search-input"
            type="email"
            id="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <div className="search-error">{error}</div>}
          <div className="search-buttons">
            <button
              type="button"
              className="search-cancel"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button type="submit" className="search-submit">
              Search
            </button>
          </div>
        </form>
      </div>
      {showModal && (
        <ApiKeyModal apiKey={generatedKey} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default SearchApiKey;
