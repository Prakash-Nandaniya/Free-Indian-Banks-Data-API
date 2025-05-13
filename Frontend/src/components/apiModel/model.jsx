import React from "react";
import "./model.css";
import { CopyButton } from "../CopyButton";

const ApiKeyModal = ({ apiKey, onClose }) => (
  <div className="modal-backdrop">
    <div className="modal-content">
      <button className="modal-close" onClick={onClose}>&times;</button>
      <h2 className="modal-title">Your API Key</h2>
      <p className="modal-desc">
        Please copy your API key and keep it safe. You won't be able to see it again.
      </p>
      <div className="modal-key-row" style={{ display: "flex", alignItems: "center" }}>
        <span className="modal-key">{apiKey}</span>
        <CopyButton valueToCopy={apiKey} />
      </div>
      <button className="modal-ok" onClick={onClose}>OK</button>
    </div>
  </div>
);

export default ApiKeyModal;
