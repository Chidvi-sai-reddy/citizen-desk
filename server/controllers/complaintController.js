const Complaint = require("../models/Complaint");
const { analyzeComplaint } = require("../services/aiService");
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" } 
});

// 1️⃣ Save complaint and run rule-based AI in background
exports.raiseComplaint = async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    const saved = await complaint.save();

    // Respond immediately
    res.status(201).json({ success: true, data: saved });

    // Background analysis
    const aiResult = analyzeComplaint(saved.description);
    await Complaint.findByIdAndUpdate(saved._id, {
      aiAnalysis: aiResult,
    });

    console.log("🧠 RULE-BASED AI RESULT:", aiResult);
  } catch (error) {
    console.error("❌ Complaint error:", error.message);
    if (!res.headersSent) {
        res.status(500).json({ success: false, message: error.message });
    }
  }
};

// 2️⃣ Get complaints by mobile
exports.getComplaintsByMobile = async (req, res) => {
  try {
    const complaints = await Complaint.find({ mobile: req.params.mobile })
      .sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3️⃣ Delete complaint
exports.deleteComplaintByUser = async (req, res) => {
  try {
    const { id } = req.params;
    await Complaint.findByIdAndDelete(id);
    res.json({ success: true, message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5️⃣ GEMINI VISION: Analyze image and update record
// 1. Get the most recent complaint details
exports.FindLastEntered = async (req, res) => {
    try {
        const lastComplaint = await Complaint.findOne({}).sort({ createdAt: -1 });
        if (!lastComplaint) return res.status(404).json({ message: "No complaints found" });
        
        res.json({ _id: lastComplaint._id, imageUrl: lastComplaint.imageUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Pure AI Analysis (Takes imageUrl, returns JSON description)
exports.AnalyzeImage = async (req, res) => {
    try {
        const { imageUrl } = req.body;
        const imgResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const base64Data = Buffer.from(imgResponse.data).toString('base64');
        const mimeType = imgResponse.headers['content-type'] || 'image/jpeg';

        const prompt = `Analyze this complaint image and return JSON: { "description": "...", "department": "...", "urgencyLevel": "..." }`;

        const result = await model.generateContent([
            prompt,
            { inlineData: { data: base64Data, mimeType } }
        ]);

        // Return only the AI result to the client
        res.json(JSON.parse(result.response.text()));
        console.log("🧠 GEMINI AI RESULT:", result.response.text());
    } catch (error) {
        res.status(500).json({ error: "AI Analysis failed", details: error.message });
    }
};

// 3. Final Database Update
exports.UpdateComplaintData = async (req, res) => {
    try {
        const updated = await Complaint.findByIdAndUpdate(
            req.params.id, 
            { imageread: req.body }, // Body will be the AI result
            { new: true }
        );
        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};