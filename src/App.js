import { useState, useRef, useEffect } from 'react';
import './App.css';
import { COLUMNS } from './Data/constants.js';
import { useTasks } from './hooks/useTasks.js';
import Header from '../src/components/Header/Header.js';
import StatsBar from '../src/components/StatsBar/StatsBar.js';
import FilterBar from '../src/components/FilterBar/FilterBar.js';
import KanbanColumn from '../src/components/KanbanColumn/KanbanColumn.js';
import TaskFormModal from '../src/components/TaskFormModal/TaskFormModal.js';
import ViewTaskModal from '../src/components/ViewTaskModal/ViewTaskModal.js';
import DeleteConfirmModal from '../src/components/DeleteConfirmModal/DeleteConfirmModal.js';

const App = () => {
  const { tasks, dark, toggleDark, addTask, updateTask, deleteTask, moveTask, reorderTask } = useTasks();
  const [search, setSearch] = useState('');
  const [prioFilter, setPrioFilter] = useState('All');

  // Modal state
  const [createModal, setCreateModal] = useState({ open: false, defaultCol: null });
  const [editTask, setEditTask] = useState(null);
  const [viewTask, setViewTask] = useState(null);
  const [deleteTask_, setDeleteTask_] = useState(null);

  // Drag state
  const draggingId = useRef(null);
  const [dragOverId, setDragOverId] = useState(null);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  // Filter helper
  const filterTasks = (col) => {
    const q = search.toLowerCase().trim();
    return tasks.filter(t =>
      t.col === col &&
      (prioFilter === 'All' || t.priority === prioFilter) &&
      (!q || t.title.toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q))
    );
  };

  // Filtered count
  const filteredCount = COLUMNS.reduce((sum, col) => sum + filterTasks(col).length, 0);
  const isFiltered = search.trim() || prioFilter !== 'All';

  // Drag handlers
  const handleDragStart = (id) => { draggingId.current = id; };
  const handleDragOver = (id) => setDragOverId(id);

  const handleDrop = (dstId, dstCol) => {
    if (!draggingId.current || draggingId.current === dstId) {
      setDragOverId(null);
      return;
    }
    reorderTask(draggingId.current, dstId, dstCol);
    draggingId.current = null;
    setDragOverId(null);
  };

  const handleColDrop = (col) => {
    if (!draggingId.current) return;
    moveTask(draggingId.current, col);
    draggingId.current = null;
    setDragOverId(null);
  };

  // Toggle col
  const handleToggle = (id) => {
    const t = tasks.find(x => x.id === id);
    if (!t) return;
    const next = {
      'Not Started': 'In Progress',
      'In Progress': 'Completed',
      Completed: 'In Progress'
    };
    moveTask(id, next[t.col]);
  };

  return (
    <div className="app">
      <Header dark={dark} onToggleDark={toggleDark} />

      <div className="app-container">

        {/* Title + Stats */}
        <div className="app-header">
          <div>
            <h1 className="app-title">Task Management</h1>
            <p className="app-subtitle">
              Drag cards between columns · Click title to view · Hover for actions
            </p>
          </div>
          <StatsBar tasks={tasks} />
        </div>

        {/* Filter bar */}
        <FilterBar
          search={search}
          onSearch={setSearch}
          prioFilter={prioFilter}
          onPrioFilter={setPrioFilter}
          onCreate={() => setCreateModal({ open: true, defaultCol: null })}
        />

        {/* Result info */}
        {isFiltered && (
          <div className="app-filter-info">
            <strong>{filteredCount}</strong> task{filteredCount !== 1 ? 's' : ''} matching filters
          </div>
        )}

        {/* Kanban Board */}
        <div className="tf-board">
          {COLUMNS.map(col => (
            <KanbanColumn
              key={col}
              col={col}
              tasks={filterTasks(col)}
              search={search}
              onView={setViewTask}
              onEdit={setEditTask}
              onDelete={setDeleteTask_}
              onMove={moveTask}
              onAddToCol={(c) => setCreateModal({ open: true, defaultCol: c })}
              dragOverId={dragOverId}
              draggingId={draggingId.current}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onColDrop={handleColDrop}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      {createModal.open && (
        <TaskFormModal
          defaultCol={createModal.defaultCol}
          onSave={(data) => {
            addTask(data);
            setCreateModal({ open: false, defaultCol: null });
          }}
          onClose={() => setCreateModal({ open: false, defaultCol: null })}
        />
      )}

      {editTask && (
        <TaskFormModal
          task={editTask}
          onSave={(data) => {
            updateTask(editTask.id, data);
            setEditTask(null);
          }}
          onClose={() => setEditTask(null)}
        />
      )}

      {viewTask && (
        <ViewTaskModal
          task={tasks.find(t => t.id === viewTask.id) || viewTask}
          onClose={() => setViewTask(null)}
          onEdit={(t) => {
            setViewTask(null);
            setEditTask(t);
          }}
          onDelete={(t) => {
            setViewTask(null);
            setDeleteTask_(t);
          }}
          onToggle={(id) => {
            handleToggle(id);
            setViewTask(tasks.find(t => t.id === id) || viewTask);
          }}
        />
      )}

      {deleteTask_ && (
        <DeleteConfirmModal
          task={deleteTask_}
          onConfirm={(id) => {
            deleteTask(id);
            setDeleteTask_(null);
          }}
          onClose={() => setDeleteTask_(null)}
        />
      )}
    </div>
  );
};

export default App;