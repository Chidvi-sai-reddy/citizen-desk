const Feedback = require("../models/Feedback");

const submitFeedback = async (req, res) => {
  try {
    const { email, feedback } = req.body;

    if (!email || !feedback) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    await new Feedback({ email, feedback }).save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllFeedback = async (req, res) => {
  try {
    const data = await Feedback.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  submitFeedback,
  getAllFeedback,
};
