import { useEffect, useState } from "react";
import API from "../../api/axios";

function FeedbackTable() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedback = async () => {
    try {
      // Fetch feedback from the officer-protected route
      const res = await API.get("/officer/feedback"); 
      setFeedbacks(res.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  if (loading) return <div className="text-center py-5">Loading feedback ledger...</div>;

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="bg-light border-bottom">
            <tr>
              <th className="ps-4 text-muted small py-3 fw-bold">USER EMAIL</th>
              <th className="text-muted small py-3 fw-bold">FEEDBACK MESSAGE</th>
              <th className="text-muted small py-3 fw-bold">RECEIVED ON</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length === 0 ? (
              <tr><td colSpan="3" className="text-center py-5 text-muted">No citizen feedback records found.</td></tr>
            ) : (
              feedbacks.map((f, index) => (
                <tr key={index}>
                  <td className="ps-4 fw-bold text-dark">{f.email}</td>
                  <td className="text-muted text-wrap" style={{ maxWidth: "400px" }}>{f.feedback}</td>
                  <td className="small text-muted">
                    {new Date(f.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FeedbackTable;