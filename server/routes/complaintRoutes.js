const express = require("express");
const router = express.Router();

// Import controllers
const { submitFeedback } = require("../controllers/feedbackController");
const {
  raiseComplaint,
  getComplaintsByMobile,
  deleteComplaintByUser,
  AnalyzeImage,
  UpdateComplaintData,
  FindLastEntered
} = require("../controllers/complaintController");

/* -------------------- Core Complaint Routes -------------------- */

// Create a new complaint (triggers rule-based AI in background)
router.post("/raise", raiseComplaint);

// Get all complaints for a specific user by mobile number
router.get("/user/:mobile", getComplaintsByMobile);

// Delete a specific complaint by ID
router.delete("/:id", deleteComplaintByUser);

/* -------------------- AI & Image Processing Routes -------------------- */

// Get the details of the most recently submitted complaint
router.get('/last-complaint', FindLastEntered);
router.get('/findlast', FindLastEntered); // Alias for consistency

// Send an image URL to Gemini Vision for analysis
router.post('/analyze-image', AnalyzeImage);

// Update the complaint record with the results from the AI analysis
router.put('/update-ai-data/:id', UpdateComplaintData);

/* -------------------- Feedback Routes -------------------- */

// Submit user feedback regarding the service
router.post("/feedback", submitFeedback);

module.exports = router;