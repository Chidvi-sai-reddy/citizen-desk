import { useState } from "react";
import "../styles/RejectModel.css";

function RejectModel({ onSubmit, onClose }) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    if (reason.trim() === "") {
      setError("Reason is Required");
      return;
    }
    onSubmit(reason);
    setReason("");
    setError("");
  }

  function handleCancel() {
    setReason("");
    setError("");
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Reject Complaint</h3>

        <textarea
          placeholder="Enter the reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        {error && <p className="modal-error">{error}</p>}

        <div className="modal-actions">
          <button className="modal-submit" onClick={handleSubmit}>
            Submit
          </button>
          <button className="modal-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default RejectModel;
