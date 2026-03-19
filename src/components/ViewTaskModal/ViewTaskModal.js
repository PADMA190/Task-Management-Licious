import Modal from '../Modal/Modal.js';
import { PRIORITY_META, COL_META, VIEW_TOGGLE_META } from '../../Data/constants.js';
import { fmtDate, isOverdue } from '../../Utils/utils.js';
import { IconEdit, IconTrash, IconCalendar } from '../../Utils/Icons.js';
import './ViewTaskModal.scss';

const ViewTaskModal = ({ task, onClose, onEdit, onDelete, onToggle }) => {
  const pm = PRIORITY_META[task.priority];
  const cm = COL_META[task.col];
  const done = task.col === 'Completed';
  const over = isOverdue(task.dueDate, task.col);
  const toggleMeta = VIEW_TOGGLE_META[task.col];

  return (
    <Modal title="" onClose={onClose} accentColor={pm.color}>
      {/* Badges */}
      <div className="vtm-badges">
        <span
          className="vtm-badge"
          style={{ background: pm.bg, color: pm.color }}
        >
          ● {task.priority}
        </span>

        <span
          className="vtm-badge"
          style={{ background: cm.bg, color: cm.tc }}
        >
          ● {task.col}
        </span>

        {over && (
          <span className="vtm-badge overdue">
            ⚠ Overdue
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className={`vtm-title ${done ? 'done' : ''}`}>
        {task.title}
      </h2>

      {/* Description */}
      <p className="vtm-desc">
        {task.description || 'No description provided.'}
      </p>

      {/* Due date */}
      <div className={`vtm-date ${over ? 'overdue' : ''}`}>
        <IconCalendar size={13} />
        Due {fmtDate(task.dueDate)}
      </div>

      {/* Actions */}
      <div className="vtm-actions">
        <button
          onClick={() => { onToggle(task.id); onClose(); }}
          className="vtm-btn toggle"
          style={{
            background: toggleMeta.bg,
            color: toggleMeta.color,
          }}
        >
          {toggleMeta.label}
        </button>

        <button
          onClick={() => { onClose(); onEdit(task); }}
          className="vtm-btn edit"
        >
          <IconEdit size={12} /> Edit
        </button>

        <button
          onClick={() => { onClose(); onDelete(task); }}
          className="vtm-btn delete"
        >
          <IconTrash size={12} /> Delete
        </button>
      </div>
    </Modal>
  );
};

export default ViewTaskModal;