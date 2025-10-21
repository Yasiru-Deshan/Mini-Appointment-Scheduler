import React from "react";
import "../styles/Modal.css";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button">
            Close
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}