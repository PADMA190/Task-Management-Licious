import Modal from '../Modal/Modal.js';
import { IconTrash } from '../../Utils/Icons.js';
import './DeleteConfirmModal.scss';

const DeleteConfirmModal = ({ task, onConfirm, onClose }) => {
  return (
    <Modal title="" onClose={onClose}>
      <div className="dcm-wrapper">
        <div className="dcm-icon">
          <IconTrash size={24} />
        </div>

        <h3 className="dcm-title">
          Delete Task?
        </h3>

        <p className="dcm-text">
          "<strong>{task.title}</strong>" will be permanently removed.
        </p>

        <div className="dcm-actions">
          <button onClick={onClose} className="dcm-btn cancel">
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirm(task.id);
              onClose();
            }}
            className="dcm-btn delete"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;