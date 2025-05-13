import React from "react";
import "./documentation.css";

const Documentation = () => (
  <div className="docs-container">
    <h2 className="docs-title">Bank API Documentation</h2>
    <div className="docs-section">
      <h3 className="docs-subtitle">Getting Started</h3>
      <ol className="docs-list">
        <li>
          <strong>About this API:</strong>
          <div className="docs-text">
            This API helps you retrieve basic information about banks and their
            branches in India, such as bank names, branch names, IFSC codes, and
            branch details.
          </div>
        </li>
        <li>
          <strong>API Key Required:</strong>
          <div className="docs-text">
            To use any of the endpoints below, you <b>must have an API key</b>.
          </div>
        </li>
        <li>
          <strong>How to get your API key:</strong>
          <ul className="docs-list-inner">
            <li>
              <b>If you are a new user:</b>
              <span>
                Click the <i>Subscribe</i> button above to register and receive
                your API key.
              </span>
            </li>
            <li>
              <b>If you already subscribed:</b>
              <span>
                Click the <i>Search API Key</i> button above and enter your
                email to retrieve your API key.
              </span>
            </li>
          </ul>
        </li>
        <li>
          <strong>How to use your API key:</strong>
          <div className="docs-text">
            For all endpoints below, include your API key as a query parameter: <i><code>?apikey=YOUR_API_KEY</code></i>
          </div>
        </li>
      </ol>
    </div>
    {/* Banks List Endpoint */}
    <div className="docs-section">
      <h3 className="docs-subtitle">1. List All Banks</h3>
      <div className="docs-endpoint">
        <span className="docs-method">GET</span>
        <span className="docs-url">/api/banks/?apikey=YOUR_API_KEY</span>
      </div>
      <div className="docs-param-row">
        <span className="docs-param-name">Required Parameter:</span>
        <span className="docs-param-detail">
          <code>apikey</code> (string) - Your API key
        </span>
      </div>
      <div className="docs-example-label">Example Request:</div>
      <pre className="docs-code-block">
        {`curl "http://127.0.0.1:8000/api/banks/?apikey=YOUR_API_KEY"`}
      </pre>
      <div className="docs-example-label">Example Response:</div>
      <pre className="docs-code-block">
        {`[
  {
    "id": 1,
    "name": "State Bank of India",
    "bank_code": "SBIN"
  },
  {
    "id": 2,
    "name": "HDFC Bank",
    "bank_code": "HDFC"
  }
]`}
      </pre>
    </div>

    {/* Branches by Bank Code Endpoint */}
    <div className="docs-section">
      <h3 className="docs-subtitle">2. List Branches by Bank Code</h3>
      <div className="docs-endpoint">
        <span className="docs-method">GET</span>
        <span className="docs-url">
          /api/branches/&lt;bank_code&gt;/?apikey=YOUR_API_KEY
        </span>
      </div>
      <div className="docs-param-row">
        <span className="docs-param-name">Required Parameters:</span>
        <span className="docs-param-detail">
          <code>bank_code</code> (string) - First 4 letters of IFSC
          <br />
          <code>apikey</code> (string) - Your API key
        </span>
      </div>
      <div className="docs-example-label">Example Request:</div>
      <pre className="docs-code-block">
        {`curl "http://127.0.0.1:8000/api/branches/SBIN/?apikey=YOUR_API_KEY"`}
      </pre>
      <div className="docs-example-label">Example Response:</div>
      <pre className="docs-code-block">
        {`[
  {
    "branch": "MAIN BRANCH",
    "ifsc": "SBIN0001234"
  },
  {
    "branch": "CITY BRANCH",
    "ifsc": "SBIN0005678"
  }
]`}
      </pre>
    </div>

    {/* Branch Details by IFSC Endpoint */}
    <div className="docs-section">
      <h3 className="docs-subtitle">3. Branch Details by IFSC</h3>
      <div className="docs-endpoint">
        <span className="docs-method">GET</span>
        <span className="docs-url">
          /api/branch/&lt;ifsc&gt;/?apikey=YOUR_API_KEY
        </span>
      </div>
      <div className="docs-param-row">
        <span className="docs-param-name">Required Parameters:</span>
        <span className="docs-param-detail">
          <code>ifsc</code> (string) - The IFSC code of the branch
          <br />
          <code>apikey</code> (string) - Your API key
        </span>
      </div>
      <div className="docs-example-label">Example Request:</div>
      <pre className="docs-code-block">
        {`curl "http://127.0.0.1:8000/api/branch/SBIN0001234/?apikey=YOUR_API_KEY"`}
      </pre>
      <div className="docs-example-label">Example Response:</div>
      <pre className="docs-code-block">
        {`{
  "ifsc": "SBIN0001234",
  "bank": "State Bank of India",
  "branch": "MAIN BRANCH",
  "address": "123 Main St, Mumbai",
  "city": "MUMBAI",
  "district": "MUMBAI",
  "state": "MAHARASHTRA"
}`}
      </pre>
    </div>
  </div>
);

export default Documentation;
