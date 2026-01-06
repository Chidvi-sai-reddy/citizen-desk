import React, { useState } from "react";
import DetailPopup from "./DetailPopup";

function MobilePopup({ onClose }) {
  const [mobile, setMobile] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Dummy data including image and full details
  const dummyComplaints = [
    { 
      id: "CMP-001", 
      title: "Broken Drainage", 
      status: "In Progress", 
      date: "2025-12-20",
      name: "User Name",
      location: "Vizianagaram, Mandal 1, Village A",
      description: "The drainage pipe is blocked near the main road causing overflow.",
      image: "https://via.placeholder.com/400x250?text=Drainage+Image",
      lat: "18.1067", lng: "83.3955"
    }
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-box" style={{ width: "90%", maxWidth: "600px" }}>
        <div className="d-flex justify-content-between mb-3">
          <h3>Track Complaints</h3>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        {!isSearched ? (
          <div className="text-center py-3">
            <p>Enter mobile number to see your reports</p>
            <input 
              type="tel" 
              className="form-control mb-3" 
              placeholder="Enter 10 digit mobile"
              maxLength="10"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <button 
              className="btn btn-primary w-100" 
              disabled={mobile.length !== 10}
              onClick={() => setIsSearched(true)}
            >
              Search Reports
            </button>
          </div>
        ) : (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dummyComplaints.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>
                      <button className="btn btn-sm btn-info" onClick={() => setSelectedItem(item)}>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-link" onClick={() => setIsSearched(false)}>Change Mobile</button>
          </div>
        )}
      </div>

      {selectedItem && (
        <DetailPopup item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

export default MobilePopup;