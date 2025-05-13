import React from "react";
import "./apikeybox.css";
import { CopyButton } from "../CopyButton";

const ApiKeyBox = ({ apiKey }) => {
  return (
    <div className="api-key-box">
      <div className="api-key-title">Your API Key</div>
      <div className="api-key-field-row" style={{ display: "flex", alignItems: "center" }}>
        <span className="api-key-field">{apiKey}</span>
        <CopyButton valueToCopy={apiKey} />
      </div>
    </div>
  );
};

export default ApiKeyBox;
