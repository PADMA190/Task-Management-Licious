import { useState, useEffect } from 'react';
import { STORAGE_KEY, SAMPLE_TASKS } from '../Data/constants.js';
import { uid } from '../Utils/utils.js';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { tasks: parsed.tasks || [...SAMPLE_TASKS], dark: !!parsed.dark };
    }
  } catch {}
  return { tasks: [...SAMPLE_TASKS], dark: false };
}

export function useTasks() {
  const [tasks, setTasks] = useState(() => loadFromStorage().tasks);
  const [dark, setDark] = useState(() => loadFromStorage().dark);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks, dark }));
    } catch {}
  }, [tasks, dark]);

  const addTask = (data) =>
    setTasks((prev) => [{ id: uid(), createdAt: Date.now(), ...data }, ...prev]);

  const updateTask = (id, data) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));

  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const moveTask = (id, col) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, col } : t)));

  const reorderTask = (srcId, dstId, newCol) =>
    setTasks((prev) => {
      const arr = [...prev];
      const srcIdx = arr.findIndex((t) => t.id === srcId);
      const dstIdx = arr.findIndex((t) => t.id === dstId);
      if (srcIdx === -1) return prev;
      const [removed] = arr.splice(srcIdx, 1);
      removed.col = newCol;
      const insertAt = dstIdx === -1 ? arr.length : dstIdx;
      arr.splice(insertAt, 0, removed);
      return arr;
    });

  const toggleDark = () => setDark((d) => !d);

  return { tasks, dark, toggleDark, addTask, updateTask, deleteTask, moveTask, reorderTask };
}
