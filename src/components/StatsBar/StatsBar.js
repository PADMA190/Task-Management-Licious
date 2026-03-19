import { IconInfo, IconClock, IconCheck, IconTasks } from '../../Utils/Icons.js';
import './StatsBar.scss';

const StatCard = ({ label, value, color, icon }) => {
  return (
    <div className="stat-card">
      <div
        className="stat-card-icon"
        style={{
          background: color + '22',
          color: color,
        }}
      >
        {icon}
      </div>

      <div>
        <div className="stat-card-value">{value}</div>
        <div className="stat-card-label">{label}</div>
      </div>
    </div>
  );
};

const StatsBar = ({ tasks }) => {
  const ns = tasks.filter(t => t.col === 'Not Started').length;
  const ip = tasks.filter(t => t.col === 'In Progress').length;
  const co = tasks.filter(t => t.col === 'Completed').length;

  return (
    <div className="stats-bar">
      <StatCard label="Not Started" value={ns} color="#64748b" icon={<IconInfo size={18} />} />
      <StatCard label="In Progress" value={ip} color="#f59e0b" icon={<IconClock size={18} />} />
      <StatCard label="Completed" value={co} color="#22c55e" icon={<IconCheck size={18} />} />
      <StatCard label="Total" value={tasks.length} color="#6366f1" icon={<IconTasks size={18} />} />
    </div>
  );
};

export default StatsBar;