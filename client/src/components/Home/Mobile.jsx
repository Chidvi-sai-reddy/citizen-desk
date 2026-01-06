import React, { useState } from "react";
import {Link} from 'react-router-dom';

function Mobile() {
  const [mobile, setMobile] = useState("");

  return (
    <main className="hero-section d-flex align-items-center justify-content-center">
      <div className="container text-center py-5">
        <h1 className="display-6 fw-bold mb-3">Enter Mobile Number</h1>
        <p className="lead mb-5">
          We will use this number to send updates about your complaint
        </p>

        <div className="row justify-content-center">
          <div className="col-11 col-sm-10 col-md-6 col-lg-4">
            <div className="row g-2">
              <div className="col-12 col-md-8">
                <input
                  type="tel"
                  maxLength="10"
                  className="form-control form-control-lg"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>

              <div className="col-12 col-md-4 d-grid">
                <Link 
                    to="/history"
                    state={{ mobileNumber: mobile }} // Pass the number here
                    className="btn btn-primary btn-lg"
                    disabled={mobile.length !== 10}
                    >
                    Proceed
                    </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Mobile;
