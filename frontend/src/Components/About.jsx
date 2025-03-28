import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/about.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left Section - Navigation */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link >About Us</Link></li>
            <li><Link>Products</Link></li>
            <li><Link >Contact</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Middle Section - Contact Info */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: luxmato@gmail.com </p>
          <p>Phone: +254 740 439 907</p>
          <p>Customer Service: +254 708 784 942</p>
        </div>

        {/* Right Section - Location */}
        <div className="footer-section">
          <h3>Location</h3>
          <p>Nairobi</p>
          <p>Kenya</p>
        </div>

      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Lux Mato. All Rights Reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;
