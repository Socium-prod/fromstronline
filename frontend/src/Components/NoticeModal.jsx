import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import "../Styles/modal.css"; // Keep styling separate

Modal.setAppElement("#root"); // Required for accessibility

function NoticeModal({ isOpen }) {
  const navigate = useNavigate();

  const closeModal = () => {
    navigate("/"); // Redirect to home page when modal is closed
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Payment Notice"
      className="modal-content" // Apply modal styling
      overlayClassName="modal-overlay" // Apply overlay styling
    >
      <h2 className="modal-title">Notice</h2>
      <p className="modal-text">
        Online payments are not yet available. Please visit our shop in{" "}
        <strong>Eastleigh</strong> to complete your purchase or contact us through{" "}
        <strong>+254708784942</strong>.Thank you!
      </p>
      <button onClick={closeModal} className="modal-close-button">
        OK
      </button>
    </Modal>
  );
}

export default NoticeModal;
