import { useState } from 'react';
import { PRIORITY_META, COL_MOVE_NEXT, COL_MOVE_PREV } from '../../Data/constants.js';
import { fmtDate, isOverdue, highlight } from '../../Utils/utils.js';
import { IconEye, IconEdit, IconTrash, IconCalendar } from '../../Utils/Icons.js';
import './TaskCard.scss';

const ActionBtn = ({ icon, title, hoverColor, onClick }) => {
  const [hov, setHov] = useState(false);

  return (
    <button
      title={title}
      onClick={e => { e.stopPropagation(); onClick(); }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="task-action-btn"
      style={{
        background: hov ? hoverColor + '22' : 'transparent',
        color: hov ? hoverColor : 'var(--text2)',
      }}
    >
      {icon}
    </button>
  );
};

const TaskCard = ({
  task, search, onView, onEdit, onDelete, onMove,
  onDragStart, onDragOver, onDrop,
  isDragOver, isDragging
}) => {
  const [hov, setHov] = useState(false);

  const pm = PRIORITY_META[task.priority];
  const done = task.col === 'Completed';
  const over = isOverdue(task.dueDate, task.col);

  const next = COL_MOVE_NEXT[task.col];
  const prev = COL_MOVE_PREV[task.col];

  const nextLabel = { 'Not Started': 'In Progress ▶', 'In Progress': 'Completed ▶' }[task.col];
  const prevLabel = { 'In Progress': '◀ Not Started', Completed: '◀ In Progress' }[task.col];

  return (
    <div
      draggable
      className={`task-card ${isDragOver ? 'drag-over' : ''} ${isDragging ? 'dragging' : ''}`}
      onDragStart={e => { e.dataTransfer.effectAllowed = 'move'; onDragStart(task.id); }}
      onDragEnd={() => onDragStart(null)}
      onDragOver={e => { e.preventDefault(); onDragOver(task.id); }}
      onDrop={e => { e.preventDefault(); e.stopPropagation(); onDrop(task.id, task.col); }}
      onClick={() => onView(task)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border: `1.5px ${isDragOver ? 'dashed' : 'solid'} ${
          isDragOver ? 'var(--accent)' : hov ? 'rgba(99,102,241,.28)' : 'var(--border)'
        }`,
        boxShadow: hov ? '0 8px 24px var(--shadow2)' : '0 2px 8px var(--shadow)',
        transform: isDragOver
          ? 'scale(.98)'
          : isDragging
          ? 'scale(.96)'
          : hov
          ? 'translateY(-2px)'
          : 'none',
        opacity: isDragging ? 0.3 : isDragOver ? 0.65 : 1,
      }}
    >
      {/* Left accent */}
      <div
        className="task-accent"
        style={{ background: pm.color }}
      />

      <div className="task-content">
        {/* Top row */}
        <div className="task-top">
          <div className="task-badges">
            <span
              className="task-priority"
              style={{ background: pm.bg, color: pm.color }}
            >
              {task.priority}
            </span>

            {over && (
              <span className="task-overdue">
                ⚠ Overdue
              </span>
            )}
          </div>

          <div className={`task-actions ${hov ? 'visible' : ''}`}>
            <ActionBtn icon={<IconEye size={12} />} title="View" hoverColor="var(--accent)" onClick={() => onView(task)} />
            <ActionBtn icon={<IconEdit size={12} />} title="Edit" hoverColor="#f59e0b" onClick={() => onEdit(task)} />
            <ActionBtn icon={<IconTrash size={12} />} title="Delete" hoverColor="#ef4444" onClick={() => onDelete(task)} />
          </div>
        </div>

        {/* Title */}
        <p
          className={`task-title ${done ? 'done' : ''}`}
        >
          {search ? highlight(task.title, search) : task.title}
        </p>

        {/* Description */}
        {task.description && (
          <p className="task-desc">
            {search ? highlight(task.description, search) : task.description}
          </p>
        )}

        {/* Footer */}
        <div className="task-footer">
          <span className={`task-date ${over ? 'overdue' : ''}`}>
            <IconCalendar size={10} />
            {fmtDate(task.dueDate)}
          </span>

          <div className="task-move" onClick={e => e.stopPropagation()}>
            {prev && (
              <button
                onClick={() => onMove(task.id, prev)}
                className="task-move-btn prev"
              >
                {prevLabel}
              </button>
            )}

            {next && (
              <button
                onClick={() => onMove(task.id, next)}
                className="task-move-btn next"
              >
                {nextLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;