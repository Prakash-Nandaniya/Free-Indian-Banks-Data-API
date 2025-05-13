import React, { useState } from "react";

const CopyButton = ({ valueToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(valueToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      style={{
        background: "none",
        border: "none",
        padding: 0,
        marginLeft: "12px",
        cursor: "pointer",
        outline: "none",
        display: "flex",
        alignItems: "center",
      }}
      aria-label="Copy"
      onClick={handleCopy}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
};

const CopyIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect x="4" y="4" width="32" height="32" rx="8" fill="#181919" />
    <path d="M16 16h8v8h-8z" stroke="#ccc" strokeWidth="2" fill="none" />
    <rect
      x="12"
      y="12"
      width="8"
      height="8"
      rx="2"
      stroke="#ccc"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

const CheckIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="16" fill="#181919" />
    <path
      d="M14 21l4 4 8-8"
      stroke="#fff"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export { CopyButton,CopyIcon,CheckIcon };
