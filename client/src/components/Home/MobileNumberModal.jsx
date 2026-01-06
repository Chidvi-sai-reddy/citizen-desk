import React, { useState } from "react";

function MobileNumberModal({ onClose, onSubmit }) {
  const [num, setNum] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setNum(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (num.length === 10) {
      onSubmit(num); // This triggers handleMobileSubmit in Home.jsx
      onClose();     // 🔥 Added this to force the modal to close locally immediately
    }
  };

  return (
    /* Overlay: Clicking this background will now trigger onClose */
    <div 
      className="modal-overlay animate-fade-in" 
      onClick={onClose} 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 3000, 
        background: 'rgba(0,13,26,0.85)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backdropFilter: 'blur(8px)' 
      }}
    >
      {/* Modal Box: stopPropagation prevents the click from reaching the overlay */}
      <div
        className="modal-box shadow-2xl border-0 bg-white rounded-4 overflow-hidden animate-scale-up"
        style={{ maxWidth: "850px", width: "95%" }}
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="row g-0 align-items-stretch">
          {/* LEFT SIDE: INFO (Consistent with your previous high-fidelity design) */}
          <div className="col-md-5 p-5 text-white d-none d-md-flex flex-column justify-content-center" style={{ backgroundColor: "#0b3c5d" }}>
            <h2 className="fw-bold mb-3 text-white">Track Reports</h2>
            <p className="opacity-75 text-white">Enter your registered mobile number to access your grievance history.</p>
            <div className="mt-4 p-3 bg-white bg-opacity-10 rounded-3 small">
              Check the status of your complaints and view official responses.
            </div>
          </div>

          {/* RIGHT SIDE: FORM */}
          <div className="col-md-7 p-5 bg-white">
            <div className="d-flex justify-content-between align-items-start mb-4">
                <h3 className="fw-bold m-0" style={{ color: "#0b3c5d" }}>Identity Check</h3>
                <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label fw-bold text-muted small text-uppercase">Registered Mobile Number</label>
                <div className="input-group input-group-lg shadow-sm border rounded-3 overflow-hidden">
                  <span className="input-group-text bg-light border-0 fw-bold">+91</span>
                  <input
                    type="tel"
                    className="form-control border-0 fw-bold"
                    style={{ letterSpacing: "2px", fontSize: "1.4rem", color: "#0b3c5d" }}
                    placeholder="XXXXXXXXXX"
                    maxLength="10"
                    value={num}
                    onChange={handleInputChange}
                    autoFocus
                  />
                </div>
              </div>

              <div className="d-grid gap-3 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg py-3 fw-bold shadow-lg"
                  style={{ backgroundColor: "#0b3c5d", border: "none", borderRadius: '12px' }}
                  disabled={num.length !== 10}
                >
                  FETCH COMPLAINTS
                </button>
                <button 
                  type="button" 
                  className="btn btn-link text-muted text-decoration-none fw-semibold" 
                  onClick={onClose}
                >
                  Cancel & Return
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNumberModal;