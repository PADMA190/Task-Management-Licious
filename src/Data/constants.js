export const STORAGE_KEY = 'taskflow_kanban_v3';

export const COLUMNS = ['Not Started', 'In Progress', 'Completed'];

export const COL_META = {
  'Not Started': {
    id: 'ns',
    dot: '#64748b',
    bg: 'rgba(100,116,139,.14)',
    tc: '#64748b',
    emptyIcon: '📋',
  },
  'In Progress': {
    id: 'ip',
    dot: '#f59e0b',
    bg: 'rgba(245,158,11,.13)',
    tc: '#f59e0b',
    emptyIcon: '⚡',
  },
  Completed: {
    id: 'co',
    dot: '#22c55e',
    bg: 'rgba(34,197,94,.13)',
    tc: '#22c55e',
    emptyIcon: '✅',
  },
};

export const PRIORITY_META = {
  High:   { color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  Medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  Low:    { color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
};

export const COL_MOVE_NEXT = {
  'Not Started': 'In Progress',
  'In Progress': 'Completed',
  Completed: null,
};

export const COL_MOVE_PREV = {
  'Not Started': null,
  'In Progress': 'Not Started',
  Completed: 'In Progress',
};

export const VIEW_TOGGLE_META = {
  'Not Started': { label: '▶ Start Task',         bg: 'rgba(99,102,241,0.12)', color: '#6366f1' },
  'In Progress':  { label: '✓ Mark Complete',      bg: 'rgba(34,197,94,0.12)',  color: '#22c55e' },
  Completed:      { label: '↩ Move to In Progress',bg: 'rgba(245,158,11,0.12)', color: '#f59e0b' },
};

const uid = () => `tf_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export const SAMPLE_TASKS = [
  { id: uid(), title: 'Design homepage layout',        description: 'Create wireframes and high-fidelity mockups for the new homepage redesign.',        priority: 'High',   dueDate: '2025-12-12', col: 'Not Started', createdAt: Date.now() - 9e5 },
  { id: uid(), title: 'Plan Instagram campaign',       description: 'Define content pillars, schedule posts and set measurable KPIs for Q1 growth.',     priority: 'High',   dueDate: '2025-12-01', col: 'Not Started', createdAt: Date.now() - 8e5 },
  { id: uid(), title: 'Conduct website audit for SEO', description: 'Audit site structure, metadata and backlinks. Prepare a detailed action plan.',      priority: 'Low',    dueDate: '2025-11-20', col: 'Not Started', createdAt: Date.now() - 7e5 },
  { id: uid(), title: 'Create user authentication flow',description: 'Design sign-up, login and password-reset flows with edge case handling.',           priority: 'Medium', dueDate: '2025-11-15', col: 'Not Started', createdAt: Date.now() - 6.5e5 },
  { id: uid(), title: 'Record episode script',         description: 'Write and record the voiceover for the podcast episode on design systems.',           priority: 'Medium', dueDate: '2025-12-15', col: 'In Progress', createdAt: Date.now() - 6e5 },
  { id: uid(), title: 'Create brand guidelines',       description: 'Document typography, color palette, tone-of-voice and logo usage rules.',             priority: 'High',   dueDate: '2025-12-29', col: 'In Progress', createdAt: Date.now() - 5e5 },
  { id: uid(), title: 'Develop blog post strategy',    description: 'Identify target keywords, content formats and publishing cadence for the year.',     priority: 'Medium', dueDate: '2025-11-25', col: 'In Progress', createdAt: Date.now() - 4e5 },
  { id: uid(), title: 'Edit promotional video for app',description: 'Cut, color-grade and add motion graphics to the mobile app promo reel.',             priority: 'Medium', dueDate: '2025-12-12', col: 'In Progress', createdAt: Date.now() - 3.5e5 },
  { id: uid(), title: 'Analyze competitor strategies', description: 'Deep-dive into competitor positioning, pricing models, and marketing campaigns.',     priority: 'Medium', dueDate: '2025-12-20', col: 'Completed',   createdAt: Date.now() - 3e5 },
  { id: uid(), title: 'Create marketing brochure',     description: 'Design a tri-fold brochure for the upcoming international trade show event.',        priority: 'Low',    dueDate: '2025-12-10', col: 'Completed',   createdAt: Date.now() - 2e5 },
  { id: uid(), title: 'Conduct user feedback sessions',description: 'Schedule and run 5 user interviews to gather actionable product feedback.',          priority: 'Low',    dueDate: '2025-12-24', col: 'Completed',   createdAt: Date.now() - 1e5 },
  { id: uid(), title: 'Set up CI/CD pipeline',         description: 'Configure automated testing and deployment workflows using GitHub Actions.',          priority: 'High',   dueDate: '2025-12-18', col: 'Completed',   createdAt: Date.now() - 5e4 },
];
