import React from "react";

interface PopupProps {
  linkTypes: string[];
  onClose: () => void;
}

const EdgePopup: React.FC<PopupProps> = ({ linkTypes, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        zIndex: 9999,
      }}
    >
      <h3>Link Types</h3>
      <ul>
        {linkTypes.map((linkType, index) => (
          <li key={index}>{linkType}</li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EdgePopup;
