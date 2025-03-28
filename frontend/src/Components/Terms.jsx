import React from "react";
import "../Styles/terms.css"; // Importing the CSS file

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      <p><strong>Effective Date:</strong> [12/03/2024]</p>

      <section>
        <h2>1. Booking & Payment</h2>
        <ul>
          <li>Full payment is required to confirm your reservation.</li>
          <li>Prices are subject to change without prior notice.</li>
          <li>All payments are non-refundable but may be rescheduled with at least <strong>7 days' notice</strong>.</li>
        </ul>
      </section>

      <section>
        <h2>2. Check-in & Check-out</h2>
        <ul>
          <li>Check-in: <strong>3:00 PM</strong> | Check-out: <strong>11:00 AM</strong>.</li>
          <li>Early check-in or late check-out is subject to availability and additional charges.</li>
        </ul>
      </section>

      <section>
        <h2>3. Guest Policy</h2>
        <ul>
          <li>The maximum number of guests per booking must be followed.</li>
          <li>Visitors must be registered in advance. Unregistered guests are not permitted to stay overnight.</li>
        </ul>
      </section>

      <section>
        <h2>4. Luxury Services</h2>
        <ul>
          <li><strong>Spa & Massage:</strong> Guests are entitled to <strong>three spa and massage sessions per week</strong>. These must be scheduled in advance.</li>
          <li><strong>Chauffeur Service:</strong> Available within Nairobi and must be booked at least <strong>24 hours in advance</strong>.</li>
          <li><strong>Fine Dining:</strong> Personalized gourmet dining available upon request.</li>
          <li><strong>24/7 Concierge:</strong> Our team is available to assist with any special requests.</li>
        </ul>
      </section>

      <section>
        <h2>5. Damage & Liability</h2>
        <ul>
          <li>Guests are responsible for any damages caused during their stay.</li>
          <li>The property is not liable for the loss of personal belongings. A secure safe is available for valuables.</li>
        </ul>
      </section>

      <section>
        <h2>6. Code of Conduct</h2>
        <ul>
          <li>Smoking is strictly prohibited inside the premises.</li>
          <li>Excessive noise, parties, or any illegal activities will result in immediate cancellation without a refund.</li>
        </ul>
      </section>

      <section>
        <h2>7. Cancellation & No-Show Policy</h2>
        <ul>
          <li>Cancellations made <strong>less than 7 days before arrival</strong> will be charged in full.</li>
          <li>No-shows will not be eligible for refunds or rescheduling.</li>
        </ul>
      </section>

      <section>
        <h2>8. Force Majeure</h2>
        <p>The management is not responsible for cancellations due to natural disasters, government regulations, or other uncontrollable circumstances.</p>
      </section>

      <section>
        <h2>9. Contact Information</h2>
        <p><strong>📍 Location:</strong> Nairbi, Kenya</p>
        <p><strong>📧 Email:</strong> luxmato@gmail.com</p>
        <p><strong>📞 Phone:</strong> +254 740 439 907</p>
      </section>

      <p className="footer-note">
        By booking with us, you agree to abide by these <strong>Terms & Conditions</strong>. We look forward to making your stay unforgettable!
      </p>
    </div>
  );
};

export default TermsAndConditions;
