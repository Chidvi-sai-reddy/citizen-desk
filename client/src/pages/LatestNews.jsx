import React from "react";

const fullNews = [
  {
    id: 1,
    title: "Digital India: New Fiber Grid for Rural Mandals",
    date: "Dec 24, 2025",
    category: "Infrastructure",
    description:
      "The state government has sanctioned ₹200Cr for high-speed internet connectivity in remote villages."
  },
  {
    id: 2,
    title: "Health Camp: Free Vision Checkups in Primary Schools",
    date: "Dec 22, 2025",
    category: "Health",
    description:
      "Doctors will visit government schools for free eye checkups and distribution of spectacles."
  },
  {
    id: 3,
    title: "Monsoon Preparedness: Drainage Cleaning Drive",
    date: "Dec 20, 2025",
    category: "Sanitation",
    description:
      "Citizens are requested to report blocked drains via the portal."
  }
];

function LatestNews() {
  return (
    <div className="container py-5">
      <h2 className="fw-bold border-bottom pb-3 mb-4">
        Official Announcements
      </h2>

      <div className="row g-4">
        {fullNews.map((news) => (
          <div key={news.id} className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span className="badge bg-white text-dark border">
                    {news.category}
                  </span>
                  <small className="text-muted">{news.date}</small>
                </div>
                <h5 className="fw-bold">{news.title}</h5>
                <p className="text-secondary small mb-0">
                  {news.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestNews;
