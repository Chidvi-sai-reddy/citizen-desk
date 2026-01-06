import React from "react";

function DetailPopup({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div 
        className="modal-box bg-white p-0 rounded-4 shadow-2xl overflow-hidden animate-scale-up" 
        style={{ width: "95%", maxWidth: "850px" }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="p-4 bg-dark text-white d-flex justify-content-between align-items-center">
          <div>
            <h5 className="m-0 fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>
              Official Grievance Report
            </h5>
            <small className="opacity-75">Tracking ID: {item._id}</small>
          </div>
          <button className="btn-close btn-close-white" onClick={onClose}></button>
        </div>

        <div className="p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <div className="row g-4">
            {/* LEFT SIDE: EVIDENCE CAPTURE */}
            <div className="col-md-5">
              <label className="text-muted x-small fw-bold mb-2 d-block">EVIDENCE CAPTURE</label>
              {item.imageUrl ? (
                <div className="position-relative">
                  <img 
                    src={item.imageUrl} 
                    alt="Evidence" 
                    className="img-fluid rounded-3 border shadow-sm" 
                    style={{ width: '100%', height: '350px', objectFit: 'cover' }} 
                  />
                  <div className="position-absolute bottom-0 start-0 w-100 p-2 bg-dark bg-opacity-50 text-white x-small text-center rounded-bottom">
                    Geotagged Evidence Original
                  </div>
                </div>
              ) : (
                <div className="bg-light rounded-3 d-flex align-items-center justify-content-center border" style={{ height: "350px" }}>
                  <div className="text-center text-muted">
                    <i className="bi bi-image-fill display-4 d-block mb-2"></i>
                    No Image Provided
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDE: CORE DETAILS */}
            <div className="col-md-7">
              <div className="row g-3">
                <div className="col-6">
                  <label className="text-muted x-small fw-bold">REPORT DATE</label>
                  <p className="fw-bold m-0">{new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="col-6">
                  <label className="text-muted x-small fw-bold">CURRENT STATUS</label>
                  <div>
                    <span className={`status-pill ${item.status.toLowerCase()} d-inline-block px-3 py-1`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                <div className="col-12">
                  <label className="text-muted x-small fw-bold">LOCATION DETAILS</label>
                  <div className="p-3 bg-light rounded-3 border">
                    <p className="m-0 fw-bold text-primary">{item.village}</p>
                    <p className="m-0 small">{item.mandal}, {item.district}</p>
                  </div>
                </div>

                <div className="col-12">
                  <label className="text-primary x-small fw-bold">CITIZEN DESCRIPTION</label>
                  <div className="p-3 bg-primary bg-opacity-10 rounded-3 border-start border-4 border-primary">
                    <p className="mb-0 text-dark" style={{ lineHeight: '1.6' }}>
                      “{item.description}”
                    </p>
                  </div>
                </div>

                {/* ✅ FEATURE: WORKER ASSIGNMENT DETAILS (Visible when status is Accepted) */}
                {item.status === 'Accepted' && item.assignedWorker && (
                  <div className="col-12 mt-2">
                    <label className="text-success x-small fw-bold">ASSIGNED FIELD OFFICIAL</label>
                    <div className="p-3 bg-success bg-opacity-10 rounded-3 border border-success border-opacity-25 shadow-sm">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="m-0 fw-bold text-dark">{item.assignedWorker.name || "Worker Assigned"}</p>
                          <p className="m-0 small text-muted text-uppercase">{item.assignedWorker.dept || "Field Dept"}</p>
                        </div>
                        <div className="text-end">
                          <a 
                            href={`tel:${item.assignedWorker.phone}`} 
                            className="btn btn-success btn-sm rounded-pill px-3 shadow-sm"
                          >
                            <i className="bi bi-telephone-fill me-2"></i>
                            Call: {item.assignedWorker.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* REJECTION REMARKS */}
                {item.status === 'Rejected' && item.reason && (
                  <div className="col-12 mt-2">
                    <label className="text-danger x-small fw-bold">OFFICER REMARKS</label>
                    <div className="alert alert-danger border-start border-4 border-danger py-2 mb-0">
                      {item.reason}
                    </div>
                  </div>
                )}

                <div className="col-12 mt-2">
                   <label className="text-muted x-small fw-bold">DEPARTMENT CATEGORY</label>
                   <p className="m-0">
                     <span className="badge bg-secondary">
                       {item.aiAnalysis?.department || "GENERAL"}
                     </span>
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-3 bg-light border-top text-end">
          <button className="btn btn-dark px-5 rounded-pill fw-bold" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailPopup;