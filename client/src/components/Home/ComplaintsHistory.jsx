import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DetailPopup from "./DetailPopup";
import API from "../../api/axios";

function History() {
  const location = useLocation();
  const mobile = location.state?.mobileNumber;
  const [complaints, setComplaints] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch real reports for this mobile number
  const fetchMyReports = async () => {
    if (!mobile) return;
    try {
      setLoading(true);
      const res = await API.get(`/complaints/user/${mobile}`);
      setComplaints(res.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyReports();
  }, [mobile]);

  // 🗑️ Delete logic (Syncs with Officer Dashboard automatically)
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to withdraw this complaint? It will be removed from the system.")) {
      try {
        await API.delete(`/complaints/${id}`);
        // Update local state to remove the deleted item
        setComplaints(complaints.filter(c => c._id !== id));
        alert("Complaint removed successfully.");
      } catch (error) {
        alert("Failed to delete complaint.");
      }
    }
  };

  if (!mobile) return <div className="container py-5">Please enter a mobile number first.</div>;

  return (
    <div className="container py-5" style={{ minHeight: "80vh" }}>
      <h2 className="fw-bold mb-4 border-bottom pb-2">My Reports ({mobile})</h2>
      
      {loading ? (
        <div className="text-center">Loading your reports...</div>
      ) : complaints.length === 0 ? (
        <div className="alert alert-light text-center border shadow-sm">
          No reports found for this number.
        </div>
      ) : (
        <div className="table-responsive bg-white shadow-sm rounded">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Issue</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map(item => (
                <tr key={item._id}>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="text-truncate" style={{maxWidth: '200px'}}>{item.description}</td>
                  <td>
                    <span className={`badge ${
                      item.status === 'Pending' ? 'bg-warning text-dark' : 
                      item.status === 'Accepted' ? 'bg-primary' : 
                      item.status === 'Completed' ? 'bg-success' : 'bg-danger'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="text-end">
                    <div className="btn-group">
                                            {/* In your History component mapping */}
                        <button 
                        className="btn btn-sm btn-outline-dark" 
                        onClick={() => setSelectedItem(item)} // This 'item' is the full object from MongoDB
                        >
                        View
                        </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedItem && (
        <DetailPopup item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

export default History;