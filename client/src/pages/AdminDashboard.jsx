import { useState } from "react";
import "../styles/Admin.css";
import ComplaintTable from "../components/ComplaintsTable";
import FeedbackTable from "../components/common/FeedbackTable";
import { locationData } from "../data/locations";

function AdminDashboard() {
  const [district, setDistrict] = useState("");
  const [mandal, setMandal] = useState("");
  const [department, setDepartment] = useState("");
  const [view, setView] = useState("complaints");

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setMandal("");
  };

  return (
    <div className="admin-wrapper min-vh-100 bg-light pb-5">

      {/* ================= HEADER STRIP ================= */}
      <div
        className="py-4 border-bottom"
        style={{ backgroundColor: "#f1f5f9" }}
      >
        <div className="container text-center">
          <div className="official-badge d-inline-flex align-items-center mb-2">
            <span className="dot pulse me-2"></span>
            OFFICIAL ACCESS ONLY
          </div>

          <h2 className="fw-bold mb-1" style={{ color: "#00274d" }}>
            Officer Command Center
          </h2>
          <p className="text-muted mb-3">
            Jurisdiction Oversight & Grievance Redressal
          </p>

          {/* ================= TOGGLE ================= */}
          <div className="admin-toggle">
            <button
                className={`admin-toggle-btn ${view === "complaints" ? "active" : ""}`}
                onClick={() => setView("complaints")}
            >
                Complaints
            </button>
            <button
                className={`admin-toggle-btn ${view === "feedback" ? "active" : ""}`}
                onClick={() => setView("feedback")}
            >
                Feedback
            </button>
            </div>

        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="container mt-4">

        {view === "complaints" ? (
          <>
            {/* ================= FILTER CARD ================= */}
            <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
              <div className="fw-bold text-primary small mb-3">
                <i className="bi bi-geo-alt-fill me-2"></i>
                SELECT JURISDICTION
              </div>

              <div className="row g-3">
                <div className="col-md-4">
                  <label className="x-small-label">DISTRICT</label>
                  <select
                    className="form-select modern-input"
                    value={district}
                    onChange={handleDistrictChange}
                  >
                    <option value="">Choose District</option>
                    {Object.keys(locationData).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="x-small-label">MANDAL</label>
                  <select
                    className="form-select modern-input"
                    value={mandal}
                    onChange={(e) => setMandal(e.target.value)}
                    disabled={!district}
                  >
                    <option value="">Choose Mandal</option>
                    {district &&
                      locationData[district].map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="x-small-label">DEPARTMENT</label>
                  <select
                    className="form-select modern-input"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="">All Departments</option>
                    <option value="ROADS">Roads</option>
                    <option value="ELECTRICITY">Electricity</option>
                    <option value="WATER_SUPPLY">Water Supply</option>
                    <option value="SANITATION">Sanitation</option>
                    <option value="DRAINAGE">Drainage</option>
                    <option value="STREET_LIGHTING">Street Lighting</option>
                    <option value="PUBLIC_HEALTH">Public Health</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ================= DATA AREA ================= */}
            {district && mandal ? (
              <>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold m-0">Active Grievances</h5>
                  <span className="live-indicator">
                    <span className="dot me-2"></span>Live
                  </span>
                </div>

                <ComplaintTable
                  district={district}
                  mandal={mandal}
                  department={department}
                />
              </>
            ) : (
              <div className="admin-empty-state mt-4">
            <div className="admin-empty-icon">
                <i className="bi bi-geo-alt-fill"></i>
            </div>

            <h5 className="fw-bold mb-2">No Jurisdiction Selected</h5>

            <p className="text-muted mb-0">
                Please select a <strong>District</strong> and <strong>Mandal</strong> above
                to view active grievances under your authority.
            </p>
            </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-4 shadow-sm p-4">
            <h5 className="fw-bold mb-3 d-flex align-items-center">
              <i className="bi bi-chat-left-dots-fill text-primary me-2"></i>
              Public Feedback
            </h5>
            <FeedbackTable />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
