import { useState } from 'react';
import { IconSearch, IconX, IconFilter, IconPlus } from '../../Utils/Icons.js';
import './FilterBar.scss';

const FilterBar = ({ search, onSearch, prioFilter, onPrioFilter, onCreate }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="filter-bar">
      {/* Search */}
      <div
        className={`filter-search ${focused ? 'focused' : ''}`}
      >
        <span className="filter-search-icon">
          <IconSearch size={14} />
        </span>

        <input
          value={search}
          onChange={e => onSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search tasks by title or description…"
          className="filter-input"
        />

        {search && (
          <button
            onClick={() => onSearch('')}
            className="filter-clear-btn"
          >
            <IconX size={12} />
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="tf-vdivider" />

      {/* Priority filter */}
      <div className="filter-priority">
        <span className="filter-icon">
          <IconFilter size={13} />
        </span>
        <span className="filter-label">Priority:</span>

        <select
          value={prioFilter}
          onChange={e => onPrioFilter(e.target.value)}
          className="filter-select"
        >
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Create button */}
      <button
        onClick={onCreate}
        className="filter-create-btn"
      >
        <IconPlus size={14} />
        Create Task
      </button>
    </div>
  );
};

export default FilterBar;