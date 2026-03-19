import { useEffect } from 'react';
import { IconX } from '../../Utils/Icons.js';
import './Modal.scss';

const Modal = ({ title, onClose, children, accentColor }) => {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-container">
        {accentColor && (
          <div
            className="modal-accent"
            style={{
              background: `linear-gradient(90deg, ${accentColor}, ${accentColor}55)`
            }}
          />
        )}

        <div className="modal-content">
          <div className="modal-header">
            <span className="modal-title">{title}</span>

            <button
              onClick={onClose}
              className="modal-close-btn"
            >
              <IconX size={13} />
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;