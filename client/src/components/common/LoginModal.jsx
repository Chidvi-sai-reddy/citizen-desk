import React from "react";
import "./LoginModal.css";

function LoginModal({ children, onClose }) {
  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div
        className="login-modal-box"
        onClick={(e) => e.stopPropagation()} // 🔥 prevent close on popup click
      >
        {children}
      </div>
    </div>
  );
}

export default LoginModal;
