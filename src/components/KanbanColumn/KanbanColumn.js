import { useState } from 'react';
import { COL_META } from '../../Data/constants.js'
import { IconPlus } from '../../Utils/Icons.js';
import TaskCard from '../TaskCard/TaskCard.js';
import './KanbanColumn.scss';

const KanbanColumn = ({
  col, tasks, search,
  onView, onEdit, onDelete, onMove,
  onAddToCol,
  dragOverId, draggingId,
  onDragStart, onDragOver, onDrop, onColDrop,
}) => {
  const [colOver, setColOver] = useState(false);
  const meta = COL_META[col];

  return (
    <div
      data-col={col}
      className={`kanban-column ${colOver ? 'drag-over' : ''}`}
      onDragOver={e => { e.preventDefault(); setColOver(true); }}
      onDragLeave={e => { if (!e.currentTarget.contains(e.relatedTarget)) setColOver(false); }}
      onDrop={e => { e.preventDefault(); setColOver(false); onColDrop(col); }}
    >
      {/* Column header */}
      <div className="kanban-column-header">
        <div className="kanban-column-title">
          <div
            className="kanban-column-dot"
            style={{ background: meta.dot }}
          />

          <span className="kanban-column-name">{col}</span>

          <span
            className="kanban-column-count"
            style={{
              background: meta.bg,
              color: meta.tc,
            }}
          >
            {tasks.length}
          </span>
        </div>

        <button
          onClick={() => onAddToCol(col)}
          title={`Add task to ${col}`}
          className="kanban-add-btn"
        >
          <IconPlus size={13} />
        </button>
      </div>

      {/* Column body */}
      <div className="kanban-column-body">
        {tasks.length === 0 ? (
          <div className="kanban-empty">
            <div className="kanban-empty-icon">{meta.emptyIcon}</div>
            <div className="kanban-empty-text">Drop tasks here</div>
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              search={search}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
              onMove={onMove}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              isDragOver={dragOverId === task.id && draggingId !== task.id}
              isDragging={draggingId === task.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;