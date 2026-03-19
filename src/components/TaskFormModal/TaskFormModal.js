import { useState } from 'react';
import Modal from '../Modal/Modal.js';
import { COLUMNS } from '../../Data/constants.js';
import './TaskFormModal.scss';

const TaskFormModal = ({ task, defaultCol, onSave, onClose }) => {
  const [form, setForm] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'Medium',
    col: task?.col || defaultCol || 'Not Started',
    dueDate: task?.dueDate || '',
  });

  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const focusStyle = (e) => (e.target.style.borderColor = 'var(--accent)');
  const blurStyle = (e) =>
    (e.target.style.borderColor = errors[e.target.name]
      ? 'var(--red)'
      : 'var(--border)');

  const handleSave = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required.';
    if (!form.dueDate) errs.dueDate = 'Due date is required.';

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    onSave({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
  };

  return (
    <Modal title={task ? 'Edit Task' : 'Create New Task'} onClose={onClose}>
      {/* Title */}
      <div className="tf-field">
        <label className="tf-label">Title *</label>

        <input
          name="title"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          onFocus={focusStyle}
          onBlur={blurStyle}
          placeholder="e.g. Design homepage layout"
          className="tf-input"
          style={{
            borderColor: errors.title ? 'var(--red)' : 'var(--border)',
          }}
        />

        {errors.title && (
          <span className="tf-error">{errors.title}</span>
        )}
      </div>

      {/* Description */}
      <div className="tf-field">
        <label className="tf-label">Description</label>

        <textarea
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          onFocus={focusStyle}
          onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
          placeholder="Describe the task in detail…"
          rows={3}
          className="tf-input tf-textarea"
        />
      </div>

      {/* Priority + Column */}
      <div className="tf-grid">
        <div>
          <label className="tf-label">Priority</label>

          <select
            value={form.priority}
            onChange={(e) => set('priority', e.target.value)}
            onFocus={focusStyle}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            className="tf-input"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div>
          <label className="tf-label">Column</label>

          <select
            value={form.col}
            onChange={(e) => set('col', e.target.value)}
            onFocus={focusStyle}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            className="tf-input"
          >
            {COLUMNS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Due Date */}
      <div className="tf-field">
        <label className="tf-label">Due Date *</label>

        <input
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={(e) => set('dueDate', e.target.value)}
          onFocus={focusStyle}
          onBlur={blurStyle}
          className="tf-input"
          style={{
            borderColor: errors.dueDate ? 'var(--red)' : 'var(--border)',
          }}
        />

        {errors.dueDate && (
          <span className="tf-error">{errors.dueDate}</span>
        )}
      </div>

      {/* Actions */}
      <div className="tf-actions">
        <button onClick={onClose} className="tf-btn cancel">
          Cancel
        </button>

        <button onClick={handleSave} className="tf-btn save">
          Save Task
        </button>
      </div>
    </Modal>
  );
};

export default TaskFormModal;