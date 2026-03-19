export const uid = () => `tf_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export const fmtDate = (s) => {
  if (!s) return '—';

  const [year, month, day] = s.split('-');
  const date = new Date(year, month - 1, day); // LOCAL date

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const isOverdue = (dueDate, col) =>
  col !== 'Completed' && dueDate && new Date(dueDate) < new Date();

export const highlight = (text, query) => {
  if (!query.trim()) return text;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i} style={{ background: 'rgba(99,102,241,.18)', borderRadius: 2, color: '#6366f1', fontStyle: 'normal' }}>{part}</mark>
      : part
  );
};
