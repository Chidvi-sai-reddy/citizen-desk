import { useEffect, useState } from "react";
import RejectModel from "./RejectModel";
import AcceptModal from "./common/AcceptModal"; // ✅ Import the new Modal
import API from "../api/axios";

function ComplaintsTable({ district, mandal, department }) {
  const [complaints, setComplaints] = useState([]);
  const [showReject, setShowReject] = useState(false);
  const [showAccept, setShowAccept] = useState(false); // ✅ Added for Accept Modal
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [viewComplaint, setViewComplaint] = useState(null);

  const fetchComplaints = async () => {
    try {
      let query = `/officer/complaints?district=${district}&mandal=${mandal}`;
      if (department) query += `&department=${department}`;
      const res = await API.get(query);
      setComplaints(res.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [district, mandal, department]);

  useEffect(() => {
    if (viewComplaint || showAccept || showReject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [viewComplaint, showAccept, showReject]);

  // ✅ Updated updateStatus to handle worker details
  const updateStatus = async (id, status, extraData = null) => {
    try {
      const payload = { status };
      if (status === "Rejected") payload.reason = extraData;
      if (status === "Accepted") payload.assignedWorker = extraData; // extraData is worker object

      await API.put(`/officer/complaints/${id}/status`, payload);
      
      setShowReject(false);
      setShowAccept(false);
      setSelectedComplaint(null);
      fetchComplaints();
    } catch (error) {
      alert("Status update failed.");
    }
  };

  const deleteComplaint = async (id) => {
    if (window.confirm("Permanently delete this report?")) {
      await API.delete(`/officer/complaints/${id}`);
      fetchComplaints();
    }
  };

  return (
    <>
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-dark text-white">
              <tr>
                <th className="ps-4 py-3 small fw-bold text-uppercase">Village</th>
                <th className="py-3 small fw-bold text-uppercase">Grievance Summary</th>
                <th className="py-3 small fw-bold text-uppercase text-center">Status</th>
                <th className="text-center py-3 pe-4 small fw-bold text-uppercase">Manage</th>
              </tr>
            </thead>
            <tbody>
              {complaints.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-5 text-muted fw-bold">NO ACTIVE RECORDS FOUND</td></tr>
              ) : (
                complaints.map((c) => (
                  <tr key={c._id}>
                    <td className="ps-4 fw-bold text-primary pointer" onClick={() => setViewComplaint(c)}>{c.village}</td>
                    <td style={{ maxWidth: "320px" }} className="pointer" onClick={() => setViewComplaint(c)}>
                      <div className="text-truncate fw-semibold">{c.description}</div>
                      <small className="text-muted">ID: {c._id.substring(0, 8)}</small>
                    </td>
                    <td className="text-center pointer" onClick={() => setViewComplaint(c)}>
                      <span className={`status-pill ${c.status.toLowerCase()}`}>{c.status}</span>
                    </td>
                    <td className="text-center pe-4">
                      <div className="d-flex justify-content-center gap-2">
                        {c.status === "Pending" && (
                          <>
                            {/* ✅ Updated to show Accept Modal instead of direct update */}
                            <button 
                                className="btn btn-sm btn-success rounded-pill fw-bold" 
                                onClick={() => { setSelectedComplaint(c); setShowAccept(true); }}
                            >
                                APPROVE
                            </button>
                            <button className="btn btn-sm btn-danger rounded-pill fw-bold" onClick={() => { setSelectedComplaint(c); setShowReject(true); }}>REJECT</button>
                          </>
                        )}
                        {c.status === "Accepted" && (
                          <button className="btn btn-sm btn-primary rounded-pill fw-bold shadow-sm" onClick={() => updateStatus(c._id, "Completed")}>MARK RESOLVED</button>
                        )}
                        <button className="btn btn-sm btn-outline-secondary rounded-circle border-0" onClick={() => deleteComplaint(c._id)}>
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ WORKER ASSIGNMENT MODAL */}
      {showAccept && (
        <AcceptModal 
            onSubmit={(workerData) => updateStatus(selectedComplaint._id, "Accepted", workerData)} 
            onClose={() => setShowAccept(false)} 
        />
      )}

      {showReject && (
        <RejectModel onSubmit={(reason) => updateStatus(selectedComplaint._id, "Rejected", reason)} onClose={() => setShowReject(false)} />
      )}

      {/* ✅ SYNCHRONIZED 850px MODERN MODAL */}
      {viewComplaint && (
        <div className="admin-modal-overlay" onClick={() => setViewComplaint(null)}>
          <div className="admin-modal-box animate-scale-up" 
               style={{ maxWidth: "850px", height: "auto", maxHeight: "90vh" }} 
               onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h5 className="fw-bold m-0 text-uppercase" style={{letterSpacing:'1px'}}>Case File: {viewComplaint._id.toUpperCase()}</h5>
              <button className="btn-close btn-close-white" onClick={() => setViewComplaint(null)} />
            </div>

            <div className="admin-modal-body p-4">
              <div className="row g-4 text-start">
                <div className="col-md-5 text-center">
                  <label className="text-muted x-small fw-bold d-block mb-2">EVIDENCE ORIGINAL</label>
                  {viewComplaint.imageUrl ? (
                    <img src={viewComplaint.imageUrl} className="img-fluid rounded-3 border shadow-sm" alt="Evidence" style={{ maxHeight: "380px", objectFit: "cover", width: '100%' }} />
                  ) : (
                    <div className="bg-light border rounded-3 d-flex align-items-center justify-content-center" style={{ height: "300px" }}>No Evidence Provided</div>
                  )}
                </div>

                <div className="col-md-7">
                  <label className="text-muted x-small fw-bold">CURRENT STATUS</label>
                  <div className={`status-pill ${viewComplaint.status.toLowerCase()} px-4 py-2 mt-2 d-inline-block`}>
                    {viewComplaint.status}
                  </div>

                  <div className="mt-4 p-3 bg-light rounded-3 border text-start">
                    <label className="text-muted x-small fw-bold">LOCATION & JURISDICTION</label>
                    <p className="fw-bold mb-0 text-primary">{viewComplaint.village}, {viewComplaint.mandal}</p>
                    <small className="text-muted">{viewComplaint.district} District</small>
                  </div>

                  <div className="mt-4 p-3 bg-primary bg-opacity-10 rounded-3 border-start border-4 border-primary text-start">
                    <label className="text-primary x-small fw-bold">CITIZEN DESCRIPTION</label>
                    <p className="fw-semibold text-dark mt-2 mb-0">“{viewComplaint.description}”</p>
                  </div>

                  {/* ✅ Show assigned worker details in the modal if accepted */}
                  {viewComplaint.status === "Accepted" && viewComplaint.assignedWorker && (
                    <div className="mt-4 p-3 bg-success bg-opacity-10 rounded-3 border-start border-4 border-success text-start">
                        <label className="text-success x-small fw-bold">ASSIGNED FIELD WORKER</label>
                        <p className="fw-bold m-0">{viewComplaint.assignedWorker.name}</p>
                        <p className="small m-0 text-muted">{viewComplaint.assignedWorker.dept} | {viewComplaint.assignedWorker.phone}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button className="btn btn-secondary rounded-pill px-5 fw-bold" onClick={() => setViewComplaint(null)}>Close Ledger</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ComplaintsTable;