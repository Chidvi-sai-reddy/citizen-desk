// models/Complaint.js
const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  district: String,
  mandal: String,
  village: String,
  description: String,
  imageUrl: String,
  location: {
    lat: Number,
    lng: Number,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected", "Completed"],
    default: "Pending",
  },
  aiAnalysis: {
    department: String,
    urgency: String,
    confidence: Number,
    reason: String,
  },
  reason: { type: String, default: "" },
  // ✅ NEW: Assigned Worker Field
  assignedWorker: {
    name: { type: String, default: "" },
    phone: { type: String, default: "" },
    dept: { type: String, default: "" }
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Complaint", ComplaintSchema);