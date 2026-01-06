import React, { useState } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import { locationData } from "../../data/locations";
import axios from "axios";

const primary = "#0b3c5d";

function RaiseComplaint() {
  const [loading, setLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    district: "",
    mandal: "",
    village: "",
    description: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleDescriptionChange = (e) => {
    setFormData({ ...formData, imageread: " " });
  };

  const handleDistrictChange = (e) => {
    setFormData({
      ...formData,
      district: e.target.value,
      mandal: "",
    });
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => setLocationError("Location permission denied")
    );
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  // 🔒 Validations
  if (formData.mobile.length !== 10) {
    alert("Enter a valid 10-digit mobile number");
    return;
  }

  if (!uploadedImageUrl) {
    alert("Please upload an evidence image");
    return;
  }

  if (!location) {
    alert("Please capture your current location");
    return;
  }

  setLoading(true);

  try {
    // 🟢 STEP 1: Raise Complaint
    const raiseRes = await fetch(
      "http://localhost:5000/api/complaints/raise",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          imageUrl: uploadedImageUrl,
          location,
        }),
      }
    );

    const raiseResult = await raiseRes.json();

    if (!raiseResult.success) {
      throw new Error(raiseResult.message || "Complaint submission failed");
    }

    const { _id, imageUrl } = raiseResult.data;
    console.log("✅ Step 1 completed:", _id);

    // 🟢 STEP 2: Analyze Image (Gemini)
    const analyzeRes = await axios.post(
      "http://localhost:5000/api/complaints/analyze-image",
      { imageUrl }
    );

    console.log("✅ Step 2 completed:", analyzeRes.data);

    // 🟢 STEP 3: Update AI Data in DB
    const updateRes = await axios.put(
      `http://localhost:5000/api/complaints/update-ai-data/${_id}`,
      analyzeRes.data
    );

    console.log("✅ Step 3 completed:", updateRes.data);

    alert("🎉 Complaint submitted & analyzed successfully!");

    // 🔄 Reset Form (better UX than reload)
    setFormData({
      name: "",
      mobile: "",
      district: "",
      mandal: "",
      village: "",
      description: "",
    });
    setUploadedImageUrl("");
    setLocation(null);
    setLocationError("");

  } catch (err) {
    console.error("❌ Chain failed:", err.response?.data || err.message);
    alert("Processing failed. Check console for details.");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="hero-section py-5">
      <div className="container">
        <h2 className="fw-bold text-center mb-4" style={{ color: "#0D2C50" }}>
          Raise a Complaint
        </h2>

        <form className="row g-3" onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="col-md-6">
            <label className="form-label fw-bold">Your Name</label>
            <input
              type="text"
              name="name"
              className="form-control form-control-lg shadow-sm"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* MOBILE */}
          <div className="col-md-6">
            <label className="form-label fw-bold">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              className="form-control form-control-lg shadow-sm"
              placeholder="10-digit mobile number"
              value={formData.mobile}
              onChange={handleChange}
              maxLength="10"
              required
            />
          </div>

          {/* DISTRICT */}
          <div className="col-md-4">
            <label className="form-label fw-bold">District</label>
            <select
              name="district"
              className="form-select form-select-lg"
              value={formData.district}
              onChange={handleDistrictChange}
              required
            >
              <option value="">Select District</option>
              {Object.keys(locationData).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* MANDAL */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Mandal</label>
            <select
              name="mandal"
              className="form-select form-select-lg"
              value={formData.mandal}
              onChange={handleChange}
              required
              disabled={!formData.district}
            >
              <option value="">Select Mandal</option>
              {formData.district &&
                locationData[formData.district].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
            </select>
          </div>

          {/* VILLAGE */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Village Name</label>
            <input
              type="text"
              name="village"
              className="form-control form-control-lg"
              placeholder="Village"
              value={formData.village}
              onChange={handleChange}
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div className="col-12">
            <label className="form-label fw-bold">Issue Description</label>
            <textarea
              name="description"
              rows="4"
              className="form-control form-control-lg"
              placeholder="Describe the problem in detail"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div className="col-12">
            <label className="form-label fw-bold">Upload Evidence Image</label>
            <IKContext
              publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
              urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
              authenticator={async () => {
                // Ensure this matches your authRoutes mounting point in server.js
                const res = await fetch("http://localhost:5000/api/auth/ik-auth");
                if (!res.ok) throw new Error("ImageKit auth failed");
                return await res.json();
              }}
            >
              <IKUpload
                fileName="complaint.jpg"
                useUniqueFileName
                className="form-control form-control-lg"
                onSuccess={(res) => setUploadedImageUrl(res.url)}
                onError={(err) => {
                  console.error("❌ Image upload error:", err);
                  alert("❌ Image upload failed");
                }}
              />
            </IKContext>

            {uploadedImageUrl && (
              <small className="text-success fw-bold mt-2 d-block">
                Image uploaded successfully ✓
              </small>
            )}
          </div>

          {/* LOCATION */}
          <div className="col-12">
            <button
              type="button"
              className={`btn btn-lg w-100 ${
                location ? "btn-success" : "btn-outline-primary"
              }`}
              onClick={getLocation}
            >
              {location ? "GPS Location Captured ✓" : "Capture Current Location"}
            </button>
            {locationError && (
              <small className="text-danger mt-1 d-block">{locationError}</small>
            )}
          </div>

          {/* SUBMIT */}
          <div className="col-12 d-grid mt-4">
            <button
              type="submit"
              className="btn btn-lg text-white shadow"
              style={{ backgroundColor: primary, padding: "15px" }}
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit Official Complaint"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default RaiseComplaint;