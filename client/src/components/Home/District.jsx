import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import pic1 from "../../assets/picture-1.png"; 
import pic2 from "../../assets/picture-2.png";
import pic3 from "../../assets/picture-3.png";

// Import images img1...img8
import img1 from "../../assets/image1.png.jpeg";
import img2 from "../../assets/image2.png.jpeg";
import img3 from "../../assets/image3.png.jpeg";
import img4 from "../../assets/image4.png.jpeg";
import img5 from "../../assets/image5.png.jpeg";
import img6 from "../../assets/image6.png.jpeg";

function District() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setShowTrackPopup } = useOutletContext();

  const slides = [
    { id: 1, image: pic1, title: "Active Governance, Digital Access", desc: "Report local issues and track resolutions in real-time." },
    { id: 2, image: pic2, title: "Your Voice, Our Mission", desc: "Providing a direct channel for citizens to improve infrastructure." },
    { id: 3, image: pic3, title: "Building a Smarter Community", desc: "Ensuring every community grievance is heard and resolved." }
  ];

  const categories = [
    { name: "ROADS", img: img1 }, { name: "ELECTRICITY", img: img2 },
    { name: "WATER SUPPLY", img: img3 }, { name: "SANITATION", img: img4 },
    { name: "DRAINAGE", img: img5 }, { name: "STREET LIGHTING", img: img6 }
    
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((p) => (p === slides.length - 1 ? 0 : p + 1)), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="bg-white">
      {/* HERO SECTION - Text visibility remains white on dark overlay */}
      <section className="position-relative overflow-hidden" style={{ height: "620px" }}>
        {slides.map((slide, index) => (
          <div key={slide.id} className="position-absolute w-100 h-100" style={{ 
            backgroundImage: `linear-gradient(rgba(0, 39, 77, 0.6), rgba(0, 39, 77, 0.6)), url(${slide.image})`,
            backgroundSize: "cover", backgroundPosition: "center",
            opacity: index === currentSlide ? 1 : 0, transition: "opacity 1.5s ease-in-out"
          }}>
            <div className="container h-100 d-flex align-items-center justify-content-center text-center">
              <div style={{ maxWidth: "850px" }}>
                <h1 className="display-2 fw-bolder mb-4 text-white">{slide.title}</h1>
                <p className="lead mb-5 fw-bold text-white-50" style={{ fontSize: "1.5rem" }}>{slide.desc}</p>
                <div className="d-flex gap-3 justify-content-center mt-2">
                  <Link to="/raise-complaint" className="btn btn-lg px-5 py-3 rounded-pill fw-bold border-0 btn-hover-effect" style={{ backgroundColor: "#ff9933", color: "white" }}>Report an Issue →</Link>
                  <button onClick={() => setShowTrackPopup(true)} className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-bold">View Your Reports</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* DEPARTMENT SHOWCASE - TEXT NOW VISIBLE (DARK NAVY ON LIGHT) */}
      <section className="container-fluid px-5 py-5 mt-4 bg-light">
        <div className="text-center mb-5">
            <h2 className="fw-bolder" style={{ fontSize: '3rem', color: "#00274d" }}>Government Departments</h2>
            <p className="text-muted fw-bold">Explore the key sectors monitored by CitizenDesk</p>
        </div>
        
        <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-4">
          {categories.map((cat, i) => (
            <div key={i} className="col">
              <div className="dept-showcase-card shadow-sm border-0 h-100 text-center p-0 overflow-hidden" 
                   style={{ backgroundColor: '#ffffff', borderRadius: '24px', minHeight: '300px', border: "1px solid #dee2e6" }}>
                <div style={{ height: "220px", overflow: "hidden" }}>
                    <img src={cat.img} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} className="dept-img" />
                </div>
                <div className="p-4">
                    <h5 className="fw-bolder mb-0" style={{ color: "#00274d" }}>{cat.name}</h5>
                    <div className="mt-3" style={{ height: "4px", width: "40px", backgroundColor: "#ff9933", margin: "0 auto" }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS SECTION - FIXED FOR VISIBILITY */}
      <section className="py-5 border-top border-bottom mb-5 bg-white">
        <div className="container text-center py-4">
          <h2 className="fw-bolder mb-5" style={{ color: "#00274d" }}>Easy steps to resolve</h2>
          <div className="row g-5">
            {[
              { s: "1", t: "Enter Details", d: "Start by providing your mobile and location to verify identity." },
              { s: "2", t: "Smart Search", d: "Our rule-based AI automatically routes your report to the correct VRO." },
              { s: "3", t: "Track & Resolve", d: "Receive updates directly on your dashboard." }
            ].map((step, i) => (
              <div key={i} className="col-md-4">
                <div className="p-5 rounded-4 h-100 border bg-light shadow-sm" style={{ borderColor: "#dee2e6" }}>
                    <div className="text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 fw-bold" 
                      style={{width: "60px", height: "60px", fontSize: "1.5rem", backgroundColor: "#ff9933"}}>
                        {step.s}
                    </div>
                    <h4 className="fw-bolder mb-3" style={{ color: "#00274d" }}>{step.t}</h4>
                    <p className="text-muted mb-0 fw-semibold">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default District;