import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios"; // Ensure you import your axios instance
import "../styles/Login.css";

function VroLogin({ onLogin, onClose }) {
  const [officerId, setOfficerId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/officer/login", { 
        officerId: officerId.trim(), 
        password: password.trim() 
      });

      if (res.data.success) {
        // Store officer info in localStorage to keep session alive
        localStorage.setItem("officer", JSON.stringify(res.data.officer));
        
        onLogin?.();
        onClose?.();
        navigate("/admin-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-container">
      <button className="close-btn" onClick={onClose}>✖</button>
      <h2>Officer Login</h2>
      <p className="login-subtitle">Access authorized for VRO only</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Officer ID (e.g., 23331A05I3)"
          value={officerId}
          onChange={(e) => setOfficerId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error text-danger">{error}</p>}
        <button type="submit" className="btn-login">Login</button>
      </form>
    </div>
  );
}

export default VroLogin;