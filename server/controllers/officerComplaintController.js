const Complaint = require("../models/Complaint");

exports.getComplaintsForOfficer = async (req, res) => {
  try {
    const { district, mandal, department } = req.query;

    let filter = { district, mandal };

    // Apply department filter only if selected
    if (department) {
      filter["aiAnalysis.department"] = department;
    }

    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// controllers/officerComplaintController.js


exports.updateComplaintStatus = async (req, res) => {
  const { id } = req.params;
  const { status, reason, assignedWorker } = req.body;

  try {
    const updateData = { status };

    // Handle Rejection
    if (status === "Rejected") {
      updateData.reason = reason;
    }

    // Handle Acceptance + Worker Assignment
    if (status === "Accepted" && assignedWorker) {
      updateData.assignedWorker = {
        name: assignedWorker.name,
        phone: assignedWorker.phone,
        dept: assignedWorker.dept
      };
    }

    const updated = await Complaint.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updated) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteComplaint = async (req, res) => {
  const { id } = req.params;
  await Complaint.findByIdAndDelete(id);
  res.json({ success: true });
};