import React, { useState } from "react";

function AcceptModal({ onSubmit, onClose }) {
  const [worker, setWorker] = useState({ name: "", phone: "", dept: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (worker.phone.length !== 10) return alert("Enter valid 10-digit phone");
    onSubmit(worker); // Sends data back to ComplaintsTable
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
         style={{ backgroundColor: "rgba(0,0,0,0.7)", zIndex: 2000 }}>
      <div className="bg-white p-4 rounded-4 shadow-lg" style={{ width: "100%", maxWidth: "400px" }}>
        <h4 className="fw-bold mb-3" style={{ color: "#0b3c5d" }}>Assign Field Worker</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold">Full Name</label>
            <input type="text" className="form-control" required 
              onChange={(e) => setWorker({...worker, name: e.target.value})} />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-bold">Mobile Number</label>
            <input type="tel" className="form-control" maxLength="10" required 
              onChange={(e) => setWorker({...worker, phone: e.target.value})} />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-bold">Department</label>
            <input type="text" className="form-control" placeholder="e.g. Water Works" required 
              onChange={(e) => setWorker({...worker, dept: e.target.value})} />
          </div>
          <div className="d-flex gap-2 mt-4">
            <button type="submit" className="btn btn-success w-100 fw-bold">Confirm & Accept</button>
            <button type="button" className="btn btn-light w-100" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AcceptModal;