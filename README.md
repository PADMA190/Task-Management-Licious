🧩 TaskFlow – Task Management Dashboard

A modern, responsive Kanban-style task management app built with React.
Organize tasks visually, track progress, and manage workflows with ease.

🚀 Features

📌 Create, edit, delete tasks
🧲 Drag & drop between columns
🔍 Search & filter by priority
🌗 Light / Dark mode
📊 Real-time stats dashboard
📅 Due dates with overdue detection
⚡ Smooth animations & responsive UI

🛠 Tech Stack

React (Functional Components + Hooks)
SCSS (Modular styling)
Vanilla Drag & Drop API
Custom Hooks (useTasks)
React-Icons

⚙️ Setup Instructions

1. Clone the repository
git clone <your-repo-url>
cd task-management
2. Install dependencies
npm install
3. Start development server
npm start

App will run at:
http://localhost:3000

## 🖼 Screenshots

### 🌞 Light Mode
![Light Mode](./screenshots/LightMode.png)

### 🌙 Dark Mode
![Dark Mode](./screenshots/DarkMode.png)

### 📝 Task Modal
![Modal](./screenshots/modal.png)


🎨 Design Decisions

🔹 Component-Based Architecture
Each UI piece is modular (Header, Cards, Modals) → improves maintainability & scalability.

🔹 SCSS Styling
improves maintainability and reusability

🔹 State Management via Custom Hook
centralizes logic and avoids prop drilling

🔹 UX Focus
Smooth animations for interactions
Visual feedback for drag/drop
Clear hierarchy (cards, badges, stats)

🔹 Date Handling Fix
Handled timezone issues by parsing dates manually instead of using new Date(string).