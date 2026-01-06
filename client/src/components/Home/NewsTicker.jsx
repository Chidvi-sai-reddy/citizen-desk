import React from "react";

const newsItems = [
  "📢 New Water Pipeline Project approved for Vizianagaram District.",
  "🗓️ Public Holiday announced for Sankranti on Jan 14th - 16th.",
  "💡 Street light maintenance drive starting in Mandal 1 this weekend.",
  "🌾 PM Kisan Yojana: Last date for E-KYC extended to Feb 10th."
];

function NewsTicker() {
  return (
    <div 
      className="py-1 overflow-hidden position-relative border-bottom" 
      style={{ 
        zIndex: 999, 
        backgroundColor: "#f8f9fa", // Light gray background
        borderColor: "#dee2e6" 
      }}
    >
      <div className="d-flex align-items-center">
        {/* 'LATEST' label with blue background */}
        <span 
          className="text-white px-3 fw-bold small shadow-sm z-3 py-1"
          style={{ backgroundColor: "#0b3c5d" }} // Professional Blue
        >
          LATEST
        </span>
        
        {/* Scrolling text in blue */}
        <marquee className="m-0 py-1 fw-semibold small" scrollamount="6" style={{ color: "#0b3c5d" }}>
          {newsItems.map((item, index) => (
            <span key={index} className="mx-5">{item}</span>
          ))}
        </marquee>
      </div>
    </div>
  );
}

export default NewsTicker;