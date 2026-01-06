import React, { useState } from "react";
import API from "../../api/axios"; //

function FeedbackModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send feedback to the backend
      await API.post("/complaints/feedback", { email, feedback }); 
      alert("Thank you for your feedback!");
      onClose();
    } catch (error) {
      alert("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1050 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded shadow p-4 position-relative"
        style={{ width: "100%", maxWidth: "420px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="btn-close position-absolute top-0 end-0 m-3"
        ></button>

        <h5 className="fw-bold mb-3 text-center" style={{ color: "#0b3c5d" }}>
          Send Feedback
        </h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold">Email</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold">Your Feedback</label>
            <textarea
              className="form-control"
              rows="4"
              required
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 text-white border-0"
            style={{ backgroundColor: "#0b3c5d" }}
          >
            Send Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackModal;