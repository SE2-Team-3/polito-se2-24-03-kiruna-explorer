import React from "react";

interface PopupProps {
  linkTypes: string[];
}

const EdgePopup: React.FC<PopupProps> = ({ linkTypes }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        border: "2px solid #3d52a0",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        zIndex: 9999,
      }}
    >
      <h3>{linkTypes.length === 1 ? "Connection Type" : "Connection Types"}</h3>
      <ul className="font-size-20">
        {linkTypes.map((linkType, index) => (
          <li key={index}>{linkType}</li>
        ))}
      </ul>
    </div>
  );
};

export default EdgePopup;
